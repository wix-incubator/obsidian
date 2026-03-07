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
      this.getBaseGraph()?.resolveProviderOrAbstract(name) ?? this.resolveProviderFromSubgraphs(name);
  }

  private resolveProviderOrAbstract(name: string): Provider | undefined {
    return this.findProvider(name)
      ?? this.findAbstractProvider(name)
      ?? this.getBaseGraph()?.resolveProviderOrAbstract(name);
  }

  private findAbstractProvider(name: string): Provider | undefined {
    const method = this.node.getMethods()
      .filter(m => m.isAbstract())
      .find(m => m.getName().replace(/^_/, '') === name);
    return method ? new Provider(method) : undefined;
  }

  public hasProvider(name: string): boolean {
    return this.findProvider(name) !== undefined;
  }

  public requireProvider(name: string) {
    return this.findProvider(name)!;
  }

  private resolveProviderFromSubgraphs(name: string): Provider | undefined {
    for (const subgraph of this.getAllSubgraphs()) {
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

  public getPrivateSubgraphs(): Graph[] {
    return this.getPrivateSubgraphsFromDecorator()
      .map(graph => this.getGraphFromSubgraph(graph))
      .filter(isDefined);
  }

  public getAllSubgraphs(): Graph[] {
    return [...this.getSubgraphs(), ...this.getPrivateSubgraphs()];
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

  private getPrivateSubgraphsFromDecorator() {
    const graphDecorator = getDecorator(this.node, ['Graph', 'graph']);
    const privateSubgraphsArg = graphDecorator?.getArgument(0, 'privateSubgraphs');
    return Node.isArrayLiteralExpression(privateSubgraphsArg) ? privateSubgraphsArg.getElements() : [];
  }

  public resolveProviders(dedupeSet = new DedupeSet()): Provider[] {
    const ownProviders = this.getProviders().filter(provider => dedupeSet.dedupe(provider.name));
    const allSubgraphProviders = this.getAllSubgraphs().flatMap(subgraph => subgraph.resolveProviders(dedupeSet));
    const baseGraphProviders = this.getBaseGraph()?.resolveBaseGraphProviders(dedupeSet) || [];
    return [...ownProviders, ...baseGraphProviders, ...allSubgraphProviders];
  }

  private resolveBaseGraphProviders(dedupeSet: DedupeSet): Provider[] {
    const decorated = this.getProviders().filter(p => dedupeSet.dedupe(p.name));
    const abstracts = this.getAbstractProviders().filter(p => dedupeSet.dedupe(p.name));
    const fromBase = this.getBaseGraph()?.resolveBaseGraphProviders(dedupeSet) || [];
    return [...decorated, ...abstracts, ...fromBase];
  }

  private getAbstractProviders(): Provider[] {
    return this.node.getMethods()
      .filter(m => m.isAbstract())
      .map(m => new Provider(m));
  }

  private getBaseGraph(): Graph | undefined {
    if (this.node.getBaseClass()) return new Graph(this.node.getBaseClass() as ClassDeclaration);
  }
}
