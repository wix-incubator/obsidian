import {
  graph,
  ObjectGraph,
  provides,
  singleton,
} from '../../src';

@graph()
export class UniqueNumberGraph extends ObjectGraph {
  constructor(private uniqueNumberGenerator: () => number) {
    super();
  }

  @provides() @singleton()
  singletonNumber(): number {
    return this.uniqueNumberGenerator();
  }

  @provides()
  instanceNumber(): number {
    return this.uniqueNumberGenerator();
  }
}
