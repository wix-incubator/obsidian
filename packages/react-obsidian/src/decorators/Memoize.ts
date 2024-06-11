/* eslint-disable no-param-reassign */
import 'reflect-metadata';

export default function Memoize() {
  return function provide(_Clazz: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalGet = descriptor.get!;
    descriptor.get = function get() {
      const key = `memoized${propertyKey}`;
      if (Reflect.hasMetadata(key, this)) {
        return Reflect.getMetadata(key, this);
      }
      const value = originalGet.call(this);
      Reflect.defineMetadata(key, value, this);
      return value;
    };
    return descriptor;
  };
}
