import { Constructable } from '@Obsidian';
import Graph from '../Graph';
import GraphResolverMiddleware from './GraphResolverMiddleware';
import { GraphResolver, ResolveChain } from './interfaces';

const defaultResolver: GraphResolver = {
  resolve<T extends Graph, Props>(_resolveChain: ResolveChain, Graph: Constructable<T>, props?: Props): T {
    return new Graph(props);
  },
};
export default class DefaultGraphResolver extends GraphResolverMiddleware {
  constructor() {
    super(defaultResolver);
  }
}
