import { graph, ObjectGraph, provides } from 'react-obsidian';
import { Subgraph } from './namedExportSubgraph';

@graph({ subgraphs: [Subgraph] })
export default class SimpleGraphWithNamedExportSubgraph extends ObjectGraph {
  @provides()
  someDep(instanceId:string): string {
    return instanceId;
  }
}
