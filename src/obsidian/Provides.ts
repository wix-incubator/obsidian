import { Scope } from '@Obsidian';
import IObjectGraph from './IObjectGraph';
import providedPropertiesStore from './ProvidedPropertiesStore';

interface ProvidesParams {
  scope?: Scope;
  name: string;
}

function Provides({ scope, name }: Partial<ProvidesParams> = {}) {
  return function provide(graph: IObjectGraph, propertyKey: string, descriptor: PropertyDescriptor) {
    providedPropertiesStore.set(graph, propertyKey, name!);
    return descriptor;
  };
}
export default Provides;
