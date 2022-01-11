import { Constructable } from '../types';
import graphRegistry from '../graph/registry/GraphRegistry';
import ClassInjector from '../injectors/class/ClassInjector';
import { Graph } from '../graph/Graph';

const injectionMetadataKey = 'injectionMetadata';

export function Injectable(Graph: Constructable<Graph>): any {
  return new ClassInjector(graphRegistry).inject(Graph);
}

export function Inject(
  target: Object | any,
  propertyKey?: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _indexOrPropertyDescriptor?: number | PropertyDescriptor,
) {
  const keysToInject = Reflect.getMetadata(injectionMetadataKey, target.constructor) ?? new Set();
  Reflect.defineMetadata(injectionMetadataKey, keysToInject.add(propertyKey), target.constructor);
}
