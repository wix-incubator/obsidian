import { Constructable } from '@Obsidian';
import graphRegistry from './GraphRegistry';
import ObjectGraph from './ObjectGraph';

class GraphResolver {
  resolve<T extends ObjectGraph>(Graph: Constructable<T>, props?: any): T {
    if (graphRegistry.has(Graph)) {
      const graph: T = graphRegistry.get(Graph);
      const scope = Reflect.getMetadata('scope', Graph);
      if (scope) return graph;

      graphRegistry.set(Graph, new Graph(props));
    }
    const graph = new Graph(props);
    graphRegistry.set(Graph, graph);
    return graph;
  }
}

export default new GraphResolver();
