import { ObjectGraph } from './ObjectGraph';
import { Constructable, ServiceLocator as ServiceLocatorType } from '../types';
import graphRegistry from './registry/GraphRegistry';

export default class ServiceLocatorFactory {
  static fromGraph<T extends ObjectGraph<P>, P = any>(Graph: Constructable<T>, props?: P) {
    const resolved = graphRegistry.resolve(Graph, props);
    const wrapped = new Proxy(resolved, {
      get(_target: any, property: string, receiver: any) {
        return () => resolved.retrieve(property, receiver);
      },
    });
    return wrapped as unknown as ServiceLocatorType<T>;
  }
}
