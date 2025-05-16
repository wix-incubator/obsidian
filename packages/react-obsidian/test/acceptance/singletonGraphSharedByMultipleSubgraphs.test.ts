import {
  graph,
  ObjectGraph,
  Obsidian,
  provides,
  singleton,
} from '../../src';

describe('Singleton graph shared by multiple subgraphs', () => {
  it('should be able to retrieve a singleton from a subgraph', () => {
    expect(Obsidian.obtain(AppGraph).AppClient()).toBe('AppClienthttpClient');
  });
});

@singleton() @graph()
class NetworkGraph extends ObjectGraph {
  @provides()
  httpClient() {
    return 'httpClient';
  }
}

@singleton() @graph({ subgraphs: [NetworkGraph] })
class Model1Graph extends ObjectGraph {
  @provides()
  model1(httpClient: string) {
    return 'model1' + httpClient;
  }
}

@singleton() @graph({ subgraphs: [NetworkGraph] })
class Model2Graph extends ObjectGraph {
  @provides()
  model2(httpClient: string) {
    return 'model2' + httpClient;
  }
}

@singleton() @graph({ subgraphs: [Model1Graph, Model2Graph] })
class AppGraph extends ObjectGraph {
  @provides()
  AppClient(httpClient: any) {
    return 'AppClient' + httpClient;
  }
}

