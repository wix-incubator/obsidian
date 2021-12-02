import { Constructable } from '@Obsidian';
import Graph from '../Graph';
import { GraphResolver, ResolveChain } from './interfaces';

export default class GraphResolverMiddleware {
  protected resolveChain!: ResolveChain;

  constructor(private resolver: GraphResolver) {}

  public createResolveChain(next: GraphResolverMiddleware) {
    this.resolveChain = {
      proceed: <T extends Graph, Props>(Graph: Constructable<T>, props?: Props): T => {
        return next.resolve(Graph, props);
      },
    };
  }

  resolve<T extends Graph, Props>(Graph: Constructable<T>, props?: Props): T {
    return this.resolver.resolve(this.resolveChain, Graph, props);
  }
}
