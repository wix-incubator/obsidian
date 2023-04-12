import graphRegistry from './registry/GraphRegistry';
import { Graph } from './Graph';
import providedPropertiesStore from '../ProvidedPropertiesStore';
import { CircularDependenciesDetector } from './CircularDependenciesDetector';

export default class PropertyRetriever {
  constructor(private graph: Graph) { }

  retrieve(
    property: string,
    receiver?: unknown,
    maybeDetector?: CircularDependenciesDetector,
  ): unknown | undefined {
    const mangledPropertyKey = providedPropertiesStore.getMangledProperty(this.graph, property);
    const circularDependenciesDetector = maybeDetector ?? new CircularDependenciesDetector(mangledPropertyKey!);

    if (
      mangledPropertyKey
      && mangledPropertyKey in this.graph
      && circularDependenciesDetector.checkForCircularDependencies(this.graph.name, mangledPropertyKey)
    ) {
      circularDependenciesDetector.visit(this.graph.name, mangledPropertyKey);

      const proxiedGraph = new Proxy(this.graph, {
        get(graph: Graph, dependencyName: string) {
          return graph.retrieve(dependencyName, receiver, circularDependenciesDetector);
        },
      });
      return Reflect.get(this.graph, mangledPropertyKey, receiver)(proxiedGraph);
    }

    if (circularDependenciesDetector.hasCircularDependencies()) {
      throw new Error(
        `Could not resolve property ${circularDependenciesDetector.firstDependencyName}`
         + ` from ${this.graph.name} because of a circular dependency`,
      );
    }

    const results = this.getFromSubgraphs(property, circularDependenciesDetector, receiver);
    if (results.length === 1) return results[0];
    if (results.length > 1) {
      throw new Error(
        `Multiple subgraphs provide the property ${property}.`
        + 'You should probably provide a unique name to one of the providers: @Provide({name: \'uniqueName\')})',
      );
    }
    return undefined;
  }

  private getFromSubgraphs(
    property: string,
    circularDependenciesDetector: CircularDependenciesDetector,
    receiver: unknown,
  ): unknown[] {
    const subgraphs = graphRegistry.getSubgraphs(this.graph);
    return subgraphs
      .map((subgraph: Graph) => subgraph.retrieve(property, receiver, circularDependenciesDetector))
      .filter((result) => result !== undefined);
  }
}
