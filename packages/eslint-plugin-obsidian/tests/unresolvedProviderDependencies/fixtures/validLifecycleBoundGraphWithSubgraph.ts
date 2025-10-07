import {
graph,
ObjectGraph,
provides,
lifecycleBound,
} from 'react-obsidian';
import Subgraph from './subgraph';

@lifecycleBound() @graph({ subgraphs: [Subgraph] })
export default class SimpleGraphWithSubgraph extends ObjectGraph {
  @provides()
  someClass(instanceId:string): string {
    return instanceId;
  }
}
