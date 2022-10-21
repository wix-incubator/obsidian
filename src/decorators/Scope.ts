import { Constructable } from '../types';
import { ObjectGraph } from '../graph/ObjectGraph';

function scopeCreator(scopeId: string) {
  return function scope(
    constructorOrGraph: Constructable<ObjectGraph> | ObjectGraph,
    _property?: string,
    descriptor?: PropertyDescriptor,
  ): any {
    const target = descriptor || constructorOrGraph;
    Reflect.defineMetadata('scopeId', scopeId, target);
    return target;
  };
}

export const createScope = (scopeId: string) => () => {
  // TODO throw if a scope with the same id already exists
  return scopeCreator(scopeId);
};
