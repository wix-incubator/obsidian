export const invalidGraph = `import { graph, ObjectGraph, provides } from 'src';

@graph()
export default class SimpleGraph extends ObjectGraph {
  @provides()
  instanceId(id:string): string {
    return id;
  }
}`;

export const invalidGraphWithSubgraph = `import {
  graph,
  ObjectGraph,
  provides,
}  from 'src';
import Subgraph from './subgraph';

@graph({ subgraphs: [Subgraph] })
export default class SimpleGraphWithSubgraph extends ObjectGraph {
  @provides()
  someClass(wrongDep:string): string {
    return wrongDep;
  }
}`;
