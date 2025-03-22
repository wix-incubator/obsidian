import { Graph } from '../../graph/Graph';
import providedPropertiesStore from '../../ProvidedPropertiesStore';
import { Reflect } from '../../utils/reflect';

export function modernDecorator<This, Args extends any[], Return>(
  name: string | undefined,
  target: (this: This, ...args: Args) => Return,
  context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return>,
) {
  context.addInitializer(function initializer(this: This) {
    const mangledProperty = String(context.name);
    // @ts-ignore
    this[mangledProperty] = this[mangledProperty].bind(this);
    providedPropertiesStore.set(this as Graph, mangledProperty, name!);
  });

  function getMemoizationTarget(zis: This) {
    if (Reflect.getMetadata('isSingleton', target)) {
      return (zis as any).constructor;
    }
    return zis;
  }

  function replacementMethod(this: This, ...args: Args): Return {
    const memoizationTarget = getMemoizationTarget(this);
    const memoizedResult = Reflect.getMetadata(`memoized${name!}`, memoizationTarget);
    if (memoizedResult === undefined) {
      const result = target.call(this, ...args);
      Reflect.defineMetadata(`memoized${name!}`, result, memoizationTarget);
      return result;
    }
    return memoizedResult;
  }

  return replacementMethod;
}