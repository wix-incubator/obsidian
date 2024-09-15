/* eslint-disable obsidian/no-circular-dependencies */
import { graph, ObjectGraph, provides } from '../../src';

@graph()
export class CircularDependencyGraph2 extends ObjectGraph {
  @provides()
  dep1(dep2: any) {
    return dep2;
  }

  @provides()
  dep2(dep3: any): any {
    return dep3;
  }

  @provides()
  dep3(dep1: any): any {
    return dep1;
  }
}
