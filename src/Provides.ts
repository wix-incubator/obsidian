import { Scope } from '@Obsidian';
import Graph from './graph/Graph';
import providedPropertiesStore from './ProvidedPropertiesStore';

interface ProvidesParams {
  scope?: Scope;
  name: string;
}

function Provides({ name }: Partial<ProvidesParams> = {}) {
  return function provide(graph: Graph, propertyKey: string, descriptor: PropertyDescriptor) {
    providedPropertiesStore.set(graph, propertyKey, name!);
    return descriptor;
  };
}
export default Provides;
