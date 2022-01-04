import { Constructable } from '../../types';
import { Graph } from '../Graph';
import { Middleware } from './Middleware';
import GraphMiddlewareChain from './GraphMiddlewareChain';

export class GraphRegistry {
  private readonly constructorToInstance = new Map<Constructable<Graph>, Set<Graph>>();
  private readonly instanceToConstructor = new Map<Graph, Constructable<Graph>>();
  private readonly graphToSubgraphs = new Map<Constructable<Graph>, Set<Constructable<Graph>>>();
  private readonly graphMiddlewares = new GraphMiddlewareChain();

  register(constructor: Constructable<Graph>, subgraphs: Constructable<Graph>[] = []) {
    this.graphToSubgraphs.set(constructor, new Set(subgraphs));
  }

  getSubgraphs(graph: Graph): Graph[] {
    const Graph = this.instanceToConstructor.get(graph)!;
    const subgraphs = this.graphToSubgraphs.get(Graph) ?? new Set();
    return Array.from(subgraphs).map((G) => this.resolve(G));
  }

  resolve<T extends Graph>(Graph: Constructable<T>, props?: any): T {
    if (this.isSingleton(Graph) && this.has(Graph)) {
      return this.getFirst(Graph);
    }
    const graph = this.graphMiddlewares.resolve(Graph, props);
    this.set(Graph, graph);
    return graph as T;
  }

  private has(Graph: Constructable<Graph>) {
    return this.constructorToInstance.has(Graph);
  }

  private getFirst<T extends Graph>(Graph: Constructable<T>): T {
    return this.constructorToInstance.get(Graph)!.values().next().value;
  }

  private set(Graph: Constructable<Graph>, graph: Graph) {
    const graphs = this.constructorToInstance.get(Graph) ?? new Set();
    graphs.add(graph);
    this.constructorToInstance.set(Graph, graphs);
    this.instanceToConstructor.set(graph, Graph);
  }

  private isSingleton(Graph: Constructable<Graph>): boolean {
    return Reflect.getMetadata('isSingleton', Graph) ?? false;
  }

  clear(graph: Graph) {
    const Graph = this.instanceToConstructor.get(graph)!;
    this.instanceToConstructor.delete(graph);
    this.constructorToInstance.delete(Graph);
  }

  addGraphMiddleware(middleware: Middleware<Graph>) {
    this.graphMiddlewares.add(middleware);
  }

  clearGraphMiddlewares() {
    this.graphMiddlewares.clear();
  }
}

export default new GraphRegistry();
