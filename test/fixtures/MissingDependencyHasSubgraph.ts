import { Graph, ObjectGraph, Provides } from '../../src';
import { MissingDependencyGraph } from './MissingDependencyGraph';

@Graph({ subgraphs: [MissingDependencyGraph] })
export class MissingDependencyHasSubgraph extends ObjectGraph {
  @Provides()
  aString(aString: string) {
    return aString;
  }
}
