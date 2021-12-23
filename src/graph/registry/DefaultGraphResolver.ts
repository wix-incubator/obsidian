import { Constructable } from '../../types';
import { Graph } from '../Graph';
import { Middleware, ResolveChain } from './Middleware';

export default class DefaultGraphMiddleware<T extends Graph> extends Middleware<T> {
  resolve<Props>(_resolveChain: ResolveChain<T>, Graph: Constructable<T>, props?: Props): T {
    return new Graph(props);
  }
}
