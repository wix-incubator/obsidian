import { Constructable } from '@Obsidian';
import Graph from '../Graph';
import DefaultGraphResolver from './DefaultGraphResolver';
import GraphResolverMiddleware from './GraphResolverMiddleware';
import { GraphResolver } from './interfaces';

export default class GraphResolversChain {
  private resolvers: GraphResolverMiddleware[];

  constructor(defaultResolver: GraphResolverMiddleware = new DefaultGraphResolver()) {
    this.resolvers = [defaultResolver];
  }

  resolve<T extends Graph>(Graph: Constructable<T>, props?: any): T {
    return this.resolvers[0].resolve(Graph, props);
  }

  add(resolver: GraphResolver) {
    this.resolvers.unshift(new GraphResolverMiddleware(resolver));
    this.updateResolveChain();
  }

  private updateResolveChain() {
    if (this.resolvers.length > 1) {
      this.resolvers[0].createResolveChain(this.resolvers[1]);
    }
  }

  clear() {
    this.resolvers = [new DefaultGraphResolver()];
  }
}
