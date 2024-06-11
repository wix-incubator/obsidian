import {
  Graph,
  ObjectGraph,
  Provides,
  Singleton,
} from '../../src';

@Singleton() @Graph()
export class SubgraphWithCircularDependency extends ObjectGraph {
  @Provides()
  dep2(dep3: any): any {
    return dep3;
  }

  @Provides()
  dep3(dep2: any): any {
    return dep2;
  }
}
