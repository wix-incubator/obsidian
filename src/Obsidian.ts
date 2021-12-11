import { Constructable, GraphInternals, ServiceLocator } from '@Obsidian';
import graphRegistry from './graph/registry/GraphRegistry';
import ObjectGraph from './graph/ObjectGraph';
import { GraphMiddleware } from './graph/registry/GraphMiddleware';

export default class Obsidian {
  obtain<T extends ObjectGraph<P>, P = any>(
    Graph: Constructable<T>,
    props?: P,
  ): ServiceLocator<Omit<T, GraphInternals>> {
    return graphRegistry.resolve(Graph, props) as unknown as ServiceLocator<T>;
  }

  addGraphMiddleware(middleware: GraphMiddleware) {
    graphRegistry.addGraphMiddleware(middleware);
  }

  clearGraphMiddlewares() {
    graphRegistry.clearGraphMiddlewares();
  }
}
