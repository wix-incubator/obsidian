/* eslint-disable obsidian/no-circular-dependencies */
import {
  graph,
  ObjectGraph,
  provides,
  singleton,
} from '../../src';

@singleton() @graph()
export class SubgraphWithCircularDependency extends ObjectGraph {
  @provides()
  dep2(dep3: any): any {
    return dep3;
  }

  @provides()
  dep3(dep2: any): any {
    return dep2;
  }
}
