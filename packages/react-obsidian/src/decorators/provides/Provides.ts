/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Graph } from '../../graph/Graph';
import providedPropertiesStore from '../../ProvidedPropertiesStore';

interface ProvidesParams {
  name: string;
}

export function provides<This, Args extends any[], Return>({ name }: Partial<ProvidesParams> = {}) {
  return function (
    target: (this: This, ...args: Args) => Return,
    context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return>,
  ) {
    context.addInitializer(function (this: This) {
      const mangledProperty = String(context.name);
      // @ts-ignore
      this[mangledProperty] = this[mangledProperty].bind(this);
      providedPropertiesStore.set(this as Graph, mangledProperty, name!);
    });

    function replacementMethod(this: This, ...args: Args): Return {
      const memoizedResult = Reflect.get(this as object, `memoized${name!}`);
      if (memoizedResult === undefined) {
        const result = target.call(this, ...args);
        Reflect.set(this as object, `memoized${name!}`, result);
        return result;
      }
      return memoizedResult;
    }

    return replacementMethod;
  };
}
