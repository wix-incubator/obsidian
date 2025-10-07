import { graph, ObjectGraph, provides } from 'react-obsidian';
import GraphWithSubgraph from './graphWithSubgraph';

@graph({ subgraphs: [GraphWithSubgraph] })
export default class GraphWithNestedSubgraphs extends ObjectGraph {
  @provides()
  bar(foo: string): string {
    return foo + 'bar';
  }
}
