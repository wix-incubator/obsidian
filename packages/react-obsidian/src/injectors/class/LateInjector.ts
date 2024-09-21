import { ObjectGraph } from '../../graph/ObjectGraph';
import graphRegistry from '../../graph/registry/GraphRegistry';
import { getMetadata } from '../../utils/reflect';
import InjectionMetadata from './InjectionMetadata';

export const GRAPH_INSTANCE_NAME_KEY = 'GRAPH_INSTANCE_NAME';

class LateInjector<T extends object> {
  inject(target: T, sourceGraph?: ObjectGraph): T {
    if (sourceGraph) graphRegistry.ensureRegistered(sourceGraph);
    const injectionMetadata = new InjectionMetadata();
    const graph = sourceGraph ?? this.getGraphInstance(target);
    injectionMetadata.getLatePropertiesToInject(target.constructor).forEach((key) => {
      Reflect.set(target, key, graph.retrieve(key));
    });
    return target;
  }

  private getGraphInstance(target: T) {
    const graphInstanceName = getMetadata(target.constructor, GRAPH_INSTANCE_NAME_KEY);
    return graphRegistry.getGraphInstance(graphInstanceName);
  }
}

export default new LateInjector();
