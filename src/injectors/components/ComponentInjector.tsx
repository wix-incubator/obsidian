import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { ObjectGraph } from '../../graph/ObjectGraph';
import PropsInjector from './PropsInjector';
import useGraph from './useGraph';
import { Constructable } from '../../types';
import { isMemoizedComponent } from '../../utils/React';

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
    return (passedProps: Partial<P>) => {
      const graph = useGraph(Graph, passedProps);
      // const [proxiedProps, setProxiedProps] = useState(new PropsInjector(graph).inject(passedProps));
      const proxiedProps = new PropsInjector(graph).inject(passedProps);

      const Target = isMemoizedComponent(InjectionCandidate) ? InjectionCandidate.type : InjectionCandidate;
      return <>{Target(proxiedProps as unknown as P)}</>;
    };
  }
}
