import { RetrieveStrategy } from './retrieveStrategy';
import graphRegistry from '../registry/GraphRegistry';
import { CircularDependenciesDetector } from '../CircularDependenciesDetector';
import { Graph } from '../Graph';

export class RetrieveFromPublicSubgraphs implements RetrieveStrategy {
  constructor(private readonly graph: Graph) { }

  retrieve(
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
}
