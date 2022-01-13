import { Constructable } from '../../types';
import { GraphRegistry } from '../../graph/registry/GraphRegistry';
import { Graph } from '../../graph/Graph';
import InjectionMetadata from './InjectionMetadata';

export default class ClassInjector {
  constructor(
    private graphRegistry: GraphRegistry,
    private injectionMetadata: InjectionMetadata = new InjectionMetadata(),
  ) {}

  inject(Graph: Constructable<Graph>) {
    return (Target: Constructable<any>) => {
      return new Proxy(Target, this.createProxyHandler(Graph, this.graphRegistry, this.injectionMetadata));
    };
  }

  private createProxyHandler(
    Graph: Constructable<Graph>,
    graphRegistry: GraphRegistry,
    injectionMetadata: InjectionMetadata,
  ) {
    return {
      construct(target: any, args: any[], newTarget: any): new () => {} {
        const graph = graphRegistry.resolve(Graph);

        try {
          args.push(graph.retrieve(injectionMetadata.getConstructorArgsToInject(target)[0][0]));
        } catch (e: any) {
          //
        }

        const createdObject = Reflect.construct(target, args, newTarget);
        injectionMetadata.getPropertiesToInject(target).forEach((key) => {
          Reflect.set(createdObject, key, graph.retrieve(key));
        });

        return createdObject;
      },
    };
  }
}
