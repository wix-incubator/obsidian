import { render } from '@testing-library/react';
import React from 'react';
import MainGraph, { Dependencies } from '../../../test/fixtures/MainGraph';
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
    const { container, rerender } = render(<InjectedComponent count={0}/>);
    expect(container.textContent).toBe('0 - Fear kills progress');

    rerender(<InjectedComponent count={1}/>);
    expect(container.textContent).toBe('1 - Fear kills progress');
  });

  it('Injects memoized component', () => {
    const MemoizedComponent = React.memo(Component);
    const InjectedComponent = injectComponent(MemoizedComponent, MainGraph);
    const { container } = render(<InjectedComponent count={0}/>);

    expect(container.textContent).toBe('0 - Fear kills progress');
  });

  it('Rerenders memoized components on props change', () => {
    const MemoizedComponent = React.memo(Component);
    const InjectedComponent = injectComponent(MemoizedComponent, MainGraph);
    const { container, rerender } = render(<InjectedComponent count={0}/>);
    expect(container.textContent).toBe('0 - Fear kills progress');

    rerender(<InjectedComponent count={1}/>);
    expect(container.textContent).toBe('1 - Fear kills progress');
  });
});
