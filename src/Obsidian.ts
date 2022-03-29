import graphRegistry from './graph/registry/GraphRegistry';
import { ObjectGraph } from './graph/ObjectGraph';
import { Constructable, GraphInternals, ServiceLocator } from './types';
import { GraphMiddleware } from './graph/registry/GraphMiddleware';
import lazyInjector from './injectors/class/LazyInjector';

export default class Obsidian {
  obtain<T extends ObjectGraph<P>, P = any>(
    Graph: Constructable<T>,
    props?: P,
  ): ServiceLocator<Omit<T, GraphInternals>> {
    return graphRegistry.resolve(Graph, props) as unknown as ServiceLocator<T>;
  }

  inject<T extends object>(target: T, graph?: ObjectGraph) {
    return lazyInjector.inject(target, graph);
  }

  addGraphMiddleware(middleware: GraphMiddleware) {
    graphRegistry.addGraphMiddleware(middleware);
  }

  clearGraphMiddlewares() {
    graphRegistry.clearGraphMiddlewares();
  }

  resetGraphs() {
    graphRegistry.clearGraphMiddlewares();
    graphRegistry.reset();
  }
}
