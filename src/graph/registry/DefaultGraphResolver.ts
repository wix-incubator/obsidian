import { Constructable } from '@Obsidian';
import Graph from '../Graph';
import { GraphMiddleware, ResolveChain } from './GraphMiddleware';

export default class DefaultGraphMiddleware extends GraphMiddleware {
  resolve<T extends Graph, Props>(_resolveChain: ResolveChain, Graph: Constructable<T>, props?: Props): T {
    return new Graph(props);
  }
}
