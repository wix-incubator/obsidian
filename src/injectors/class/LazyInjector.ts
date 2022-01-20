import graphRegistry from '../../graph/registry/GraphRegistry';
import InjectionMetadata from './InjectionMetadata';

export const GRAPH_INSTANCE_NAME_KEY = 'GRAPH_INSTANCE_NAME';

class LazyInjector<T extends object> {
  inject(target: T): T {
    const injectionMetadata = new InjectionMetadata();
    const graph = this.getGraphInstance(target);
    injectionMetadata.getLazyPropertiesToInject(target.constructor).forEach((key) => {
      Reflect.set(target, key, graph.retrieve(key));
    });
    return target;
  }

  private getGraphInstance(target: T) {
    const graphInstanceName = Reflect.getMetadata(GRAPH_INSTANCE_NAME_KEY, target.constructor);
    return graphRegistry.getGraphInstance(graphInstanceName);
  }
}

export default new LazyInjector();