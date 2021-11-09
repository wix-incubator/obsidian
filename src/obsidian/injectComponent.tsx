import { Constructable } from '@Obsidian';
import hoistNonReactStatics from 'hoist-non-react-statics';
import React, { useEffect, useState } from 'react';
import 'reflect-metadata';
import graphRegistry from './GraphRegistry';
import graphResolver from './GraphResolver';
import ObjectGraph from './ObjectGraph';
import referenceCounter from './ReferenceCounter';
import providedPropertiesStore from './ProvidedPropertiesStore';

export default function injectComponent<P>(Target: React.ComponentType<P>, Graph: Constructable<ObjectGraph>) {
  const Wrapped: React.FunctionComponent<Partial<P>> = (args: Partial<P>) => {
    const [graph] = useState(graphResolver.resolve(Graph, args));
    useEffect(() => {
      referenceCounter.retain(graph);
      return () => referenceCounter.release(graph, graphRegistry.clear);
    }, [graph]);

    const handler = new Injector(graph);
    const injectedProps = new Proxy(args ?? {}, handler);

    const props: object = {};
    const graphPropertyKeys = providedPropertiesStore.get(graph);
    graphPropertyKeys.forEach((propKey: string) => Reflect.set(props, propKey, injectedProps[propKey]));
    return <Target {...props as unknown as P} />;
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
