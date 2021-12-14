import { Constructable } from '../../types';
import Graph from '../Graph';
import DefaultGraphMiddleware from './DefaultGraphResolver';
import { GraphMiddleware } from './GraphMiddleware';

export default class GraphMiddlewareChain {
  private middlewares: GraphMiddleware[];

  constructor(defaultMiddleware: GraphMiddleware = new DefaultGraphMiddleware()) {
    this.middlewares = [defaultMiddleware];
  }

  resolve<T extends Graph>(Graph: Constructable<T>, props?: any): T {
    return this.middlewares[0].resolve(this.middlewares[0].resolveChain, Graph, props);
  }

  add(middleware: GraphMiddleware) {
    this.middlewares.unshift(middleware);
    this.updateResolveChain();
  }

  private updateResolveChain() {
    if (this.middlewares.length > 1) {
      this.middlewares[0].setNext(this.middlewares[1]);
    }
  }

  clear() {
    this.middlewares = [new DefaultGraphMiddleware()];
  }
}
