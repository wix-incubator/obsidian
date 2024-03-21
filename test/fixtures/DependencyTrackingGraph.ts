import {
  Graph,
  ObjectGraph,
  Provides,
  Singleton,
} from '../../src';

export const SOME_STRING = 'This is some dependency';

@Singleton() @Graph()
export class DependencyTrackingGraph extends ObjectGraph {
  private readonly createdDependenciesInternal = new Set<string>();

  @Provides()
  someString(): string {
    this.createdDependenciesInternal.add('someDependency');
    return SOME_STRING;
  }

  @Provides()
  createdDependencies(): Set<string> {
    return this.createdDependenciesInternal;
  }
}
