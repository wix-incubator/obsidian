import { Project } from "ts-morph";
import * as path from 'path';
import * as fs from 'fs';
import { Logger } from "../logger";
// import * as os from 'os';

type Options = { overrideTsConfigPath?: string; };
// type TsConfig = { path: string, content: string; };

export class ProjectRegistry {
  private readonly projects: Map<string, Project> = new Map();


  constructor (
    private readonly logger: Logger,
    private readonly options?: Options
  ) { }

  public get(filePath: string) {
    // const tsConfig = await this.loadTsConfig(filePath);
    // if (!this.projects.has(tsConfig.path)) await this.createProject(tsConfig);
    // const project = this.projects.get(tsConfig.path);
    // if (!project) throw new Error(`Project not found for ${filePath}`);
    // return project;

    const tsConfigPath = this.resolveTsConfigPath(filePath);
    this.logger.info(`Found tsconfig path: ${tsConfigPath}`);
    if (!this.projects.has(tsConfigPath)) {
      this.logger.info(`Loading project for ${tsConfigPath}`);
      const project = new Project({
        tsConfigFilePath: tsConfigPath,
      });
      this.projects.set(tsConfigPath, project);
    }
    return this.projects.get(tsConfigPath)!;
  }

  // private async createProject(tsConfig: TsConfig) {
  //   const tempTsConfigPath = path.join(os.tmpdir(), `tsconfig-${Date.now()}.json`);
  //   try {
  //     fs.writeFileSync(tempTsConfigPath, tsConfig.content);
  //     const project = new Project({ tsConfigFilePath: tempTsConfigPath });
  //     this.projects.set(tsConfig.path, project);
  //     return project;
  //   } finally {
  //     // Clean up the temporary file
  //     if (fs.existsSync(tempTsConfigPath)) {
  //       fs.unlinkSync(tempTsConfigPath);
  //     }
  //   }
  // }

  // private async loadTsConfig(filePath: string): Promise<TsConfig> {
  //   const { tsconfigFile, tsconfig } = await parse(filePath, { cache: new TSConfckCache(), configName: this.options?.overrideTsConfigName });
  //   return { path: tsconfigFile, content: tsconfig };
  // }

  private resolveTsConfigPath(filePath: string): string {
    if (this.options?.overrideTsConfigPath) return this.options.overrideTsConfigPath;
    return this.findClosestTsConfig(filePath);
  }

  private findClosestTsConfig(filePath: string): string {
    let dir = path.dirname(filePath);
    while (dir !== path.parse(dir).root) {
      // TODO! change this back to tsconfig.json & implement a mechanism that handles a config file that references other config files
      const maybeTsConfigPath = path.join(dir, 'tsconfig.app.json');
      if (fs.existsSync(maybeTsConfigPath)) {
        return path.resolve(dir, maybeTsConfigPath);
      }
      dir = path.dirname(dir);
    }
    throw new Error('No tsconfig.json found!');
  }
}
