import { Reflect } from '../../utils/reflect';
import type { IsEqualFn } from './areArgsEqual';

type MemoizeCache<Args extends any[], Return> = {
  lastArgs: Args;
  lastResult: Return;
};

export function modernDecorator<This, Args extends any[], Return>(
  target: (this: This, ...args: Args) => Return,
  context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return>,
  isEqual: IsEqualFn,
): (this: This, ...args: Args) => Return {
  const propertyKey = String(context.name);
  const cacheKey = `memoized_${propertyKey}`;

  function replacementMethod(this: This, ...args: Args): Return {
    const cache = Reflect.getMetadata(cacheKey, this) as MemoizeCache<Args, Return> | undefined;

    if (cache && isEqual(args, cache.lastArgs)) {
      return cache.lastResult;
    }

    const result = target.call(this, ...args);
    Reflect.defineMetadata(cacheKey, { lastArgs: args, lastResult: result }, this);
    return result;
  }

  return replacementMethod;
}
