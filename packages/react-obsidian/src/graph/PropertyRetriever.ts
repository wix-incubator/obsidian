import graphRegistry from './registry/GraphRegistry';
import { Graph } from './Graph';
import providedPropertiesStore from '../ProvidedPropertiesStore';
import { CircularDependenciesDetector } from './CircularDependenciesDetector';
import { Reflect } from '../utils/reflect';

export default class PropertyRetriever {
  constructor (private graph: Graph) { }

  retrieve(
    property: string,
    receiver?: unknown,
    maybeDetector?: CircularDependenciesDetector,
    includePrivate: boolean = false,
  ): unknown | undefined {
    const mangledPropertyKey = providedPropertiesStore.getMangledProperty(this.graph, property);
    const circularDependenciesDetector = maybeDetector ?? new CircularDependenciesDetector(this.graph.name);

    if (
      mangledPropertyKey
      && mangledPropertyKey in this.graph
      && circularDependenciesDetector.visit(this.graph.name, property)
    ) {
      const proxiedGraph = new Proxy(this.graph, {
        get(graph: Graph, dependencyName: string) {
          return graph.retrieve(dependencyName, receiver, circularDependenciesDetector, true);
        },
      });
      const resolved = Reflect.get(this.graph, mangledPropertyKey, receiver)(proxiedGraph);
      circularDependenciesDetector.clear();
      return resolved;
    }

    if (circularDependenciesDetector.hasCircularDependencies()) {
      throw new Error(
        `Could not resolve ${circularDependenciesDetector.firstDependencyName}`
        + ` from ${circularDependenciesDetector.graphName} because of a circular dependency:`
        + ` ${circularDependenciesDetector.getDependencies().join(' -> ')}`,
      );
    }

    return this.getFromSubgraphs(property, circularDependenciesDetector, receiver, includePrivate);
  }

  private getFromSubgraphs(
    property: string,
    circularDependenciesDetector: CircularDependenciesDetector,
    receiver: unknown,
    includePrivate: boolean,
  ): unknown | undefined {
    // First search public subgraphs
    for (const subgraph of graphRegistry.getSubgraphs(this.graph)) {
      const result = subgraph.retrieve(property, receiver, circularDependenciesDetector, includePrivate);
      if (result) return result;
    }

    // If includePrivate is true, also search private subgraphs
    if (includePrivate) {
      for (const subgraph of graphRegistry.getPrivateSubgraphs(this.graph)) {
        const result = subgraph.retrieve(property, receiver, circularDependenciesDetector, includePrivate);
        if (result) return result;
      }
    }

    return undefined;
  }
}

