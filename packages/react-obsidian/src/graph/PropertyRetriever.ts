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
  ): unknown | undefined {
    return this.retrieveInternal(property, receiver, maybeDetector, false);
  }

  retrieveAll(
    property: string,
    receiver?: unknown,
    maybeDetector?: CircularDependenciesDetector,
  ): unknown | undefined {
    return this.retrieveInternal(property, receiver, maybeDetector, true);
  }

  private retrieveInternal(
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
          return graph.retrieveAll(dependencyName, receiver, circularDependenciesDetector);
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

    return includePrivate
      ? this.getAllFromSubgraphs(property, circularDependenciesDetector, receiver)
      : this.getFromSubgraphs(property, circularDependenciesDetector, receiver);
  }

  private getFromSubgraphs(
    property: string,
    circularDependenciesDetector: CircularDependenciesDetector,
    receiver: unknown,
  ): unknown | undefined {
    for (const subgraph of graphRegistry.getSubgraphs(this.graph)) {
      const result = subgraph.retrieve(property, receiver, circularDependenciesDetector);
      if (result) return result;
    }
    return undefined;
  }

  private getAllFromSubgraphs(
    property: string,
    circularDependenciesDetector: CircularDependenciesDetector,
    receiver: unknown,
  ): unknown | undefined {
    // First search public subgraphs
    for (const subgraph of graphRegistry.getSubgraphs(this.graph)) {
      const result = subgraph.retrieveAll(property, receiver, circularDependenciesDetector);
      if (result) return result;
    }

    // Also search private subgraphs
    for (const subgraph of graphRegistry.getPrivateSubgraphs(this.graph)) {
      const result = subgraph.retrieveAll(property, receiver, circularDependenciesDetector);
      if (result) return result;
    }
    return undefined;
  }
}

