import React, { useState } from 'react';
import { Constructable } from '@Obsidian';
import hoistNonReactStatics from 'hoist-non-react-statics';
import 'reflect-metadata';
import ObjectGraph from '../../ObjectGraph';
import PropsInjector from './PropsInjector';
import useGraph from './useGraph';

export default class ComponentInjector {
  inject<P>(
    Target: React.FunctionComponent<P>,
    Graph: Constructable<ObjectGraph>,
  ): React.FunctionComponent<Partial<P>> {
    const Wrapped = this.wrapComponent(Target, Graph);
    hoistNonReactStatics(Wrapped, Target);
    return Wrapped;
  }

  private wrapComponent<P>(
    Target: React.FunctionComponent<P>,
    Graph: Constructable<ObjectGraph>,
  ): React.FunctionComponent<Partial<P>> {
    return (passedProps: Partial<P>) => {
      const graph = useGraph(Graph, passedProps);
      const [proxiedProps] = useState(new PropsInjector(graph).inject(passedProps));
      return <>{Target(proxiedProps as unknown as P)}</>;
    };
  }
}
