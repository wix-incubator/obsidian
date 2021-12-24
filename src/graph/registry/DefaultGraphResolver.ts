import { Constructable } from '../../types';
import { Graph } from '../Graph';
import { Middleware } from './Middleware';
import { ResolveChain } from './ResolveChain';

export default class DefaultGraphMiddleware<T extends Graph> extends Middleware<T> {
  resolve(_resolveChain: ResolveChain<T>, Graph: Constructable<T>, props?: any): T {
    return new Graph(props);
  }
}
