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
  ): ProxyHandler<any> {
    return new class Handler implements ProxyHandler<any> {
      construct(target: any, args: any[], newTarget: Function): any {
        const graph = graphRegistry.resolve(Graph);

        const argsToInject = this.injectConstructorArgs(args, graph, target);

        const createdObject = Reflect.construct(target, argsToInject, newTarget);
        injectionMetadata.getPropertiesToInject(target).forEach((key) => {
          Reflect.set(createdObject, key, graph.retrieve(key));
        });

        return createdObject;
      }

      private injectConstructorArgs(args: any[], graph: Graph, target: any): any[] {
        return [
          graph.retrieve(injectionMetadata.getConstructorArgsToInject(target).getProperty(0)),
        ];
      }
    }();
  }
}
