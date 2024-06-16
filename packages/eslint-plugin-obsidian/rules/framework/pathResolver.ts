import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';
import path = require('path') ;

export class PathResolver {
  public resolve(context: RuleContext<any, any>, relativeFilePath: string) {
    return path.join(path.dirname(context.getFilename()), `${relativeFilePath}.ts`);
  }
}