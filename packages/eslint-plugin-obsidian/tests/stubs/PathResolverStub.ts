import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';
import path = require('path') ;
import { PathResolver } from '../../rules/framework/pathResolver';

export class PathResolverStub implements PathResolver {
  public resolve(context: RuleContext<any, any>, relativeFilePath: string): string {
    switch(relativeFilePath) {
      case './subgraph':
        return `${context.cwd}/tests/unresolvedProviderDependencies/testUtils/subgraph.ts`;
      default:
        return path.join(path.dirname(context.getFilename()), `${relativeFilePath}.ts`);
    }
  }
}