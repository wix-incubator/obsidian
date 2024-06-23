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

export const validLifecycleBoundGraphWithSubgraph = `import {
  Graph,
  ObjectGraph,
  Provides,
}  from 'src';
import Subgraph from './subgraph';


@LifecycleBound() @Graph({ subgraphs: [Subgraph] })
export default class SimpleGraphWithSubgraph extends ObjectGraph {
  @Provides()
  someClass(instanceId:string): string {
    return instanceId;
  }
}`;

export const validFileWithTwoGraphs = `
import {
  Graph,
  ObjectGraph,
  Provides,
}  from 'src';

@Graph()
class Subgraph extends ObjectGraph {
  @Provides()
  subgraphString(): string {
    return 'from subgraph';
  }

  @Provides()
  subgraphDescriminator(): string {
    return 'lol';
  }
}

@Graph({ subgraphs: [Subgraph] })
class MainGraph extends ObjectGraph {
  @Provides()
  graphString(subgraphString: string): string {
    return 'from main ' + subgraphString;
  }
}`;
