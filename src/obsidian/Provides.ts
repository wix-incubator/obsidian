/* eslint-disable no-param-reassign */
import { Scope } from '@Obsidian';
// import scopedValuesRegistry from './ScopedValuesRegistry';
import providedPropertiesStore from './ProvidedPropertiesStore';

function Provides(scope?: Scope) {
  return function provide(_clazz: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log(Reflect.getMetadata('metadataKey', _clazz, 'someString'));

    descriptor.value = (...args: any[]) => {
      console.log(args);
    };

    // descriptor.value = new Proxy(descriptor.value, {
    //   apply(target: any, thisArg: any, argArray: any[]) {
    //     console.log(target);
    //   },
    //   // get(target: T, p: string | symbol, receiver: any): any {
    //   //   console.log(p);
    //   // },
    // });

    // const originalGet = descriptor.get!;

    providedPropertiesStore.set(_clazz, propertyKey);

    // descriptor.get = function get() {
    //   if (descriptor.value) return descriptor.value;

    //   if (scope) {
    //     if (scopedValuesRegistry.has(scope, propertyKey)) {
    //       descriptor.value = scopedValuesRegistry.get(scope, propertyKey);
    //     } else {
    //       const value = originalGet.call(this);
    //       scopedValuesRegistry.set(scope, propertyKey, value);
    //       descriptor.value = value;
    //     }
    //   } else {
    //     descriptor.value = originalGet.call(this);
    //   }

    //   return descriptor.value;
    // };
    return descriptor;
  };
}
export default Provides;
