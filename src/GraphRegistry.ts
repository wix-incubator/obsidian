import { Constructable, Scope } from '@Obsidian';
import Graph from './graph/Graph';

class GraphRegistry {
  private readonly scopedGraphs: Record<Scope, Constructable<Graph>> = {};
  private readonly constructorToInstance = new Map<Constructable<Graph>, Graph>();
  private readonly instanceToConstructor = new Map<Graph, Constructable<Graph>>();
  private readonly graphToSubgraphs = new Map<Constructable<Graph>, Set<Constructable<Graph>>>();
  private readonly replacedGraphs = new Map<Constructable<Graph>, Constructable<Graph>>();

  register(
    constructor: Constructable<Graph>,
    scope: Scope | undefined = undefined,
    subgraphs: Constructable<Graph>[] = [],
  ) {
    if (scope) this.scopedGraphs[scope] = constructor;
    this.graphToSubgraphs.set(constructor, new Set(subgraphs));
  }

  has(Graph: Constructable<Graph>) {
    return this.constructorToInstance.has(Graph);
  }

  get<T extends Graph>(Graph: Constructable<T>): T {
    return this.constructorToInstance.get(Graph)! as unknown as T;
  }

  set(Graph: Constructable<Graph>, graph: Graph) {
    this.constructorToInstance.set(Graph, graph);
    this.instanceToConstructor.set(graph, Graph);
  }

  getSubgraphs(graph: Graph): Graph[] {
    const Graph = this.instanceToConstructor.get(graph)!;
    const subgraphs = this.graphToSubgraphs.get(Graph) ?? new Set();
    return Array.from(subgraphs).map((G) => this.resolve(G));
  }

  resolve<T extends Graph>(Graph: Constructable<T>, props?: any): T {
    if (this.has(Graph)) {
      return this.get(Graph);
      // const graph: T = this.get(Graph);
      // const scope = Reflect.getMetadata('scope', Graph);
      // if (scope) return graph;

      // this.set(Graph, new Graph(props));
    }
    const graph = this.instantiate(Graph, props);
    this.set(Graph, graph);
    return graph;
  }

  instantiate<T extends Graph>(Graph: Constructable<T>, props?: any): T {
    if (!this.replacedGraphs.has(Graph)) return new Graph(props);
    const ReplacementGraph = this.replacedGraphs.get(Graph)!;
    return new ReplacementGraph(props) as T;
  }

  clear(graph: Graph) {
    const Graph = this.instanceToConstructor.get(graph)!;
    this.instanceToConstructor.delete(graph);
    this.constructorToInstance.delete(Graph);
  }

  replace<T extends Graph>(oldGraph: Constructable<T>, newGraph: Constructable<T>) {
    this.replacedGraphs.set(oldGraph, newGraph);
  }
}

export default new GraphRegistry();
