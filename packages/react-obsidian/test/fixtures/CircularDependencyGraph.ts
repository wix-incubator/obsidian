import { Graph, ObjectGraph, Provides } from '../../src';

@Graph()
export class CircularDependencyGraph extends ObjectGraph {
  @Provides()
  aString(aString: string) {
    return aString;
  }
}
