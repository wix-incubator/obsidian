import GraphProperties from './GraphProperties';
import Graph from './graph/Graph';

class ProvidedPropertiesStore {
  private readonly providedPropertiesForGraph: Map<string, GraphProperties> = new Map();

  getMangledProperty(graph: Graph, unmangledProp: string): string | undefined {
    const className = graph.constructor.name;
    return this.providedPropertiesForGraph.get(className)?.getMangledProperty(unmangledProp);
  }

  set(graph: Graph, mangledProperty: string, unmangledProperty: string) {
    const className = graph.constructor.name;
    const graphProperties = this.providedPropertiesForGraph.get(className) ?? new GraphProperties();
    graphProperties.add(mangledProperty, unmangledProperty);
    this.providedPropertiesForGraph.set(className, graphProperties);
  }

  clear(graph: Graph) {
    this.providedPropertiesForGraph.delete(graph.constructor.name);
  }
}

export default new ProvidedPropertiesStore();
