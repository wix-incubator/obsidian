import { ObjectGraph } from '../../graph/ObjectGraph';
import { Graph } from '../../graph/Graph';
import useGraph from '../components/useGraph';
import { Constructable } from '../../types';

export default class HookInjector {
  inject<Args, Result>(
    hook: (args: Args) => Result,
    Graph: Constructable<ObjectGraph>,
  ): (args?: Partial<Args>) => Result {
    return (args?: Partial<Args>): Result => {
      const graph = useGraph(Graph, args);
      return hook(new Proxy(args ?? {}, new Injector(graph)));
    };
  }
}

class Injector implements ProxyHandler<any> {
  constructor(private graph: Graph) {}

  get(obj: any, property: string, receiver: any): any {
    return property in obj ? obj[property] : this.graph.retrieve(property, receiver);
  }
}
