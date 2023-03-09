import { ObjectGraph } from './ObjectGraph';
import { Constructable, ServiceLocator as ServiceLocatorType } from '../types';
import graphRegistry from './registry/GraphRegistry';

export default class ServiceLocatorFactory {
  static fromGraph<T extends ObjectGraph<P>, P = any>(Graph: Constructable<T>, props?: P) {
    const resolved = graphRegistry.resolve(Graph, props);
    console.log(resolved);
    const wrapped = new Proxy(resolved, {
      get(_target: any, property: string, receiver: any) {
        console.log(Graph.name);
        return () => resolved.retrieve(property, receiver);
      },
    });
    console.log('here');
    return wrapped as unknown as ServiceLocatorType<T>;
  }
}
