import { Graph, ObjectGraph, Provides } from 'react-obsidian';
import Subgraph from './subgraph';

@Graph({subgraphs: [Subgraph]})
export default class GraphWithSubgraph extends ObjectGraph {
  @Provides()
  someString(instanceId: string, foo: string): string {
    return `foo${instanceId}${foo}`;
  }
}
