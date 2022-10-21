import { Constructable } from '../../types';
import { Graph } from '../Graph';
import { Middleware } from './Middleware';
import GraphMiddlewareChain from './GraphMiddlewareChain';

export class GraphRegistry {
  private readonly constructorToInstance = new Map<Constructable<Graph>, Set<Graph>>();
  private readonly instanceToConstructor = new Map<Graph, Constructable<Graph>>();
  private readonly nameToInstance = new Map<string, Graph>();
  private readonly graphToSubgraphs = new Map<Constructable<Graph>, Set<Constructable<Graph>>>();
  private readonly graphMiddlewares = new GraphMiddlewareChain();

  register(constructor: Constructable<Graph>, subgraphs: Constructable<Graph>[] = []) {
    this.graphToSubgraphs.set(constructor, new Set(subgraphs));
  }

  ensureRegistered(graph: Graph) {
    if (this.instanceToConstructor.get(graph)) return;
    this.set(graph.constructor as any, graph);
  }

  getSubgraphs(graph: Graph): Graph[] {
    const Graph = this.instanceToConstructor.get(graph)!;
    const subgraphs = this.graphToSubgraphs.get(Graph) ?? new Set();
    return Array.from(subgraphs).map((G) => this.resolve(G));
  }

  getGraphInstance(name: string): Graph {
    return this.nameToInstance.get(name)!;
  }

  resolve<T extends Graph>(Graph: Constructable<T>, props?: any): T {
    if ((this.isSingleton(Graph) || this.isBoundToReactLifecycle(Graph)) && this.has(Graph)) {
      return this.getFirst(Graph);
    }
    const graph = this.graphMiddlewares.resolve(Graph, props);
    this.set(Graph, graph);
    return graph as T;
  }

  private has(Graph: Constructable<Graph>): boolean {
    return (this.constructorToInstance.get(Graph)?.size ?? 0) > 0;
  }

  private getFirst<T extends Graph>(Graph: Constructable<T>): T {
    return this.constructorToInstance.get(Graph)!.values().next().value;
  }

  private set(Graph: Constructable<Graph>, graph: Graph) {
    const graphs = this.constructorToInstance.get(Graph) ?? new Set();
    graphs.add(graph);
    this.constructorToInstance.set(Graph, graphs);
    this.instanceToConstructor.set(graph, Graph);
    this.nameToInstance.set(graph.name, graph);
  }

  private isSingleton(Graph: Constructable<Graph>): boolean {
    return Reflect.getMetadata('isSingleton', Graph) ?? false;
  }

  private isBoundToReactLifecycle(Graph: Constructable<Graph>): boolean {
    return Reflect.getMetadata('isLifecycleBound', Graph) ?? false;
  }

  clear(graph: Graph) {
    const Graph = this.instanceToConstructor.get(graph)!;
    if (this.isSingleton(Graph)) return;
    this.instanceToConstructor.delete(graph);
    this.constructorToInstance.get(Graph)!.delete(graph);
    this.nameToInstance.delete(graph.name);
  }

  addGraphMiddleware(middleware: Middleware<Graph>) {
    this.graphMiddlewares.add(middleware);
  }

  clearGraphMiddlewares() {
    this.graphMiddlewares.clear();
  }

  clearAll() {
    this.instanceToConstructor.clear();
    this.constructorToInstance.clear();
    this.nameToInstance.clear();
  }
}

export default new GraphRegistry();
