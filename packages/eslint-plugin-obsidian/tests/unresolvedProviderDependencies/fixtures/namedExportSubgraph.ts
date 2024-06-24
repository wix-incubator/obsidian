import { uniqueId } from 'lodash';
import { Graph, ObjectGraph, Provides } from 'react-obsidian';

@Graph()
export class Subgraph extends ObjectGraph {
  @Provides()
  instanceId(): string {
    return uniqueId('graph');
  }
}
