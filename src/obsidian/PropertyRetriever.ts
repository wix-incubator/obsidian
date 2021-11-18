import graphRegistry from './GraphRegistry';
import IObjectGraph from './IObjectGraph';
import providedPropertiesStore from './ProvidedPropertiesStore';

export default class PropertyRetriever {
  constructor(private graph: IObjectGraph) { }

  retrieve(property: string, receiver?: unknown): unknown | undefined {
    const mangledPropertyKey = providedPropertiesStore.getMangledProperty(this.graph, property);
    if (mangledPropertyKey && mangledPropertyKey in this.graph) {
      const proxiedGraph = new Proxy(this.graph, {
        get(graph: IObjectGraph, dependencyName: string) {
          return graph.get(dependencyName);
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
      .map((subgraph: IObjectGraph) => subgraph.get(property, receiver))
      .filter((result) => result !== undefined);
  }
}
