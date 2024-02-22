export const invalidGraph = `import { Graph, ObjectGraph, Provides } from 'src';

@Graph()
export default class SimpleGraph extends ObjectGraph {
  @Provides()
  instanceId(id:string): string {
    return id;
  }
}`;

export const invalidGraphWithSubgraph = `import {
  Graph,
  ObjectGraph,
  Provides,
}  from 'src';
import Subgraph from './subgraph';

@Graph({ subgraphs: [Subgraph] })
export default class SimpleGraphWithSubgraph extends ObjectGraph {
  @Provides()
  someClass(wrongDep:string): string {
    return wrongDep;
  }
}`;
