import { graph, ObjectGraph, provides } from 'react-obsidian';
import { GraphThatExtendsAnotherGraph } from './graphThatExtendsAnotherGraph';

@graph({ subgraphs: [GraphThatExtendsAnotherGraph] })
export default class GraphA extends ObjectGraph {
  @provides()
  foo(bar: string, baz: string): string {
    return 'foo' + bar + baz;
  }
}
