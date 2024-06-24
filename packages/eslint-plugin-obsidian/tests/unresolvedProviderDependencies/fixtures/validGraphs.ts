export const validGraph = `import { uniqueId } from 'lodash';
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
  someDep(instanceId:string): string {
    return instanceId;
  }
}`;

export const validGraphWithNamedExportSubgraph = `import {
  Graph,
  ObjectGraph,
  Provides,
}  from 'src';
import { Subgraph } from './namedExportSubgraph';


@Graph({ subgraphs: [Subgraph] })
export default class SimpleGraphWithNamedExportSubgraph extends ObjectGraph {
  @Provides()
  someDep(instanceId:string): string {
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

export const validGraphWithNestedSubgraphs = `
import {
  Graph,
  ObjectGraph,
  Provides,
}  from 'src';
import GraphWithSubgraph from './graphWithSubgraph';

@Graph({ subgraphs: [GraphWithSubgraph] })
export default class GraphWithNestedSubgraphs extends ObjectGraph {
  @Provides()
  bar(foo: string): string {
    return foo + 'bar';
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
}

@Graph({ subgraphs: [Subgraph] })
class MainGraph extends ObjectGraph {
  @Provides()
  graphString(subgraphString: string): string {
    return 'from main ' + subgraphString;
  }
}`;

export const validGraphWithRegularMethod = `
import { Graph, ObjectGraph, Provides } from 'src';

@Graph()
export default class SimpleGraph extends ObjectGraph {
  override onBind(target: any) {
    this.target = target;
  }

  @Provides()
  foo(): string {
    return 'foo';
  }
}`;
