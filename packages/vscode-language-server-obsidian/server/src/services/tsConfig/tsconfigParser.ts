import * as fs from 'fs';
import * as path from 'path';
import * as jsonc from 'jsonc-parser';
import { RelativeToAbsoluteConverter } from './relativeToAbsolutePathConverter';

export type TsConfig = {
  compilerOptions?: Record<string, any>;
  include?: string[];
  exclude?: string[];
  files?: string[];
  references?: { path: string; }[];
  extends?: string;
  [key: string]: any;
};

type CompositeTsConfig = TsConfig & {
  references: { path: string; }[];
};

/**
 * Parses a tsconfig file and returns a normalized tsconfig object.
 * 
 * This class is responsible for:
 * - Reading a tsconfig file
 * - Converting relative paths to absolute paths
 * - Merging composite tsconfig files (motivation: https://github.com/dsherret/ts-morph/issues/876)
 * - Returning a normalized tsconfig object
 */
export class TsConfigParser {
  constructor (
    private readonly relativeToAbsoluteConverter: RelativeToAbsoluteConverter = new RelativeToAbsoluteConverter()
  ) { }

  public parse(configPath: string): TsConfig {
    const rootConfig = this.readJsonFile(configPath);
    const baseDir = path.dirname(configPath);

    const configWithoutExtends = this.handleConfigExtends(rootConfig, baseDir);

    const tsConfig = this.isCompositeConfigFile(configWithoutExtends)
      ? this.parseCompositeConfigFile(configWithoutExtends, baseDir)
      : configWithoutExtends;
    this.relativeToAbsoluteConverter.convert(tsConfig, baseDir);
    return tsConfig;
  }

  private handleConfigExtends(config: TsConfig, baseDir: string): TsConfig {
    if (!config.extends) {
      return config;
    }

    const baseConfigPath = path.resolve(baseDir, config.extends);
    const baseConfigDir = path.dirname(baseConfigPath);
    const baseConfig = this.readJsonFile(baseConfigPath);

    // Recursively handle extends in the base config
    const resolvedBaseConfig = this.handleConfigExtends(baseConfig, baseConfigDir);

    // Remove the extends property to prevent infinite loops
    const { extends: _, ...configWithoutExtends } = config;

    return this.mergeConfigs(resolvedBaseConfig, configWithoutExtends);
  }

  private parseCompositeConfigFile(rootConfig: CompositeTsConfig, baseDir: string) {
    let mergedConfig: TsConfig = this.createEmptyConfig();
    for (const reference of rootConfig.references) {
      const referencePath = path.resolve(baseDir, reference.path);
      const referenceDir = path.dirname(referencePath);
      const referenceConfig = this.readJsonFile(referencePath);

      // Convert paths in the reference config relative to its own directory
      this.relativeToAbsoluteConverter.convert(referenceConfig, referenceDir);

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

  private mergeConfigs(baseConfig: TsConfig, extendingConfig: TsConfig): TsConfig {
    // Create a new config object
    const mergedConfig: TsConfig = { ...this.createEmptyConfig() };

    // Merge compiler options
    mergedConfig.compilerOptions = {
      ...baseConfig.compilerOptions,
      ...extendingConfig.compilerOptions,
    };

    // Merge array properties
    for (const key of ['include', 'exclude', 'files'] as const) {
      mergedConfig[key] = [];
      if (Array.isArray(baseConfig[key])) {
        mergedConfig[key].push(...baseConfig[key]);
      }
      if (Array.isArray(extendingConfig[key])) {
        mergedConfig[key].push(...extendingConfig[key]);
      }
      // Remove duplicates
      if (mergedConfig[key].length > 0) {
        mergedConfig[key] = [...new Set(mergedConfig[key])];
      }
    }

    // Merge references
    if (baseConfig.references || extendingConfig.references) {
      mergedConfig.references = [
        ...(baseConfig.references || []),
        ...(extendingConfig.references || []),
      ];
    }

    // Copy any other properties from the extending config
    for (const key in extendingConfig) {
      if (!['compilerOptions', 'include', 'exclude', 'files', 'references'].includes(key)) {
        mergedConfig[key] = extendingConfig[key];
      }
    }

    return mergedConfig;
  }
}
