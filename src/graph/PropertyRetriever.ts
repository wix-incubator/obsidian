import graphRegistry from './registry/GraphRegistry';
import { Graph } from './Graph';
import providedPropertiesStore from '../ProvidedPropertiesStore';

export default class PropertyRetriever {
  constructor(private graph: Graph) { }

  retrieve(property: string, receiver?: unknown): unknown | undefined {
    const mangledPropertyKey = providedPropertiesStore.getMangledProperty(this.graph, property);
    if (mangledPropertyKey && mangledPropertyKey in this.graph) {
      const proxiedGraph = new Proxy(this.graph, {
        get(graph: Graph, dependencyName: string) {
          return graph.retrieve(dependencyName);
        },
      });
      return Reflect.get(this.graph, mangledPropertyKey, receiver)(proxiedGraph);
    }

    const results = this.getFromSubgraphs(property, receiver);
    if (results.length === 1) return results[0];
    if (results.length > 1) {
      throw new Error(
        `Multiple subgraphs provide the property ${property}.`
        + 'You should probably provide a unique name to one of the providers: @Provide({name: \'uniqueName\')})',
      );
    }
    return undefined;
  }

  private getFromSubgraphs(property: string, receiver: unknown): unknown[] {
    const subgraphs = graphRegistry.getSubgraphs(this.graph);
    return subgraphs
      .map((subgraph: Graph) => subgraph.retrieve(property, receiver))
      .filter((result) => result !== undefined);
  }
}
