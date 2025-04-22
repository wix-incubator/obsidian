import * as fs from 'fs';
import * as path from 'path';
import * as jsonc from 'jsonc-parser';
import { RelativeToAbsoluteConverter } from './relativeToAbsoluteConverter';

export type TsConfig = {
  compilerOptions?: Record<string, any>;
  include?: string[];
  exclude?: string[];
  files?: string[];
  references?: { path: string; }[];
  [key: string]: any;
};

type CompositeTsConfig = TsConfig & {
  references: { path: string; }[];
};

export class TsconfigParser {
  constructor (
    private readonly relativeToAbsoluteConverter: RelativeToAbsoluteConverter = new RelativeToAbsoluteConverter()
  ) { }

  public parse(configPath: string): TsConfig {
    const rootConfig = this.readJsonFile(configPath);
    const baseDir = path.dirname(configPath);
    const tsConfig = this.isCompositeConfigFile(rootConfig)
      ? this.parseCompositeConfigFile(rootConfig, baseDir)
      : rootConfig;
    this.relativeToAbsoluteConverter.convert(tsConfig, baseDir);
    return tsConfig;
  }

  private parseCompositeConfigFile(rootConfig: CompositeTsConfig, baseDir: string) {
    let mergedConfig: TsConfig = this.createEmptyConfig();
    for (const reference of rootConfig.references) {
      const referencePath = path.resolve(baseDir, reference.path);
      const referenceConfig = this.readJsonFile(referencePath);
      this.mergeConfig(mergedConfig, referenceConfig);
    }
    return mergedConfig;
  }

  private createEmptyConfig(): TsConfig {
    return {
      compilerOptions: {},
      include: [],
      exclude: [],
      files: [],
    };
  }

  private isCompositeConfigFile(rootConfig: TsConfig): rootConfig is CompositeTsConfig {
    return Boolean(rootConfig.references && Array.isArray(rootConfig.references));
  }

  private readJsonFile(filePath: string): TsConfig {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return jsonc.parse(raw);
  }

  private mergeConfig(target: TsConfig, source: TsConfig) {
    target.compilerOptions = {
      ...target.compilerOptions,
      ...source.compilerOptions,
    };
    this.mergeArrayProperties(target, source);
  }

  private mergeArrayProperties(target: TsConfig, source: TsConfig) {
    for (const key of ['include', 'exclude', 'files']) {
      if (Array.isArray(source[key])) {
        target[key] = Array.isArray(target[key])
          ? [...new Set([...target[key], ...source[key]])]
          : [...source[key]];
      }
    }
  }
}
