import { uniqueId } from 'lodash';
import { graph, ObjectGraph, provides } from 'react-obsidian';

@graph()
export class Subgraph extends ObjectGraph {
  @provides()
  instanceId(): string {
    return uniqueId('graph');
  }
}
