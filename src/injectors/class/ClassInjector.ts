import { Constructable } from '../../types';
import { GraphRegistry } from '../../graph/registry/GraphRegistry';
import { Graph } from '../../graph/Graph';
import InjectionMetadata from './InjectionMetadata';
import { GRAPH_INSTANCE_NAME_KEY } from './LazyInjector';

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
        Reflect.defineMetadata(GRAPH_INSTANCE_NAME_KEY, graph.name, target);
        const argsToInject = this.injectConstructorArgs(args, graph, target);
        const createdObject = Reflect.construct(target, argsToInject, newTarget);
        this.injectProperties(target, createdObject, graph);
        return createdObject;
      }

      private injectConstructorArgs(args: any[], graph: Graph, target: any): any[] {
        const argsToInject = injectionMetadata.getConstructorArgsToInject(target);
        if (!argsToInject.hasArgs()) return args;
        return [...args, ...new Array(Math.abs(args.length - argsToInject.size()))].map((value, idx): any => {
          return value ?? graph.retrieve(argsToInject.getProperty(idx));
        });
      }

      private injectProperties(target: any, createdObject: any, graph: Graph) {
        injectionMetadata.getPropertiesToInject(target).forEach((key) => {
          Reflect.set(createdObject, key, graph.retrieve(key));
        });
      }
    }();
  }
}
