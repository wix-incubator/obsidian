import { Project } from "ts-morph";
import * as path from 'path';
import * as fs from 'fs';
import { Logger } from "../logger";
import { TsConfig, TsConfigParser } from "../tsConfig/tsconfigParser";
import * as os from 'os';
import { ensureDir, writeFile } from "../../utils/fileSystem";

type Options = { overrideTsConfigPath?: string; };

export class ProjectRegistry {
  private readonly projects: Map<string, Project> = new Map();
  private readonly tempFiles: Set<string> = new Set();

  constructor (
    private readonly logger: Logger,
    private readonly tsconfigParser: TsConfigParser,
    private readonly options?: Options
  ) { }

  public get(filePath: string) {
    const tsConfigPath = this.resolveTsConfigPath(filePath);
    this.ensureProject(tsConfigPath);
    return this.projects.get(tsConfigPath)!;
  }

  private ensureProject(tsConfigPath: string) {
    if (!this.projects.has(tsConfigPath)) {
      const tsConfig = this.tsconfigParser.parse(tsConfigPath);
      this.logger.info(`Parsed tsconfig: ${tsConfigPath}`);
      const tempTsConfigPath = this.createProject(tsConfig);
      const project = new Project({ tsConfigFilePath: tempTsConfigPath });
      this.projects.set(tsConfigPath, project);
    }
  }

  private createProject(tsConfig: TsConfig) {
    const tempDir = path.join(os.tmpdir(), 'obsidian-language-server');
    const tempTsConfigPath = path.join(tempDir, `tsconfig-${Date.now()}.json`);
    try {
      ensureDir(tempDir);
      writeFile(tempTsConfigPath, tsConfig);
      this.tempFiles.add(tempTsConfigPath);
      return tempTsConfigPath;
    } catch (error) {
      this.logger.error(`Error writing tsconfig to temp file: ${error}`);
      throw error;
    }
  }

  private resolveTsConfigPath(filePath: string): string {
    if (this.options?.overrideTsConfigPath) return this.options.overrideTsConfigPath;
    return this.findClosestTsConfig(filePath);
  }

  private findClosestTsConfig(filePath: string): string {
    let dir = path.dirname(filePath);
    while (dir !== path.parse(dir).root) {
      const maybeTsConfigPath = path.join(dir, 'tsconfig.json');
      if (fs.existsSync(maybeTsConfigPath)) {
        return path.resolve(dir, maybeTsConfigPath);
      }
      dir = path.dirname(dir);
    }
    throw new Error('No tsconfig.json found!');
  }

  public dispose() {
    for (const tempFile of this.tempFiles) {
      this.clearTempTsConfigFiles(tempFile);
    }
    this.tempFiles.clear();
    this.projects.clear();
  }

  private clearTempTsConfigFiles(tempFile: string) {
    try {
      if (fs.existsSync(tempFile)) {
        fs.unlinkSync(tempFile);
        this.logger.info(`Cleaned up temporary tsconfig: ${tempFile}`);
      }
    } catch (error) {
      this.logger.error(`Error cleaning up temporary tsconfig ${tempFile}: ${error}`);
    }
  }
}
