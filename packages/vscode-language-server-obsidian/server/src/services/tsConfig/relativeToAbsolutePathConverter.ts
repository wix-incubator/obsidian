import { TsConfig } from "./tsconfigParser";
import * as path from 'path';

export class RelativeToAbsoluteConverter {
  public convert(config: TsConfig, baseDir: string) {
    this.convertArrayProperties(config, baseDir);
    this.convertCompilerOptions(config, baseDir);
  }

  private convertCompilerOptions(config: TsConfig, baseDir: string) {
    const compilerOptions = config.compilerOptions;
    if (compilerOptions) {
      const pathOptions = ['baseUrl', 'outDir', 'rootDir'];
      pathOptions.forEach(opt => {
        if (typeof compilerOptions[opt] === 'string') {
          compilerOptions[opt] = path.resolve(baseDir, compilerOptions[opt]);
        }
      });

      // Handle paths mapping in compilerOptions
      if (compilerOptions.paths) {
        const paths = compilerOptions.paths;
        for (const key in paths) {
          if (Array.isArray(paths[key])) {
            paths[key] = paths[key].map((p: string) => path.resolve(baseDir, p));
          }
        }
      }
    }
  }

  private convertArrayProperties(config: TsConfig, baseDir: string) {
    ['include', 'exclude', 'files'].forEach(key => {
      if (Array.isArray(config[key])) {
        config[key] = config[key].map(p => path.resolve(baseDir, p));
      }
    });
  }
}

