import { render } from '@testing-library/react';
import React, { useRef } from 'react';
import { GraphWithOnBind } from '../../../test/fixtures/GraphWithOnBind';
import MainGraph, { Dependencies } from '../../../test/fixtures/MainGraph';
import { DependenciesOf } from '../../types';
import { injectComponent } from './InjectComponent';

describe('ComponentInjector', () => {
  interface OwnProps {
    count: number;
  }

  const Component = ({ count, someString }: OwnProps & Dependencies) => {
    return (<>{`${count} - ${someString}`}</>);
  };

  it('Rerenders on props change', () => {
    const InjectedComponent = injectComponent(Component, MainGraph);
    const { container, rerender } = render(<InjectedComponent count={0} />);
    expect(container.textContent).toBe('0 - Fear kills progress');

    rerender(<InjectedComponent count={1} />);
    expect(container.textContent).toBe('1 - Fear kills progress');
  });

  it('Injects memoized component', () => {
    const MemoizedComponent = React.memo(Component);
    const InjectedComponent = injectComponent(MemoizedComponent, MainGraph);
    const { container } = render(<InjectedComponent count={0} />);

    expect(container.textContent).toBe('0 - Fear kills progress');
  });

  it('Rerenders memoized components on props change', () => {
    const MemoizedComponent = React.memo(Component);
    const InjectedComponent = injectComponent(MemoizedComponent, MainGraph);
    const { container, rerender } = render(<InjectedComponent count={0} />);
    expect(container.textContent).toBe('0 - Fear kills progress');

    rerender(<InjectedComponent count={1} />);
    expect(container.textContent).toBe('1 - Fear kills progress');
  });

  it('Memoized component is rerendered according to the given comparator', () => {
    let arePropsEqual = true;
    const MemoizedComponent = React.memo(Component, () => arePropsEqual);
    const InjectedComponent = injectComponent(MemoizedComponent, MainGraph);
    const { container, rerender } = render(<InjectedComponent count={0} />);
    expect(container.textContent).toBe('0 - Fear kills progress');

    rerender(<InjectedComponent count={1} />);
    expect(container.textContent).toBe('0 - Fear kills progress');

    arePropsEqual = false;
    rerender(<InjectedComponent count={2} />);
    expect(container.textContent).toBe('2 - Fear kills progress');
  });

  const RenderCounter = ({ someString }: OwnProps & Dependencies) => {
    const renderCount = useRef(0);
    renderCount.current += 1;
    return (<>{`${renderCount.current} - ${someString}`}</>);
  };

  it('Renders once when component is created', () => {
    const MemoizedComponent = React.memo<any>(RenderCounter);
    const InjectedComponent = injectComponent(MemoizedComponent, MainGraph);
    const { container } = render(<InjectedComponent />);
    expect(container.textContent).toBe('1 - Fear kills progress');
  });

  it('Binds component to the graph before providers are resolved', () => {
    const ComponentToTestOnBind = ({ targetName }: DependenciesOf<GraphWithOnBind, 'targetName'>) => {
      return (<>{targetName}</>);
    };

    const InjectedComponent = injectComponent(ComponentToTestOnBind, GraphWithOnBind);
    const { container } = render(<InjectedComponent />);
    expect(container.textContent).toBe('ComponentToTestOnBind');
  });
});
