import { Graph, ObjectGraph } from '../../src';
import { createScope } from '../../src/decorators/Scope';

const TestScope = createScope('testScope1');

@TestScope() @Graph()
export class ScopedGraph extends ObjectGraph {
  static timesCreated = 0;

  constructor() {
    super();
    ScopedGraph.timesCreated++;
  }
}
