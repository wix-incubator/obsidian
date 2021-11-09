/* eslint-disable no-param-reassign */
import { Scope } from '@Obsidian';
import providedPropertiesStore from './ProvidedPropertiesStore';

function Provides(scope?: Scope) {
  return function provide(_clazz: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalGet = descriptor.get!;

    providedPropertiesStore.set(_clazz.constructor.name, propertyKey);

    descriptor.get = function get() {
      if (descriptor.value) return descriptor.value;

      if (scope) {
        if (scopedValuesRegistry.has(scope, propertyKey)) {
          descriptor.value = scopedValuesRegistry.get(scope, propertyKey);
        } else {
          const value = originalGet.call(this);
          scopedValuesRegistry.set(scope, propertyKey, value);
          descriptor.value = value;
        }
      } else {
        descriptor.value = originalGet.call(this);
      }

      return descriptor.value;
    };
    return descriptor;
  };
}
export default Provides;
