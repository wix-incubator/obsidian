import path = require('path') ;

export class PathResolver {
  public resolve(baseFilePath: string, relativeFilePath: string) {
    return path.resolve(path.dirname(baseFilePath), `${relativeFilePath}.ts`);
  }
}
