import {
  Graph,
  Injectable,
  LateInject,
  ObjectGraph,
  Obsidian,
  Provides,
  mockGraphs,
} from '../../src';

describe('Late inject', () => {
  it('injects from a concrete graph instance', () => {
    mockGraphs({ Subgraph: MockedSubgraph });

    class Injected {
      @LateInject() graphString!: string;

      constructor() {
        Obsidian.inject(this, new MockedMainGraph());
      }
    }

    expect(new Injected().graphString).toBe('from mocked main from mocked subgraph');
  });

  it('injects from a graph class', () => {
    mockGraphs({ Subgraph: MockedSubgraph });

    @Injectable(MockedMainGraph)
    class Injected {
      @LateInject() graphString!: string;

      constructor() {
        Obsidian.inject(this);
      }
    }

    expect(new Injected().graphString).toBe('from mocked main from mocked subgraph');
  });

  it('injects using a registered graph key', () => {
    Obsidian.registerGraph('main', () => MainGraph);

    class Injected {
      @LateInject() graphString!: string;

      constructor() {
        Obsidian.inject(this, 'main');
      }
    }

    expect(new Injected().graphString).toBe('from main from subgraph');
  });

  it('throws an error if the graph is not registered', () => {
    class Injected {
      @LateInject() graphString!: string;

      constructor() {
        Obsidian.inject(this, 'main');
      }
    }

    expect(() => new Injected()).toThrow('Attempted to resolve a graph by key "main" that is not registered. Did you forget to call Obsidian.registerGraph?');
  });
});

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
    return `from main ${subgraphString}`;
  }
}

@Graph()
class MockedSubgraph extends Subgraph {
  @Provides()
  override subgraphString(): string {
    return 'from mocked subgraph';
  }
}

@Graph({ subgraphs: [MockedSubgraph] })
class MockedMainGraph extends MainGraph {
  @Provides()
  override graphString(subgraphString: string): string {
    return `from mocked main ${subgraphString}`;
  }
}
