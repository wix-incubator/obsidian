import React from 'react';
import { Constructable } from '@Obsidian';
import hoistNonReactStatics from 'hoist-non-react-statics';
import 'reflect-metadata';
import ObjectGraph from '../../ObjectGraph';
import providedPropertiesStore from '../../ProvidedPropertiesStore';
import { PropsInjector } from './PropsInjector';
import useGraph from './useGraph';

export default class ComponentInjector {
  inject<P>(Target: React.ComponentType<P>, Graph: Constructable<ObjectGraph>) {
    const Wrapped: React.FunctionComponent<Partial<P>> = this.wrapComponent(Target, Graph);
    hoistNonReactStatics(Wrapped, Target);
    return Wrapped;
  }

  private wrapComponent<P>(
    Target: React.ComponentType<P>,
    Graph: Constructable<ObjectGraph>,
  ): React.FunctionComponent<Partial<P>> {
    return (passedProps: Partial<P>) => {
      const graph = useGraph(Graph, passedProps);
      const propsProxy = new PropsInjector(graph).inject(passedProps);
      const injectedProps = providedPropertiesStore.keyByUnmangled(
        graph,
        (propKey: string) => propsProxy[propKey],
      );
      return <Target {...injectedProps as unknown as P} />;
    };
  }
}
