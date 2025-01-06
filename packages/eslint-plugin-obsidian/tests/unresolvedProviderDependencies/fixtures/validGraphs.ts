export const validGraph = `import { uniqueId } from 'lodash';
import { graph, ObjectGraph, provides } from 'src';

@graph()
export default class SimpleGraph extends ObjectGraph {
  @provides()
  instanceId(): string {
    return 'graph';
  }
}`;

export const validGraphWithSubgraph = `import {
  graph,
  ObjectGraph,
  provides,
}  from 'src';
import Subgraph from './subgraph';


@graph({ subgraphs: [Subgraph] })
export default class SimpleGraphWithSubgraph extends ObjectGraph {
  @provides()
  someDep(instanceId:string): string {
    return instanceId;
  }
}`;

export const validGraphWithNamedExportSubgraph = `import {
  graph,
  ObjectGraph,
  provides,
}  from 'src';
import { Subgraph } from './namedExportSubgraph';


@graph({ subgraphs: [Subgraph] })
export default class SimpleGraphWithNamedExportSubgraph extends ObjectGraph {
  @provides()
  someDep(instanceId:string): string {
    return instanceId;
  }
}`;

export const validLifecycleBoundGraphWithSubgraph = `import {
  graph,
  ObjectGraph,
  provides,
}  from 'src';
import Subgraph from './subgraph';


@lifecycleBound() @graph({ subgraphs: [Subgraph] })
export default class SimpleGraphWithSubgraph extends ObjectGraph {
  @provides()
  someClass(instanceId:string): string {
    return instanceId;
  }
}`;

export const validGraphWithNestedSubgraphs = `
import {
  graph,
  ObjectGraph,
  provides,
}  from 'src';
import GraphWithSubgraph from './graphWithSubgraph';

@graph({ subgraphs: [GraphWithSubgraph] })
export default class GraphWithNestedSubgraphs extends ObjectGraph {
  @provides()
  bar(foo: string): string {
    return foo + 'bar';
  }
}`;

export const validFileWithTwoGraphs = `
import {
  graph,
  ObjectGraph,
  provides,
}  from 'src';

@graph()
class Subgraph extends ObjectGraph {
  @provides()
  subgraphString(): string {
    return 'from subgraph';
  }
}

@graph({ subgraphs: [Subgraph] })
class MainGraph extends ObjectGraph {
  @provides()
  graphString(subgraphString: string): string {
    return 'from main ' + subgraphString;
  }
}`;

export const validGraphWithRegularMethod = `
import { graph, ObjectGraph, provides } from 'src';

@graph()
export default class SimpleGraph extends ObjectGraph {
  override onBind(target: any) {
    this.target = target;
  }

  @provides()
  foo(): string {
    return 'foo';
  }
}`;

export const validGraphThatExtendsAnotherGraph = `
import { Graph, ObjectGraph, Provides } from 'src';
import {AbstractGraph}  from './abstractGraph';

@Graph()
export default class GraphA extends AbstractGraph {
  @Provides()
  foo(bar: string): string {
    return 'foo' + bar;
  }
}
`;

export const validGraphWithSubgraphThatExtendsAnotherGraph = `
import { Graph, ObjectGraph, Provides } from 'src';
import { GraphThatExtendsAnotherGraph } from './graphThatExtendsAnotherGraph';

@Graph({ subgraphs: [GraphThatExtendsAnotherGraph] })
export default class GraphA extends ObjectGraph {
  @Provides()
  foo(bar: string, baz: string): string {
    return 'foo' + bar + baz;
  }
}
`;

export const validGraphThatExtendsAnotherConcreteGraph = `
@Graph()
class GraphA extends ObjectGraph {
  fromGraphA = 'from GraphA';

  @Provides()
  firstDep(): string {
    return "only {this.fromGraphA}";
  }

  @Provides()
  secondDep(): string {
    return this.fromGraphA;
  }
}

@Graph()
class GraphB extends GraphA {
  private fromGraphB = 'from GraphB';

  @Provides()
  override secondDep(): string {
    return "overriding {this.fromGraphB}";
  }

  @Provides()
  thirdDep(): string {
    return this.fromGraphB;
  }
}
`;
