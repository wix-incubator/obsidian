import { Constructable, Scope } from '@Obsidian';
import Graph from '../Graph';
import { GraphMiddleware } from './GraphMiddleware';
import GraphMiddlewareChain from './GraphMiddlewareChain';

class GraphRegistry {
  private readonly scopedGraphs: Record<Scope, Constructable<Graph>> = {};
  private readonly constructorToInstance = new Map<Constructable<Graph>, Graph>();
  private readonly instanceToConstructor = new Map<Graph, Constructable<Graph>>();
  private readonly graphToSubgraphs = new Map<Constructable<Graph>, Set<Constructable<Graph>>>();
  private graphMiddlewares = new GraphMiddlewareChain();

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
    const graph = this.graphMiddlewares.resolve(Graph, props);
    this.set(Graph, graph);
    return graph;
  }

  clear(graph: Graph) {
    const Graph = this.instanceToConstructor.get(graph)!;
    this.instanceToConstructor.delete(graph);
    this.constructorToInstance.delete(Graph);
  }

  addGraphMiddleware(middleware: GraphMiddleware) {
    this.graphMiddlewares.add(middleware);
  }

  clearGraphMiddlewares() {
    this.graphMiddlewares.clear();
  }
}

export default new GraphRegistry();
