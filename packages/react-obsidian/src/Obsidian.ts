import graphRegistry from './graph/registry/GraphRegistry';
import { ObjectGraph } from './graph/ObjectGraph';
import { GraphInternals, ServiceLocator, type Constructable } from './types';
import { GraphMiddleware } from './graph/registry/GraphMiddleware';
import lateInjector from './injectors/class/LateInjector';
import serviceLocatorFactory from './graph/ServiceLocatorFactory';

export default class Obsidian {
  registerGraph(key: string, generator: () => Constructable<ObjectGraph>) {
    graphRegistry.registerGraphGenerator(key, generator);
  }

  obtain<T extends ObjectGraph<P>, P = unknown>(
    keyOrGraph: string | (new(...args: P[]) => T),
    props?: P,
  ): ServiceLocator<Omit<T, GraphInternals>> {
    return serviceLocatorFactory.fromGraph(keyOrGraph, props);
  }

  inject<T extends object>(target: T, keyOrGraph?: string | ObjectGraph) {
    return lateInjector.inject(target, keyOrGraph);
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
