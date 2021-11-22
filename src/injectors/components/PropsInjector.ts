import _ from 'lodash';
import ObjectGraph from 'src/ObjectGraph';

export default class PropsInjector<Props> {
  constructor(private graph: ObjectGraph) {}

  inject(passedProps: Props): Partial<Props> {
    const props = Object.assign({}, passedProps);
    return new Proxy(props, {
      get: (_target: object, p: string, receiver: any): any => {
        return this.graph.get(p, receiver)
      },
    });
  }
}
