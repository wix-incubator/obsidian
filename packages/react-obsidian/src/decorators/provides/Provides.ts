import { Graph } from '../../graph/Graph';
import providedPropertiesStore from '../../ProvidedPropertiesStore';
import { memoizeDescriptor } from './MemoizeDescriptor';

interface ProvidesParams {
  name: string;
}

export function Provides({ name }: Partial<ProvidesParams> = {}) {
  return function provide(graph: Graph, propertyKey: string, descriptor: PropertyDescriptor) {
    providedPropertiesStore.set(graph, propertyKey, name!);
    return memoizeDescriptor(propertyKey, descriptor);
  };
}
