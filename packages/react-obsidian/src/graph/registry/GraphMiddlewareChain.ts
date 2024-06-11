import { Constructable } from '../../types';
import { Graph } from '../Graph';
import DefaultGraphMiddleware from './DefaultGraphResolver';
import { Middleware } from './Middleware';

export default class GraphMiddlewareChain<T extends Graph> {
  private middlewares: Middleware<T>[];

  constructor(defaultMiddleware: Middleware<T> = new DefaultGraphMiddleware()) {
    this.middlewares = [defaultMiddleware];
  }

  resolve(Graph: Constructable<T>, props?: any): T {
    return this.middlewares[0].resolve(this.middlewares[0].resolveChain, Graph, props);
  }

  add(middleware: Middleware<T>) {
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
