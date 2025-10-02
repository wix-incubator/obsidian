import path = require('path');

export class PathResolver {
  public resolve(baseFilePath: string, relativeFilePath: string) {
    return this.isRelativePath(relativeFilePath)
      ? this.resolveRelativePath(baseFilePath, relativeFilePath)
      : this.resolveModule(relativeFilePath);
  }

  private isRelativePath(filePath: string) {
    return filePath.startsWith('./') || filePath.startsWith('../');
  }

  private resolveRelativePath(baseFilePath: string, relativeFilePath: string) {
    return path.resolve(path.dirname(baseFilePath), `${relativeFilePath}.ts`);
  }

  private resolveModule(moduleName: string) {
    return require.resolve(moduleName);
  }
}