export const validGraphSimple = `import { uniqueId } from 'lodash';
import { Graph, ObjectGraph, Provides } from 'src';

@Graph()
export default class SimpleGraph extends ObjectGraph {
  @Provides()
  instanceId(): string {
    return 'graph';
  }
}`;

export const validGraphWithSubgraph = `import {
  Graph,
  ObjectGraph,
  Provides,
}  from 'src';
import Subgraph from './subgraph';


@Graph({ subgraphs: [Subgraph] })
export default class SimpleGraphWithSubgraph extends ObjectGraph {
  @Provides()
  someClass(instanceId:string): string {
    return instanceId;
  }
}`;
