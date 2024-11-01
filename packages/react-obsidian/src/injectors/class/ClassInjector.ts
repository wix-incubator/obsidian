import { Constructable } from '../../types';
import { GraphRegistry } from '../../graph/registry/GraphRegistry';
import { Graph } from '../../graph/Graph';
import InjectionMetadata from './InjectionMetadata';
import { GRAPH_INSTANCE_NAME_KEY } from './LateInjector';
import referenceCounter from '../../ReferenceCounter';
import { defineMetadata } from '../../utils/reflect';

export default class ClassInjector {
  constructor(
    private graphRegistry: GraphRegistry,
    private injectionMetadata: InjectionMetadata = new InjectionMetadata(),
  ) {}

  inject(keyOrGraph: string | Constructable<Graph>) {
    return (Target: Constructable<any>) => {
      return new Proxy(Target, this.createProxyHandler(keyOrGraph, this.graphRegistry, this.injectionMetadata));
    };
  }

  private createProxyHandler(
    keyOrGraph: string | Constructable<Graph>,
    graphRegistry: GraphRegistry,
    injectionMetadata: InjectionMetadata,
  ): ProxyHandler<any> {
    return new class Handler implements ProxyHandler<any> {
      construct(target: any, args: any[], newTarget: Function): any {
        const isReactClassComponent = target.prototype?.isReactComponent;
        const source = isReactClassComponent ? 'lifecycleOwner' : 'classInjection';
        const graph = graphRegistry.resolve(keyOrGraph, source, args.length > 0 ? args[0] : undefined);
        if (isReactClassComponent) {
          referenceCounter.retain(graph);
        }
        defineMetadata(target, GRAPH_INSTANCE_NAME_KEY, graph.name);

        graph.onBind(target);
        const createdObject = Reflect.construct(target, args, newTarget);
        this.injectProperties(target, createdObject, graph);
        const originalComponentWillUnmount: () => void | undefined = createdObject.componentWillUnmount;
        createdObject.componentWillUnmount = () => {
          originalComponentWillUnmount?.();
          referenceCounter.release(graph, g => graphRegistry.clear(g));
        };
        return createdObject;
      }

      private injectProperties(target: any, createdObject: any, graph: Graph) {
        injectionMetadata.getPropertiesToInject(target).forEach((key) => {
          Reflect.set(createdObject, key, graph.retrieve(key));
        });
      }
    }();
  }
}
