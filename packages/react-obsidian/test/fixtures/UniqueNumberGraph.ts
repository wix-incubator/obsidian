import {
  Graph,
  ObjectGraph,
  Provides,
  Singleton,
} from '../../src';

@Graph()
export class UniqueNumberGraph extends ObjectGraph {
  constructor(private uniqueNumberGenerator: () => number) {
    super();
  }

  @Provides() @Singleton()
  singletonNumber(): number {
    return this.uniqueNumberGenerator();
  }

  @Provides()
  instanceNumber(): number {
    return this.uniqueNumberGenerator();
  }
}
