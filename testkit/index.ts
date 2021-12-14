import { GraphMiddleware, ResolveChain } from '../src/graph/registry/GraphMiddleware';
import ObjectGraph from '../src/graph/Graph';
import { Constructable, Obsidian } from '../src';

beforeEach(() => {
  Obsidian.clearGraphMiddlewares();
});

class Index {
  mockGraphs(graphNameToGraph: Record<string, Constructable<ObjectGraph>>) {
    const graphMiddleware = new class extends GraphMiddleware {
      resolve<T extends ObjectGraph, Props>(resolveChain: ResolveChain, Graph: Constructable<T>, props?: Props) {
        if (graphNameToGraph[Graph.name]) {
          const TheGraph = graphNameToGraph[Graph.name];
          return new TheGraph(props) as unknown as T;
        }
        return resolveChain.proceed(Graph, props);
      }
    }();
    Obsidian.addGraphMiddleware(graphMiddleware);
  }
}

export default new Index();
