import { Constructable } from '../../types';
import { GraphRegistry } from '../../graph/registry/GraphRegistry';
import { Graph } from '../../graph/Graph';

const injectionMetadataKey = 'injectionMetadata';
const injectedCtorArgsKey = 'injectedConstructorArgsKey';

export default class ClassInjector {
  constructor(private graphRegistry: GraphRegistry) {}

  inject(Graph: Constructable<Graph>) {
    return (Target: Constructable<any>) => new Proxy(Target, this.createProxyHandler(Graph));
  }

  private createProxyHandler(Graph: Constructable<Graph>) {
    const registry = this.graphRegistry;
    return {
      construct(target: any, args: any[], newTarget: any): new () => {} {
        const keysToInject: string[] = Reflect.getMetadata(injectionMetadataKey, target) ?? [];
        const graph = registry.resolve(Graph);

        try {
          const ctorArgsToInject: [string, number] = Reflect.getMetadata(injectedCtorArgsKey, target) ?? [];
          args.push(graph.retrieve(ctorArgsToInject[0][0]));
        } catch (e: any) {
          //
        }

        const createdObject = Reflect.construct(target, args, newTarget);
        keysToInject.forEach((key) => Reflect.set(createdObject, key, graph.retrieve(key)));

        return createdObject;
      },
    };
  }
}
