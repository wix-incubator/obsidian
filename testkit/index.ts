import { GraphResolveChain } from '../src/graph/registry/GraphResolveChain';
import {
  ObjectGraph,
  Constructable,
  GraphMiddleware,
  Obsidian,
} from '../src';

beforeEach(() => {
  Obsidian.clearGraphMiddlewares();
});

class Index {
  mockGraphs(graphNameToGraph: Record<string, Constructable<ObjectGraph>>) {
    const graphMiddleware = new class extends GraphMiddleware {
      resolve<Props>(resolveChain: GraphResolveChain, Graph: Constructable<ObjectGraph>, props?: Props) {
        if (graphNameToGraph[Graph.name]) {
          const TheGraph = graphNameToGraph[Graph.name];
          return new TheGraph(props);
        }
        return resolveChain.proceed(Graph, props);
      }
    }();
    Obsidian.addGraphMiddleware(graphMiddleware);
  }
}

export default new Index();
