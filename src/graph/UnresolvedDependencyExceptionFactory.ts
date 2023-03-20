import { Graph } from './Graph';

export class UnresolvedDependencyExceptionFactory {
  generateErrorMessage(property: string, graph: Graph) {
    const graphName = graph.name;
    return `Could not resolve dependency ${property} in ${graphName}`;
  }
}
