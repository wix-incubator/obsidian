export function memoize<This, Return>(
  target: (this: This) => Return,
  context: ClassGetterDecoratorContext,
) {
  function memoizer(this: This): Return {
    const value = target.call(this);
    Object.defineProperty(this, context.name, { value, enumerable: true });
    return value;
  }
  return memoizer;
}
