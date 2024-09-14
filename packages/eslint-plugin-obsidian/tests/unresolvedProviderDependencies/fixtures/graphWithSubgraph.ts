import { graph, ObjectGraph, provides } from 'react-obsidian';
import Subgraph from './subgraph';

@graph({ subgraphs: [Subgraph] })
export default class GraphWithSubgraph extends ObjectGraph {
  @provides()
  someString(instanceId: string, foo: string): string {
    return `foo${instanceId}${foo}`;
  }
}
