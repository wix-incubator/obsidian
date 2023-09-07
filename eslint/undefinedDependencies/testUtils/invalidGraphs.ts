export const invalidGraph = `import { Graph, ObjectGraph, Provides } from 'src';

@Graph()
export default class SimpleGraph extends ObjectGraph {
  @Provides()
  instanceId(id:string): string {
    return id;
  }
}`;
