import { PathResolver } from '../../src/framework/pathResolver';

export class PathResolverStub extends PathResolver {

  public override resolve(baseFilePath: string, relativeFilePath: string): string {
    if (this.$isRelativePath(relativeFilePath)) {
      return this.$resolveRelativePath(relativeFilePath);
    }
    return super.resolve(baseFilePath, relativeFilePath);
  }

  private $isRelativePath(filePath: string) {
    return filePath.startsWith('./') || filePath.startsWith('../');
  }

  private $resolveRelativePath(relativeFilePath: string) {
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