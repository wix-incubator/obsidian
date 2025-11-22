import { CircularDependenciesDetector } from '../CircularDependenciesDetector';
import { RetrieveStrategy } from './retrieveStrategy';
import graphRegistry from '../registry/GraphRegistry';
import { Graph } from '../Graph';

export class RetrieveFromPublicAndPrivateSubgraphs implements RetrieveStrategy {
  constructor(private readonly graph: Graph) { }

  retrieve(
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
