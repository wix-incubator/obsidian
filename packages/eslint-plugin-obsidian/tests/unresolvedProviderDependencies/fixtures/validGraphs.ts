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

export const validGraphWithExternalSubgraph = `
import { Graph, ObjectGraph, Provides } from 'src';
import { ExternalGraphB } from 'external-lib-b';

@Graph({ subgraphs: [ExternalGraphB] })
export default class GraphA extends ObjectGraph {
  @Provides()
  foo(complexExternalDepB: string): string {
    return 'foo' + complexExternalDepB;
  }
}
`;
