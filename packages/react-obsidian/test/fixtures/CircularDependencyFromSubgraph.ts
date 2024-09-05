import { Graph, ObjectGraph, Provides } from '../../src';
import { SubgraphWithCircularDependency } from './SubgraphWithCircularDependency';

@Graph({ subgraphs: [SubgraphWithCircularDependency] })
export class CircularDependencyFromSubgraph extends ObjectGraph {
  @Provides()
  dep1(dep2: unknown) {
    return dep2;
  }
}
