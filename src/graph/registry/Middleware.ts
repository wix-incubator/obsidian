import { Constructable } from '../../types';

export abstract class Middleware<T> {
  private next!: Middleware<T>;

  public setNext(next: Middleware<T>) {
    this.next = next;
  }

  public get resolveChain(): ResolveChain<T> {
    return {
      proceed: <Props>(Graph: Constructable<T>, props?: Props): T => {
        return this.next.resolve(this.next.resolveChain, Graph, props);
      },
    };
  }

  abstract resolve<Props>(resolveChain: ResolveChain<T>, Graph: Constructable<T>, props?: Props): T;
}

export interface ResolveChain<T> {
  proceed<Props>(Graph: Constructable<T>, props?: Props): T;
}
