import { graph, ObjectGraph, provides, lifecycleBound } from '../../src';

@lifecycleBound({ inactiveBehavior: 'retain' }) @graph()
export class RetainedLifecycleBoundGraph extends ObjectGraph<Record<string, any>> {
  static timesCreated = 0;

  constructor(props: Record<string, any> = {}) {
    super(props);
    RetainedLifecycleBoundGraph.timesCreated++;
  }

  @provides()
  doesNotRequireProps(): string {
    return 'A string that does not require props';
  }
}
