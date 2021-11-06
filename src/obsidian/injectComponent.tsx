import { Constructable } from '@Obsidian';
import hoistNonReactStatics from 'hoist-non-react-statics';
import React, { useEffect, useState } from 'react';
import 'reflect-metadata';
import graphRegistry from './GraphRegistry';
import graphResolver from './GraphResolver';
import ObjectGraph from './ObjectGraph';
import referenceCounter from './ReferenceCounter';

export default function injectComponent<P>(Target: React.ComponentType<P>, Graph: Constructable<ObjectGraph>) {
  const Wrapped: React.FunctionComponent<Partial<P>> = (args: Partial<P>) => {
    const [graph] = useState(graphResolver.resolve(Graph, args));
    useEffect(() => {
      referenceCounter.retain(graph);
      return () => referenceCounter.release(graph, graphRegistry.clear);
    }, [graph]);

    const injectedProps = (new Proxy(args ?? {}, new Injector(graph)));
    return <Target {...injectedProps} />;
  };
  hoistNonReactStatics(Wrapped, Target);
  return Wrapped;
}

class Injector implements ProxyHandler<any> {
  constructor(private graph: ObjectGraph) {}

  get(obj: any, property: string, receiver: any): any {
    return property in obj ? obj[property] : this.graph.get(property, receiver);
  }
}
