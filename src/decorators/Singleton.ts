import { Constructable } from 'src';
import { ObjectGraph } from '../graph/ObjectGraph';

export function Singleton() {
  return function singleton(
    constructorOrGraph: Constructable<ObjectGraph> | ObjectGraph,
    _property?: string,
    descriptor?: PropertyDescriptor,
  ): any {
    const target = descriptor || constructorOrGraph;
    Reflect.defineMetadata('isSingleton', true, target);
    return target;
  };
}
