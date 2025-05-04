import { graph, ObjectGraph, provides } from 'react-obsidian';
import { Subgraph } from './subgraph';

@graph({ subgraphs: [Subgraph] })
export class GraphWithSubgraph extends ObjectGraph {
  @provides()
  public foo() {
    return 'foo';
  }

  @provides()
  public bar() {
    return 'bar';
  }
}