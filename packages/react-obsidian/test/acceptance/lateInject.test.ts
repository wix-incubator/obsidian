import {
  graph,
  injectable,
  lateInject,
  ObjectGraph,
  Obsidian,
  provides,
  mockGraphs,
} from '../../src';

describe('Late inject', () => {
  it('injects from a concrete graph instance', () => {
    mockGraphs({ Subgraph: MockedSubgraph });

    class Injected {
      @lateInject() graphString!: string;

      constructor() {
        Obsidian.inject(this, new MockedMainGraph());
      }
    }

    expect(new Injected().graphString).toBe('from mocked main from mocked subgraph');
  });

  it('injects from a graph class', () => {
    mockGraphs({ Subgraph: MockedSubgraph });

    @injectable(MockedMainGraph)
    class Injected {
      @lateInject() graphString!: string;

      constructor() {
        Obsidian.inject(this);
      }
    }

    expect(new Injected().graphString).toBe('from mocked main from mocked subgraph');
  });
});

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
    return `from main ${subgraphString}`;
  }
}

@graph()
class MockedSubgraph extends Subgraph {
  @provides()
  override subgraphString(): string {
    return 'from mocked subgraph';
  }
}

@graph({ subgraphs: [MockedSubgraph] })
class MockedMainGraph extends MainGraph {
  @provides()
  override graphString(subgraphString: string): string {
    return `from mocked main ${subgraphString}`;
  }
}
