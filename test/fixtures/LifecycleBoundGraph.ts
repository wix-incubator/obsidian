import { Graph, ObjectGraph } from '../../src';
import { LifecycleBound } from '../../src/decorators/LifecycleBound';

@LifecycleBound() @Graph()
export class LifecycleBoundGraph extends ObjectGraph {
  static timesCreated = 0;

  constructor() {
    super();
    LifecycleBoundGraph.timesCreated++;
  }
}
