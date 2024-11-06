import { graph, ObjectGraph, provides } from '../../src';
import { SubgraphWithCircularDependency } from './SubgraphWithCircularDependency';

@graph({ subgraphs: [SubgraphWithCircularDependency] })
export class CircularDependencyFromSubgraph extends ObjectGraph {
  @provides()
  dep1(dep2: unknown) {
    return dep2;
  }
}
