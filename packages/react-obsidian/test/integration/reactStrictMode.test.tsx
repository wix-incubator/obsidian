import React from 'react';
import { render } from '@testing-library/react';
import { DependenciesOf, injectComponent } from '../../src';
import { LifecycleBoundGraph } from '../fixtures/LifecycleBoundGraph';

describe('React Strict Mode', () => {
  it('should render without crashing', () => {
    const { container } = render(<InjectedComponent stringFromProps="foo" />, {
      wrapper: React.StrictMode,
    });
    expect(container.textContent).toBe('A string passed via props: foo');
  });
});

const Component = ({ computedFromProps }: DependenciesOf<LifecycleBoundGraph, 'computedFromProps'>) => {
  return <>{computedFromProps}</>;
};

const InjectedComponent = injectComponent<{ stringFromProps: string }>(Component, LifecycleBoundGraph);
