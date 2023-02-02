import graphRegistry from './graph/registry/GraphRegistry';
import { ObjectGraph } from './graph/ObjectGraph';
import { Constructable, GraphInternals, ServiceLocator } from './types';
import { GraphMiddleware } from './graph/registry/GraphMiddleware';
import lateInjector from './injectors/class/LateInjector';
import serviceLocatorFactory from './graph/ServiceLocatorFactory';

export default class Obsidian {
  obtain<T extends ObjectGraph<P>, P = any>(
    Graph: Constructable<T>,
    props?: P,
  ): ServiceLocator<Omit<T, GraphInternals>> {
    return serviceLocatorFactory.fromGraph(Graph, props);
  }

  inject<T extends object>(target: T, graph?: ObjectGraph) {
    return lateInjector.inject(target, graph);
  }

  addGraphMiddleware(middleware: GraphMiddleware) {
    graphRegistry.addGraphMiddleware(middleware);
  }

  clearGraphMiddlewares() {
    graphRegistry.clearGraphMiddlewares();
  }

  clearGraphs() {
    graphRegistry.clearGraphMiddlewares();
    graphRegistry.clearAll();
  }
}
