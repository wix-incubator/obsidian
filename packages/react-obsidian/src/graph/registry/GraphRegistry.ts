import { Constructable } from '../../types';
import { Graph } from '../Graph';
import { Middleware } from './Middleware';
import GraphMiddlewareChain from './GraphMiddlewareChain';
import { ObtainLifecycleBoundGraphException } from './ObtainLifecycleBoundGraphException';
import { getMetadata } from '../../utils/reflect';
import { getGlobal } from '../../utils/getGlobal';
import { isString } from '../../utils/isString';
import referenceCounter from '../../ReferenceCounter';

export class GraphRegistry {
  private readonly constructorToInstance = new Map<Constructable<Graph>, Set<Graph>>();
  private readonly instanceToConstructor = new Map<Graph, Constructable<Graph>>();
  private readonly injectionTokenToInstance = new Map<string, Graph>();
  private readonly instanceToInjectionToken = new Map<Graph, string>();
  private readonly nameToInstance = new Map<string, Graph>();
  private readonly graphToSubgraphs = new Map<Constructable<Graph>, Set<Constructable<Graph>>>();
  private readonly graphMiddlewares = new GraphMiddlewareChain();
  private readonly keyToGenerator = new Map<string, () => Constructable<Graph>>();
  private readonly keyToGraph = new Map<string, Constructable<Graph>>();
  private readonly onClearListeners = new Map<Graph, Set<() => void>>();

  register(constructor: Constructable<Graph>, subgraphs: Constructable<Graph>[] = []) {
    this.graphToSubgraphs.set(constructor, new Set(subgraphs));
  }

  registerGraphGenerator(key: string, generator: () => Constructable<Graph>) {
    if (this.keyToGenerator.has(key)) throw new Error(`Attempted to register a graph generator for key "${key}" that is already registered.`);
    this.keyToGenerator.set(key, generator);
  }

  ensureRegistered(keyOrGraph: string | Graph) {
    if (isString(keyOrGraph)) return;
    const graph = keyOrGraph;
    if (this.instanceToConstructor.get(graph)) return;
    this.set(graph.constructor as any, graph);
  }

  public isInstantiated(G: Constructable<Graph>): boolean {
    return (this.constructorToInstance.get(G)?.size ?? 0) > 0;
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
    keyOrGraph: string | Constructable<T>,
    source: 'lifecycleOwner' | 'classInjection' | 'serviceLocator' = 'lifecycleOwner',
    props: any = undefined,
    injectionToken?: string,
  ): T {
    const Graph = isString(keyOrGraph) ?
      this.getGraphConstructorByKey<T>(keyOrGraph) :
      keyOrGraph;
    if ((this.isSingleton(Graph) || this.isBoundToReactLifecycle(Graph)) && this.has(Graph, injectionToken)) {
      return this.isComponentScopedLifecycleBound(Graph) ?
        this.getByInjectionToken(Graph, injectionToken) :
        this.getFirst(Graph);
    }
    if (this.isBoundToReactLifecycle(Graph) && source !== 'lifecycleOwner') {
      throw new ObtainLifecycleBoundGraphException(Graph);
    }
    const graph = this.graphMiddlewares.resolve(Graph, props);
    this.set(Graph, graph, injectionToken);
    this.instantiateCustomScopedSubgraphs(graph, props);
    return graph as T;
  }

  private instantiateCustomScopedSubgraphs(graph: Graph, props: any) {
    this.assertInstantiatingCustomScopedSubgraphFromSameScope(graph);
    if (!this.isCustomScopedLifecycleBound(this.instanceToConstructor.get(graph)!)) return;
    const customScope = getMetadata(this.instanceToConstructor.get(graph)!, 'lifecycleScope');
    const subgraphs = this.getSubgraphsConstructors(graph);
    const sameScopeSubgraphs = subgraphs.filter(
      subgraph => getMetadata(subgraph, 'lifecycleScope') === customScope,
    );
    const instantiatedSubgraphs = sameScopeSubgraphs.map(
      (subgraph) => {
        return this.resolve(subgraph, 'lifecycleOwner', props);
      },
    );
    instantiatedSubgraphs.forEach(subgraph => referenceCounter.retain(subgraph));
    this.registerOnClearListener(graph, () => {
      instantiatedSubgraphs.forEach(subgraph => referenceCounter.release(subgraph, () => this.clear(subgraph)));
    });
  }

  private assertInstantiatingCustomScopedSubgraphFromSameScope(graph: Graph) {
    const graphScope = getMetadata(this.instanceToConstructor.get(graph)!, 'lifecycleScope');
    const subgraphs = this.getSubgraphsConstructors(graph);
    subgraphs.forEach((subgraph) => {
      const subgraphScope = getMetadata(subgraph, 'lifecycleScope');
      if (
        !this.isInstantiated(subgraph)
        && this.isCustomScopedLifecycleBound(subgraph)
        && graphScope !== subgraphScope
      ) {
        throw new Error(`Cannot instantiate the scoped graph '${subgraph.name}' as a subgraph of '${graph.constructor.name}' because the scopes do not match. ${graphScope} !== ${subgraphScope}`);
      }
    });
  }

  private getSubgraphsConstructors(graph: Graph | Constructable<Graph>): Constructable<Graph>[] {
    const Graph = typeof graph === 'function' ? graph : this.instanceToConstructor.get(graph)!;
    const directSubgraphs = Array.from(this.graphToSubgraphs.get(Graph) ?? new Set<Constructable<Graph>>());
    if (directSubgraphs.length === 0) return [];
    return [
      ...directSubgraphs,
      ...new Set(
        directSubgraphs
          .map(subgraph => this.getSubgraphsConstructors(subgraph))
          .flat(),
      ),
    ];
  }

  private getGraphConstructorByKey<T extends Graph>(key: string): Constructable<T> {
    if (this.keyToGraph.has(key)) return this.keyToGraph.get(key) as Constructable<T>;
    const generator = this.keyToGenerator.get(key);
    if (!generator) throw new Error(`Attempted to resolve a graph by key "${key}" that is not registered. Did you forget to call Obsidian.registerGraph?`);
    const constructor = generator();
    this.keyToGraph.set(key, constructor);
    return constructor as Constructable<T>;
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
    return getMetadata(Graph, 'isSingleton') ?? false;
  }

  private isBoundToReactLifecycle(Graph: Constructable<Graph>): boolean {
    return getMetadata(Graph, 'isLifecycleBound') ?? false;
  }

  private isComponentScopedLifecycleBound(Graph: Constructable<Graph>): boolean {
    return getMetadata(Graph, 'lifecycleScope') === 'component';
  }

  private isCustomScopedLifecycleBound(Graph: Constructable<Graph>): boolean {
    const scope = getMetadata(Graph, 'lifecycleScope');
    return typeof scope === 'string' && scope !== 'component' && scope !== 'feature';
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
        this.invokeOnClearListeners(graph);
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

    this.clearGraphsRegisteredByKey(Graph);
    this.invokeOnClearListeners(graph);
  }

  private registerOnClearListener(graph: Graph, callback: () => void) {
    const listeners = this.onClearListeners.get(graph) ?? new Set();
    listeners.add(callback);
    this.onClearListeners.set(graph, listeners);
  }

  private invokeOnClearListeners(graph: Graph) {
    const listeners = this.onClearListeners.get(graph);
    if (!listeners) return;
    listeners.forEach(listener => listener());
    this.onClearListeners.delete(graph);
  }

  private clearGraphsRegisteredByKey(Graph: Constructable<Graph>) {
    [...this.keyToGraph.keys()]
      .map(key => [key, this.keyToGraph.get(key)!] as [string, Constructable<Graph>])
      .filter(([_, $Graph]) => $Graph === Graph)
      .forEach(([key, _]) => {
        this.keyToGraph.delete(key);
        this.keyToGenerator.delete(key);
      });
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
    this.keyToGenerator.clear();
    this.keyToGraph.clear();
  }
}

const globalObject = getGlobal();
globalObject.graphRegistry = globalObject.graphRegistry || new GraphRegistry();
export default globalObject.graphRegistry as GraphRegistry;
