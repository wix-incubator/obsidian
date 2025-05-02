import { getDecorator, getDecoratedMethods } from "../utils/ts/decorators";
import { Provider } from "./provider";
import { ClassDeclaration, Expression, SyntaxKind, Node } from "ts-morph";
import { ProjectAdapter } from "../services/project/projectAdapter";
import { isDefined } from "../utils/objects";
import { getDefinition } from "../utils/ts/tsMorph";

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
    const provider = this.getProviders().find(
      provider => provider.getName() === name.replace(/^_/, '')
    );
    return provider && new Provider(provider);
  }

  public getProviders() {
    return getDecoratedMethods(this.node, ['Provides', 'provides']);
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
}
