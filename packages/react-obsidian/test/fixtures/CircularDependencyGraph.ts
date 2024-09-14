import { graph, ObjectGraph, provides } from '../../src';

@graph()
export class CircularDependencyGraph extends ObjectGraph {
  @provides()
  aString(aString: string) {
    return aString;
  }
}
