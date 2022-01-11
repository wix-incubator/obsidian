import { Constructable } from '../../types';
import { GraphRegistry } from '../../graph/registry/GraphRegistry';
import { Graph } from '../../graph/Graph';

const injectionMetadataKey = 'injectionMetadata';

export default class ClassInjector {
  constructor(private graphRegistry: GraphRegistry) {}

  inject(Graph: Constructable<Graph>) {
    return (Target: Graph) => new Proxy(Target, this.createProxyHandler(Graph));
  }

  private createProxyHandler(Graph: Constructable<Graph>) {
    const registry = this.graphRegistry;
    return {
      construct(target: any, args: any[], newTarget: any): new () => {} {
        const keysToInject: string[] = Reflect.getMetadata(injectionMetadataKey, target) ?? [];
        const createdObject = Reflect.construct(target, args, newTarget);
        const graph = registry.resolve(Graph);
        keysToInject.forEach((key) => Reflect.set(createdObject, key, graph.retrieve(key)));

        return createdObject;
      },
    };
  }
}
