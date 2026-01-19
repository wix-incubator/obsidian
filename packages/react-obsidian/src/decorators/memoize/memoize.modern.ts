import { Reflect } from '../../utils/reflect';

export function modernDecorator<This, Args extends any[], Return>(
  target: (this: This, ...args: Args) => Return,
  context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return>,
): (this: This, ...args: Args) => Return {
  const propertyKey = String(context.name);

  function replacementMethod(this: This, ...args: Args): Return {
    const cacheKey = `memoized_${propertyKey}_${JSON.stringify(args)}`;

    if (Reflect.hasMetadata(cacheKey, this)) {
      return Reflect.getMetadata(cacheKey, this);
    }

    const result = target.call(this, ...args);
    Reflect.defineMetadata(cacheKey, result, this);
    return result;
  }

  return replacementMethod;
}
