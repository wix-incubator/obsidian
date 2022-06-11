import {
  Graph,
  LazyInject,
  ObjectGraph,
  Obsidian,
  Provides,
  testKit,
} from '../../src';

describe('Lazy inject', () => {
  it('injects from a concrete graph instance', () => {
    testKit.mockGraphs({ Subgraph: MockedSubgraph });

    class Injected {
      @LazyInject() graphString!: string;

      constructor() {
        Obsidian.inject(this, new MockedMainGraph());
      }
    }

    expect(new Injected().graphString).toBe('from mocked main from mocked subgraph');
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
