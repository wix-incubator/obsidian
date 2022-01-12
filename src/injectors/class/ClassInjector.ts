import { Constructable } from '../../types';
import { GraphRegistry } from '../../graph/registry/GraphRegistry';
import { Graph } from '../../graph/Graph';
import InjectionTarget from './InjectionTarget';

export default class ClassInjector {
  constructor(private graphRegistry: GraphRegistry) {}

  inject(Graph: Constructable<Graph>) {
    return (Target: Constructable<any>) => {
      return new Proxy(Target, this.createProxyHandler(Graph));
    };
  }

  private createProxyHandler(Graph: Constructable<Graph>) {
    const registry = this.graphRegistry;
    return {
      construct(target: any, args: any[], newTarget: any): new () => {} {
        const graph = registry.resolve(Graph);
        const injectionTarget = new InjectionTarget(target);

        try {
          args.push(graph.retrieve(injectionTarget.getConstructorArgsToInject(target)[0][0]));
        } catch (e: any) {
          //
        }

        const createdObject = Reflect.construct(target, args, newTarget);
        injectionTarget.getPropertiesToInject(target).forEach((key) => {
          Reflect.set(createdObject, key, graph.retrieve(key));
        });

        return createdObject;
      },
    };
  }
}
