import { Constructable } from 'src';
import { ObjectGraph } from '../graph/ObjectGraph';

export function Singleton() {
  return <T extends ObjectGraph>(constructor: Constructable<T>) => {
    Reflect.defineMetadata('isSingleton', true, constructor);
    return constructor;
  };
}
