import { Graph } from './Graph';
import graphRegistry from './registry/GraphRegistry';

export class UnresolvedDependencyExceptionFactory {
  generateErrorMessage(property: string, graph: Graph) {
    const graphName = graph.name;
    const subgraphs = graphRegistry.getSubgraphs(graph);
    const subgraphNames: string[] = subgraphs.map((subgraph: Graph) => { return subgraph.name; });
    console.log('error msg', graphName, subgraphNames);
    return `Could not resolve dependency ${property} in ${graphName} or in any of its subgraphs: ${subgraphNames}`;
  }
}
