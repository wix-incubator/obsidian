import { Constructable } from '../../types';
import { Graph } from '../Graph';
import { ResolveChain } from './ResolveChain';

export abstract class Middleware<T = Graph, RC = ResolveChain<T>> {
  private next!: Middleware<T, ResolveChain<T>>;

  public setNext(next: Middleware<T, ResolveChain<T>>) {
    this.next = next;
  }

  public get resolveChain(): ResolveChain<T> {
    return {
      proceed: <Props>(Graph: Constructable<T>, props?: Props): T => {
        return this.next.resolve(this.next.resolveChain, Graph, props);
      },
    };
  }

  abstract resolve<Props = any>(resolveChain: RC, Graph: Constructable<T>, props?: Props): T;
}
