import { graph, ObjectGraph, provides } from 'react-obsidian';

@graph()
export default class SimpleGraph extends ObjectGraph {
  @provides()
  instanceId(id:string): string {
    return id;
  }
}
