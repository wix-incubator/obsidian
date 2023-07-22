import type { Constructable } from '../../types';
import { isDev } from '../../utils/isDev';
import type { Graph } from '../Graph';

export function NullProps(Graph: Constructable<Graph>) {
  return new Proxy({}, new NullPropsProxyHandler(Graph));
}

class NullPropsProxyHandler implements ProxyHandler<{}> {
  constructor(private graph: Constructable<Graph>) {}

  get(target: object, property: string, receiver: any) {
    if (property in target) return Reflect.get(target, property, receiver);
    throw new Error(this.createErrorMessage(this.graph, property));
  }

  private createErrorMessage(graph: Constructable<Graph>, property: string) {
    const graphName = isDev() ? graph.name : '';
    return `Tried to get prop ${property} in a @LifecycleBound graph ${graphName}, but props were undefined. `
    + `If you're using Obsidian.obtain(${graphName}) - then you should pass props to it explicitly: `
    + `Obsidian.obtain(${graphName}, { ${property}: 'value' });`;
  }
}
