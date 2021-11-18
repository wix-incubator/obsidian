import ObjectGraph from 'src/ObjectGraph';

export class PropsInjector<T extends Record<string, any>> {
  constructor(private graph: ObjectGraph) {}

  inject(props: T | undefined): T {
    return new Proxy(props || {}, {
      get: (obj: any, property: string, receiver: any): any => 
        property in obj ? obj[property] : this.graph.get(property, receiver);
    });
  }
}
