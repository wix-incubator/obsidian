import { ObjectGraph } from '../../graph/ObjectGraph';

export default class PropsInjector<Props> {
  constructor(private graph: ObjectGraph) {}

  inject(passedProps: Props): Partial<Props> {
    // eslint-disable-next-line prefer-object-spread
    return new Proxy(Object.assign({}, passedProps), {
      get: (target: object, p: string, receiver: any): any => {
        return p in target ? Reflect.get(target, p, receiver) : this.graph.retrieve(p, receiver);
      },
    });
  }
}
