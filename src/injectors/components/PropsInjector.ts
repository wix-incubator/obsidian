import ObjectGraph from 'src/ObjectGraph';

export default class PropsInjector<Props> {
  constructor(private graph: ObjectGraph) {}

  inject(passedProps: Props): Partial<Props> {
    // eslint-disable-next-line prefer-object-spread
    const props = Object.assign({}, passedProps);
    return new Proxy(props, {
      get: (_target: object, p: string, receiver: any): any => this.graph.get(p, receiver),
    });
  }
}
