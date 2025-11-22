import { Graph } from '../Graph';
import providedPropertiesStore from '../../ProvidedPropertiesStore';
import { CircularDependenciesDetector } from '../CircularDependenciesDetector';
import { Reflect } from '../../utils/reflect';
import { RetrieveStrategy } from './retrieveStrategy';
import { RetrieveFromPublicSubgraphs } from './retrieveFromPublicSubgraphs';
import { RetrieveFromPublicAndPrivateSubgraphs } from './retrieveFromPublicAndPrivateSubgraphs';

export default class PropertyRetriever {
  private readonly retrieveFromPublicSubgraphs: RetrieveStrategy;
  private readonly retrieveFromPublicAndPrivateSubgraphs: RetrieveStrategy;

  constructor (private graph: Graph) {
    this.retrieveFromPublicSubgraphs = new RetrieveFromPublicSubgraphs(this.graph);
    this.retrieveFromPublicAndPrivateSubgraphs = new RetrieveFromPublicAndPrivateSubgraphs(this.graph);
  }

  retrieve(
    property: string,
    receiver?: unknown,
    maybeDetector?: CircularDependenciesDetector,
  ): unknown | undefined {
    return this.retrieveInternal(property, this.retrieveFromPublicSubgraphs, receiver, maybeDetector);
  }

  retrieveAll(
    property: string,
    receiver?: unknown,
    maybeDetector?: CircularDependenciesDetector,
  ): unknown | undefined {
    return this.retrieveInternal(property, this.retrieveFromPublicAndPrivateSubgraphs, receiver, maybeDetector);
  }

  private retrieveInternal(
    property: string,
    retrieveStrategy: RetrieveStrategy,
    receiver?: unknown,
    maybeDetector?: CircularDependenciesDetector,
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

    return retrieveStrategy.retrieve(property, circularDependenciesDetector, receiver);
  }
}
