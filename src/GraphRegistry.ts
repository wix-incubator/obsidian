import { Constructable, Scope } from '@Obsidian';
import IObjectGraph from './IObjectGraph';

class GraphRegistry {
  private readonly scopedGraphs: Record<Scope, Constructable<IObjectGraph>> = {};
  private readonly constructorToInstance = new Map<Constructable<IObjectGraph>, IObjectGraph>();
  private readonly instanceToConstructor = new Map<IObjectGraph, Constructable<IObjectGraph>>();
  private readonly graphToSubgraphs = new Map<Constructable<IObjectGraph>, Set<Constructable<IObjectGraph>>>();

  register(
    constructor: Constructable<IObjectGraph>,
    scope: Scope | undefined = undefined,
    subgraphs: Constructable<IObjectGraph>[] = [],
  ) {
    if (scope) this.scopedGraphs[scope] = constructor;
    this.graphToSubgraphs.set(constructor, new Set(subgraphs));
  }

  has(Graph: Constructable<IObjectGraph>) {
    return this.constructorToInstance.has(Graph);
  }

  get<T extends IObjectGraph>(Graph: Constructable<T>): T {
    return this.constructorToInstance.get(Graph)! as unknown as T;
  }

  set(Graph: Constructable<IObjectGraph>, graph: IObjectGraph) {
    this.constructorToInstance.set(Graph, graph);
    this.instanceToConstructor.set(graph, Graph);
  }

  getSubgraphs(graph: IObjectGraph): IObjectGraph[] {
    const Graph = this.instanceToConstructor.get(graph)!;
    const subgraphs = this.graphToSubgraphs.get(Graph) ?? new Set();
    return Array.from(subgraphs).map((G) => this.resolve(G));
  }

  resolve<T extends IObjectGraph>(Graph: Constructable<T>, props?: any): T {
    if (this.has(Graph)) {
      const graph: T = this.get(Graph);
      const scope = Reflect.getMetadata('scope', Graph);
      if (scope) return graph;

      this.set(Graph, new Graph(props));
    }
    const graph = new Graph(props);
    this.set(Graph, graph);
    return graph;
  }

  clear(graph: IObjectGraph) {
    const Graph = this.instanceToConstructor.get(graph)!;
    this.instanceToConstructor.delete(graph);
    this.constructorToInstance.delete(Graph);
  }
}

export default new GraphRegistry();
