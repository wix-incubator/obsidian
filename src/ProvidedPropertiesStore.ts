import GraphProperties from './GraphProperties';
import { Graph } from './graph/Graph';

class ProvidedPropertiesStore {
  private readonly providedPropertiesForGraph: Map<string, GraphProperties> = new Map();

  getMangledProperty(graph: Graph, unmangledProp: string): string | undefined {
    return this.providedPropertiesForGraph.get(graph.name)?.getMangledProperty(unmangledProp);
  }

  set(graph: Graph, mangledProperty: string, unmangledProperty: string) {
    const graphProperties = this.providedPropertiesForGraph.get(graph.name) ?? new GraphProperties();
    graphProperties.add(mangledProperty, unmangledProperty);
    this.providedPropertiesForGraph.set(graph.name, graphProperties);
  }

  getMangledProperties(graph: Graph): string[] {
    return this.providedPropertiesForGraph.get(graph.name)?.getMangledProperties() ?? [];
  }

  clear(graph: Graph) {
    this.providedPropertiesForGraph.delete(graph.name);
  }
}

export default new ProvidedPropertiesStore();
