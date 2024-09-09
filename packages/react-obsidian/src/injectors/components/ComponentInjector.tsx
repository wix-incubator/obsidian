import React, { PropsWithChildren } from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { ObjectGraph } from '../../graph/ObjectGraph';
import PropsInjector from './PropsInjector';
import useGraph from './useGraph';
import { Constructable } from '../../types';
import { genericMemo, isMemoizedComponent } from '../../utils/React';
import { GraphContext } from './graphContext';
import { useInjectionToken } from './useInjectionToken';

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
    InjectionCandidate: React.FunctionComponent<P>,
    Graph: Constructable<ObjectGraph>,
  ): React.FunctionComponent<Partial<P>> {
    const isMemoized = isMemoizedComponent(InjectionCandidate);
    const Target = isMemoized ? InjectionCandidate.type : InjectionCandidate;
    const compare = isMemoized ? InjectionCandidate.compare : undefined;

    return genericMemo((passedProps: P) => {
      const injectionToken = useInjectionToken(Graph);
      const graph = useGraph<P>(Graph, Target, passedProps, injectionToken);
      const proxiedProps = new PropsInjector(graph).inject(passedProps);

      return (
        <GraphContext.Provider value={{injectionToken}}>
          {Target(proxiedProps as unknown as PropsWithChildren<P>)}
        </GraphContext.Provider>
      );
    }, compare);
  }
}
