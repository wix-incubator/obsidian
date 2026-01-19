import { Reflect } from '../../utils/reflect';

export function legacyDecorator(
  _target: object,
  propertyKey: string,
  descriptor: PropertyDescriptor,
): PropertyDescriptor {
  const originalMethod = descriptor.value;

  descriptor.value = function memoizedMethod(this: object, ...args: any[]) {
    const cacheKey = `memoized_${propertyKey}_${JSON.stringify(args)}`;

    if (Reflect.hasMetadata(cacheKey, this)) {
      return Reflect.getMetadata(cacheKey, this);
    }

    const result = originalMethod.apply(this, args);
    Reflect.defineMetadata(cacheKey, result, this);
    return result;
  };

  return descriptor;
}
