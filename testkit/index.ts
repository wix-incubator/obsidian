import { GraphResolveChain } from '../src/graph/registry/GraphResolveChain';
import { ObjectGraph } from '../src/graph/ObjectGraph';
import { GraphMiddleware } from '../src/graph/registry/GraphMiddleware';
import { Constructable } from '../src/types';
import graphRegistry from '../src/graph/registry/GraphRegistry';

beforeEach(() => {
  graphRegistry.clearGraphMiddlewares();
  graphRegistry.reset();
});

class TestKit {
  public mockGraphs(graphNameToGraph: Record<string, Constructable<ObjectGraph>>) {
    const graphMiddleware = new class extends GraphMiddleware {
      resolve<Props>(resolveChain: GraphResolveChain, Graph: Constructable<ObjectGraph>, props?: Props) {
        if (graphNameToGraph[Graph.name]) {
          const TheGraph = graphNameToGraph[Graph.name];
          return new TheGraph(props);
        }
        return resolveChain.proceed(Graph, props);
      }
    }();
    graphRegistry.addGraphMiddleware(graphMiddleware);
  }
}

export const testKit = new TestKit();
