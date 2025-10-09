import { graph, ObjectGraph, provides } from 'react-obsidian';
import Subgraph from './subgraph';

@graph({ subgraphs: [Subgraph] })
export default class ValidGraphWithSubgraph extends ObjectGraph {
  @provides()
  someDep(instanceId: string): string {
    return instanceId;
  }
}
