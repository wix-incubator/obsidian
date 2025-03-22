import { Graph } from '../../graph/Graph';
import providedPropertiesStore from '../../ProvidedPropertiesStore';
import { memoizeDescriptor } from './MemoizeDescriptor';

export function legacyDecorator(
  name: string | undefined,
  graph: Graph,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) {
  providedPropertiesStore.set(graph, propertyKey, name!);
  return memoizeDescriptor(propertyKey, descriptor);
}