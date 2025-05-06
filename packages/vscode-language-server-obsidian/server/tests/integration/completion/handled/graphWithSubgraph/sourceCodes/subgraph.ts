import { graph, ObjectGraph, provides } from 'react-obsidian';

@graph()
export class Subgraph extends ObjectGraph {
  @provides()
  public baz() {
    return 'baz';
  }
}