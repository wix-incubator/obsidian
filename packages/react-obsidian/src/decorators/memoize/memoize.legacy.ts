import { Reflect } from '../../utils/reflect';
import type { IsEqualFn } from './areArgsEqual';

type MemoizeCache = {
  lastArgs: any[];
  lastResult: any;
};

export function legacyDecorator(
  _target: object,
  propertyKey: string,
  descriptor: PropertyDescriptor,
  isEqual: IsEqualFn,
): PropertyDescriptor {
  const originalMethod = descriptor.value;
  const cacheKey = `memoized_${propertyKey}`;

  descriptor.value = function memoizedMethod(this: object, ...args: any[]) {
    const cache = Reflect.getMetadata(cacheKey, this) as MemoizeCache | undefined;

    if (cache && isEqual(args, cache.lastArgs)) {
      return cache.lastResult;
    }

    const result = originalMethod.apply(this, args);
    Reflect.defineMetadata(cacheKey, { lastArgs: args, lastResult: result }, this);
    return result;
  };

  return descriptor;
}
