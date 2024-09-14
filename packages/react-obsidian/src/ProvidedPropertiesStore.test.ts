import providedPropertiesStore from './ProvidedPropertiesStore';
import { graph, ObjectGraph, provides } from './index';

class MockDataProvider {
  get data(): string {
    return 'mock-data';
  }
}

interface TestProps {
  mockDataProvider: MockDataProvider;
}

@graph()
class TestGraph extends ObjectGraph<TestProps> {
  @provides()
  mockDataProvider(): MockDataProvider {
    return new MockDataProvider();
  }
}

describe('ProvidedPropertiesStore', () => {
  let testGraph: TestGraph;

  beforeEach(() => {
    testGraph = new TestGraph();
    providedPropertiesStore.clear(testGraph);
  });

  it('Sets properties without duplicates', () => {
    providedPropertiesStore.set(testGraph, 'mockDataProvider', 'mockDataProvider');
    providedPropertiesStore.set(testGraph, 'mockDataProvider', 'mockDataProvider');
    providedPropertiesStore.set(testGraph, 'mockDataProvider', 'mockDataProvider');
    expect(providedPropertiesStore.getMangledProperty(testGraph, 'mockDataProvider')).toEqual('mockDataProvider');
  });
});
