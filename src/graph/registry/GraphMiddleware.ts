import Graph from '../Graph';

export abstract class GraphMiddleware {
  private next!: GraphMiddleware;

  public setNext(next: GraphMiddleware) {
    this.next = next;
  }

  public get resolveChain(): ResolveChain {
    return {
      proceed: <T extends Graph, Props>(Graph: Constructable<T>, props?: Props): T => {
        return this.next.resolve(this.next.resolveChain, Graph, props);
      },
    };
  }

  abstract resolve<T extends Graph, Props>(resolveChain: ResolveChain, Graph: Constructable<T>, props?: Props): T;
}

export interface ResolveChain {
  proceed<T extends Graph, Props>(Graph: Constructable<T>, props?: Props): T;
}
