import { PathResolver } from '../../src/framework/pathResolver';

export class PathResolverStub implements PathResolver {
  public resolve(_baseFilePath: string, relativeFilePath: string): string {
    const cwd = process.cwd();
    switch (relativeFilePath) {
      case './subgraph':
        return `${cwd}/tests/unresolvedProviderDependencies/fixtures/subgraph.ts`;
      case './graphWithSubgraph':
        return `${cwd}/tests/unresolvedProviderDependencies/fixtures/graphWithSubgraph.ts`;
      case './namedExportSubgraph':
        return `${cwd}/tests/unresolvedProviderDependencies/fixtures/namedExportSubgraph.ts`;
      case './abstractGraph':
        return `${cwd}/tests/unresolvedProviderDependencies/fixtures/abstractGraph.ts`;
      case './graphThatExtendsAnotherGraph':
        return `${cwd}/tests/unresolvedProviderDependencies/fixtures/graphThatExtendsAnotherGraph.ts`;
      default:
        throw new Error(`PathResolverStub: Unhandled relativeFilePath: ${relativeFilePath}`);
    }
  }
}
