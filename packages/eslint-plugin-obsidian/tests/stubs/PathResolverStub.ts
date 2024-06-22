import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';
import { PathResolver } from '../../rules/framework/pathResolver';

export class PathResolverStub implements PathResolver {
  public resolve(context: RuleContext<any, any>, relativeFilePath: string): string {
    switch(relativeFilePath) {
      case './subgraph':
        return `${context.cwd}/tests/unresolvedProviderDependencies/fixtures/subgraph.ts`;
      case './graphWithSubgraph':
        return `${context.cwd}/tests/unresolvedProviderDependencies/fixtures/graphWithSubgraph.ts`;
      default:
        throw new Error(`PathResolverStub: Unhandled relativeFilePath: ${relativeFilePath}`);
    }
  }
}