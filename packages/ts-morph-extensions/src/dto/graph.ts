import { getDecorator, getDecoratedMethods, getDefinition, Provider } from "../index";
import { ClassDeclaration, Expression, SyntaxKind, Node } from "ts-morph";
import { isDefined } from "../utils/objects";
import { DedupeSet } from "../utils/dedupeSet";

export class Graph {
  constructor (private node: ClassDeclaration) { }

  public get name(): string | undefined {
    return this.node.getName()
  }

  public resolveProvider(name: string) {
    return this.hasProvider(name) ?
      this.requireProvider(name) :
      this.resolveProviderFromSubgraphs(name);
  }

  public hasProvider(name: string): boolean {
    return this.findProvider(name) !== undefined;
  }

  public requireProvider(name: string) {
    return this.findProvider(name)!;
  }

  private resolveProviderFromSubgraphs(name: string): Provider | undefined {
    for (const subgraph of this.getSubgraphs()) {
      const provider = subgraph.resolveProvider(name);
      if (provider) return provider;
    }
  }

  public findProvider(name: string) {
    return this.getProviders().find(provider => provider.name === name);
  }

  public getProviders() {
    const providers = getDecoratedMethods(this.node, ['Provides', 'provides']);
    return providers.map(method => new Provider(method));
  }

  public getSubgraphs(): Graph[] {
    return this.getSubgraphsFromDecorator()
      .map(graph => this.getGraphFromSubgraph(graph))
      .filter(isDefined);
  }

  private getGraphFromSubgraph(graph: Expression) {
    const declaration = getDefinition(graph, SyntaxKind.ClassDeclaration);
    return declaration && new Graph(declaration as ClassDeclaration);
  }

  private getSubgraphsFromDecorator() {
    const graphDecorator = getDecorator(this.node, ['Graph', 'graph']);
    const subgraphsArg = graphDecorator?.getArgument(0, 'subgraphs');
    return Node.isArrayLiteralExpression(subgraphsArg) ? subgraphsArg.getElements() : [];
  }

  public resolveProviders(dedupeSet = new DedupeSet()): Provider[] {
    const ownProviders = this.getProviders().filter(provider => dedupeSet.dedupe(provider.name));
    const subgraphProviders = this.getSubgraphs().flatMap(subgraph => subgraph.resolveProviders(dedupeSet));
    const baseGraphProviders = this.getBaseGraph()?.getProviders().filter(provider => dedupeSet.dedupe(provider.name)) || [];
    return [...ownProviders, ...baseGraphProviders, ...subgraphProviders];
  }

  private getBaseGraph(): Graph | undefined {
    if (this.node.getBaseClass()) return new Graph(this.node.getBaseClass() as ClassDeclaration);
  }
}
