/* eslint-disable no-param-reassign */
export function memoizeDescriptor(propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {
  const originalValue = descriptor.value;
  descriptor.value = function value(...args: any[]) {
    const memoizationTarget = Reflect.getMetadata('isSingleton', descriptor) ? descriptor : this;
    const key = `memoized${propertyKey}`;
    if (Reflect.hasMetadata(key, memoizationTarget)) return Reflect.getMetadata(key, memoizationTarget);
    const result = originalValue.apply(this, args);
    Reflect.defineMetadata(key, result, memoizationTarget);
    return result;
  };
  return descriptor;
}
