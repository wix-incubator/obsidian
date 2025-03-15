import { Graph, Provides } from 'react-obsidian';
import { AbstractGraph } from './abstractGraph';

@Graph()
export abstract class GraphThatExtendsAnotherGraph extends AbstractGraph {
  @Provides()
  baz(): string {
    return 'baz';
  }
}
