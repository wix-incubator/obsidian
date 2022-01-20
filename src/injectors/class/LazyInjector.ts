import graphRegistry from '../../graph/registry/GraphRegistry';
import InjectionMetadata from './InjectionMetadata';

class LazyInjector<T extends object> {
  private readonly graphInstanceName = '_graphInstanceName';

  inject(target: T): T {
    const injectionMetadata = new InjectionMetadata();
    const graph = this.getGraphInstance(target);
    injectionMetadata.getLazyPropertiesToInject(target.constructor).forEach((key) => {
      Reflect.set(target, key, graph.retrieve(key));
    });
    return target;
  }

  private getGraphInstance(target: T) {
    const graphInstanceName = Reflect.get(target, this.graphInstanceName);
    return graphRegistry.getGraphInstance(graphInstanceName);
  }
}

export default new LazyInjector();
