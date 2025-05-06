import { getDecorator, getDecoratedMethods } from "../utils/ts/decorators";
import { Provider } from "./provider";
import { ClassDeclaration, Expression, SyntaxKind, Node } from "ts-morph";
import { ProjectAdapter } from "../services/project/projectAdapter";
import { isDefined } from "../utils/objects";
import { getDefinition } from "../utils/ts/identifier";
import { DedupeSet } from "../utils/dedupeSet";

export class Graph {
  constructor (private project: ProjectAdapter, private node: ClassDeclaration) { }

  public resolveProvider(name: string) {
    return this.hasProvider(name) ?
      this.requireProvider(name) :
      this.requireProviderFromSubgraphs(name);
  }

  public hasProvider(name: string): boolean {
    return this.findProvider(name) !== undefined;
  }

  private requireProviderFromSubgraphs(providerName: string): Provider {
    const subgraphs = this.getSubgraphs();
    for (const graph of subgraphs) {
      if (graph.hasProvider(providerName)) {
        return graph.resolveProvider(providerName);
      }
    }
    throw new Error(`Provider ${providerName} not found in graph ${this.node.getName()}`);
  }

  public requireProvider(name: string) {
    return this.findProvider(name)!;
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
    return declaration && new Graph(this.project, declaration as ClassDeclaration);
  }

  private getSubgraphsFromDecorator() {
    const graphDecorator = getDecorator(this.node, ['Graph', 'graph']);
    const subgraphsArg = graphDecorator?.getArgument(0, 'subgraphs');
    return Node.isArrayLiteralExpression(subgraphsArg) ? subgraphsArg.getElements() : [];
  }

  public resolveProviders(dedupeSet = new DedupeSet()): Provider[] {
    const providers = this.getProviders().filter(provider => dedupeSet.dedupe(provider.name));
    const subgraphProviders = this.getSubgraphs().flatMap(subgraph => subgraph.resolveProviders(dedupeSet));
    return [...providers, ...subgraphProviders];
  }
}
