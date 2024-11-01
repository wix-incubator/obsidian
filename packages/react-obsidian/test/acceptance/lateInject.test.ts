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

  it('injects using a registered graph key', () => {
    Obsidian.registerGraph('main', () => MainGraph);

    class Injected {
      @lateInject() graphString!: string;

      constructor() {
        Obsidian.inject(this, 'main');
      }
    }

    expect(new Injected().graphString).toBe('from main from subgraph');
  });

  it('throws an error if the graph is not registered', () => {
    class Injected {
      @lateInject() graphString!: string;

      constructor() {
        Obsidian.inject(this, 'main');
      }
    }

    expect(() => new Injected()).toThrow('Attempted to resolve a graph by key "main" that is not registered. Did you forget to call Obsidian.registerGraph?');
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
