import _ from 'lodash';
import GraphProperties from './GraphProperties';
import graphRegistry from './GraphRegistry';
import IObjectGraph from './IObjectGraph';

class ProvidedPropertiesStore {
  private readonly providedPropertiesForGraph: Map<string, GraphProperties> = new Map();

  keyByUnmangled(graph: IObjectGraph, mapper: (unmangledProperty: string) => string): Record<string, any> {
    const props = {};
    _.chain([graph, ...graphRegistry.getSubgraphs(graph)])
      .flatMap((_graph) => this.getUnmangled(_graph))
      .uniq()
      .forEach((prop) => Reflect.set(props, prop, mapper(prop)))
      .value();
    return props;
  }

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
