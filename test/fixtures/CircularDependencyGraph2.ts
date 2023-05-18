import { Graph, ObjectGraph, Provides } from '../../src';

@Graph()
export class CircularDependencyGraph2 extends ObjectGraph {
  @Provides()
  dep1(dep2: any) {
    return dep2;
  }

  @Provides()
  dep2(dep3: any): any {
    return dep3;
  }

  @Provides()
  dep3(dep1: any): any {
    return dep1;
  }
}
