import { Constructable } from '../../types';
import { Graph } from '../Graph';
import { Middleware } from './Middleware';
import GraphMiddlewareChain from './GraphMiddlewareChain';
import { ObtainLifecycleBoundGraphException } from './ObtainLifecycleBoundGraphException';

export class GraphRegistry {
  private readonly constructorToInstance = new Map<Constructable<Graph>, Set<Graph>>();
  private readonly instanceToConstructor = new Map<Graph, Constructable<Graph>>();
  private readonly injectionTokenToInstance = new Map<string, Graph>();
  private readonly instanceToInjectionToken = new Map<Graph, string>();
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
    return Array.from(subgraphs).map(G => this.resolve(G));
  }

  getGraphInstance(name: string): Graph {
    return this.nameToInstance.get(name)!;
  }

  resolve<T extends Graph>(
    Graph: Constructable<T>,
    source: 'lifecycleOwner' | 'classInjection' | 'serviceLocator' = 'lifecycleOwner',
    props: any = undefined,
    injectionToken?: string,
  ): T {
    if ((this.isSingleton(Graph) || this.isBoundToReactLifecycle(Graph)) && this.has(Graph, injectionToken)) {
      return this.isComponentScopedLifecycleBound(Graph)
        ? this.getByInjectionToken(Graph, injectionToken)
        : this.getFirst(Graph);
    }
    if (this.isBoundToReactLifecycle(Graph) && source !== 'lifecycleOwner') {
      throw new ObtainLifecycleBoundGraphException(Graph);
    }
    const graph = this.graphMiddlewares.resolve(Graph, props);
    this.set(Graph, graph, injectionToken);
    return graph as T;
  }

  private has(Graph: Constructable<Graph>, injectionToken?: string): boolean {
    const instances = this.constructorToInstance.get(Graph);
    if (!instances) return false;

    if (this.isComponentScopedLifecycleBound(Graph)) {
      return Array
        .from(instances)
        .some(graph => this.instanceToInjectionToken.get(graph) === injectionToken);
    }

    return (this.constructorToInstance.get(Graph)?.size ?? 0) > 0;
  }

  private getFirst<T extends Graph>(Graph: Constructable<T>): T {
    return this.constructorToInstance.get(Graph)!.values().next().value as T;
  }

  private getByInjectionToken<T extends Graph>(Graph: Constructable<T>, injectionToken?: string): T {
    return Array
      .from(this.constructorToInstance.get(Graph)!)
      .find((graph) => {
        return this.instanceToInjectionToken.get(graph) === injectionToken;
      }) as T;
  }

  private set(Graph: Constructable<Graph>, graph: Graph, injectionToken?: string) {
    const graphs = this.constructorToInstance.get(Graph) ?? new Set();
    if (injectionToken && this.isComponentScopedLifecycleBound(Graph)) {
      this.injectionTokenToInstance.set(injectionToken, graph);
      this.instanceToInjectionToken.set(graph, injectionToken);
    }
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

  private isComponentScopedLifecycleBound(Graph: Constructable<Graph>): boolean {
    return Reflect.getMetadata('lifecycleScope', Graph) === 'component';
  }

  clearGraphAfterItWasMockedInTests(graphName: string) {
    const graphNames = this.nameToInstance.keys();
    for (const name of graphNames) {
      if (name.match(graphName)) {
        const graph = this.nameToInstance.get(name);
        if (!graph) return;
        const Graph = this.instanceToConstructor.get(graph);
        if (!Graph) return;

        this.instanceToConstructor.delete(graph);
        this.constructorToInstance.get(Graph)!.delete(graph);
        this.nameToInstance.delete(graph.name);
        const token = this.instanceToInjectionToken.get(graph);
        if (token) {
          this.injectionTokenToInstance.delete(token);
          this.instanceToInjectionToken.delete(graph);
        }
      }
    }
  }

  clear(graph: Graph) {
    const Graph = this.instanceToConstructor.get(graph);
    if (!Graph || this.isSingleton(Graph)) return;
    this.instanceToConstructor.delete(graph);
    this.constructorToInstance.get(Graph)!.delete(graph);
    this.nameToInstance.delete(graph.name);
    const token = this.instanceToInjectionToken.get(graph);
    if (token) {
      this.injectionTokenToInstance.delete(token);
      this.instanceToInjectionToken.delete(graph);
    }
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
    this.injectionTokenToInstance.clear();
    this.instanceToInjectionToken.clear();
  }
}

// @ts-expect-error - workaround an issue in jest tests where the registry was created multiple times
global.graphRegistry = global.graphRegistry || new GraphRegistry();
// @ts-expect-error - see above
export default global.graphRegistry as GraphRegistry;
