import React from 'react';
import { render } from '@testing-library/react';
import { injectComponent } from '../../src';
import SingletonGraph from '../fixtures/SingletonGraph';

const Component = (props: any) => <>{`${props.instanceId}`}</>;

describe('TestKit', () => {
  const injectedValues = new Set<string>();
  const InjectedComponent = injectComponent(Component, SingletonGraph);

  it('clears @Singleton graphs between tests - part 1', () => {
    const { container } = render(<InjectedComponent />);
    const instanceName = container.textContent!;
    expect(injectedValues.has(instanceName)).toBeFalsy();
    injectedValues.add(instanceName);
  });

  it('clears @Singleton graphs between tests - part 2', () => {
    const { container } = render(<InjectedComponent />);
    const instanceName = container.textContent!;
    expect(injectedValues.has(instanceName)).toBeFalsy();
    injectedValues.add(instanceName);
  });
});
