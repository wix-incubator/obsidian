import { graph, provides } from 'react-obsidian';
import { AbstractGraph } from './abstractGraph';

@graph()
export class GraphThatExtendsAnotherGraph extends AbstractGraph {
  @provides()
  baz(): string {
    return 'baz';
  }
}
