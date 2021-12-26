/* eslint-disable no-param-reassign */
export function memoizeDescriptor(propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {
  const originalValue = descriptor.value;
  descriptor.value = function value(...args: any[]) {
    const key = `memoized${propertyKey}`;
    if (Reflect.hasMetadata(key, this)) {
      return Reflect.getMetadata(key, this);
    }
    const result = originalValue.apply(this, args);
    Reflect.defineMetadata(key, result, this);
    return result;
  };
  return descriptor;
}
