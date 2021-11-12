import GraphProperties from './GraphProperties';
import IObjectGraph from './IObjectGraph';

class ProvidedPropertiesStore {
  private readonly providedPropertiesForGraph: Map<string, GraphProperties> = new Map();

  getUnmangled(graph: IObjectGraph): string[] {
    const graphProperties = this.providedPropertiesForGraph.get(graph.constructor.name);
    return graphProperties?.unmangledProperties ?? [];
  }

  getMangledProperty(graph: IObjectGraph, unmangledProp: string): string | undefined {
    const className = graph.constructor.name;
    return this.providedPropertiesForGraph.get(className)?.getMangledProperty(unmangledProp);
  }

  set(graph: IObjectGraph, mangledProperty: string, unmangledProperty: string) {
    const className = graph.constructor.name;
    const graphProperties = this.providedPropertiesForGraph.get(className) ?? new GraphProperties();
    graphProperties.add(mangledProperty, unmangledProperty);
    this.providedPropertiesForGraph.set(className, graphProperties);
  }

  clear(graph: IObjectGraph) {
    this.providedPropertiesForGraph.delete(graph.constructor.name);
  }
}

export default new ProvidedPropertiesStore();
