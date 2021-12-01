import { Constructable } from '@Obsidian';
import { useEffect, useState } from 'react';
import 'reflect-metadata';
import graphRegistry from './graph/registry/GraphRegistry';
import ObjectGraph from './graph/ObjectGraph';
import referenceCounter from './ReferenceCounter';

export default function injectHook<S, T>(target: (args: S) => T, Graph: Constructable<ObjectGraph>) {
  return (args?: Partial<S>): T => {
    const [graph] = useState(graphRegistry.resolve(Graph, args));
    useEffect(() => {
      referenceCounter.retain(graph);
      return () => referenceCounter.release(graph, (g) => graphRegistry.clear(g));
    }, [graph]);

    return target(new Proxy(args ?? {}, new Injector(graph)));
  };
}

class Injector implements ProxyHandler<any> {
  constructor(private graph: ObjectGraph) {}

  get(obj: any, property: string, receiver: any): any {
    return property in obj ? obj[property] : this.graph.retrieve(property, receiver);
  }
}
