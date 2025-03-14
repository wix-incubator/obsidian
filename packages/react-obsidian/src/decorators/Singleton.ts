import { Constructable } from '../types';
import { ObjectGraph } from '../graph/ObjectGraph';
import {Reflect} from '../utils/reflect';

export function singleton() {
  return (
    constructorOrGraph: Constructable<ObjectGraph> | ObjectGraph,
    _property?: string,
    descriptor?: PropertyDescriptor,
  ): any => {
    const target = descriptor || constructorOrGraph;
    Reflect.defineMetadata('isSingleton', true, target);
    return target;
  };
}
