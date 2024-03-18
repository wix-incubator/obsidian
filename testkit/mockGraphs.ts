import { GraphResolveChain } from '../src/graph/registry/GraphResolveChain';
import { isGraph, ObjectGraph } from '../src/graph/ObjectGraph';
import { GraphMiddleware } from '../src/graph/registry/GraphMiddleware';
import { Constructable } from '../src/types';
import graphRegistry from '../src/graph/registry/GraphRegistry';

export function mockGraphs(
  graphNameToGraph: Record<string, Constructable<ObjectGraph> | ((props: any) => ObjectGraph)>,
) {
  const graphMiddleware = new class extends GraphMiddleware {
    resolve<Props>(resolveChain: GraphResolveChain, Graph: Constructable<ObjectGraph>, props?: Props) {
      if (graphNameToGraph[Graph.name]) {
        const GraphOrGenerator = graphNameToGraph[Graph.name];
        return isGraph(GraphOrGenerator) ? new GraphOrGenerator(props) : GraphOrGenerator(props);
      }
      return resolveChain.proceed(Graph, props);
    }
  }();

  clearRegisteredGraphs(graphNameToGraph);
  graphRegistry.addGraphMiddleware(graphMiddleware);
}

function clearRegisteredGraphs(
  graphNameToGraph: Record<string, Constructable<ObjectGraph> | ((props: any) => ObjectGraph)>,
) {
  for (const graphName of Object.keys(graphNameToGraph)) {
    graphRegistry.clearGraphAfterItWasMockedInTests(graphName);
  }
}
