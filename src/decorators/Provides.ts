/* eslint-disable no-param-reassign */
import { Scope } from '@Obsidian';
import Graph from '../graph/Graph';
import providedPropertiesStore from '../ProvidedPropertiesStore';

interface ProvidesParams {
  scope?: Scope;
  name: string;
}

function Provides({ name }: Partial<ProvidesParams> = {}) {
  return function provide(graph: Graph, propertyKey: string, descriptor: PropertyDescriptor) {
    providedPropertiesStore.set(graph, propertyKey, name!);
    const originalValue = descriptor.value;
    let createdDependency: any;
    descriptor.value = function value(...args: any[]) {
      if (createdDependency) return createdDependency;
      createdDependency = originalValue.apply(this, args);
      return createdDependency;
    };
    return descriptor;
  };
}
export default Provides;
