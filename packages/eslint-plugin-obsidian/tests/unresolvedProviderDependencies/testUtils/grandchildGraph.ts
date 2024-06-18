import { Graph, ObjectGraph, Provides } from 'react-obsidian';

@Graph()
export default class GrandchildGraph extends ObjectGraph {
  @Provides()
  baz(): string {
    return 'baz';
  }
}
