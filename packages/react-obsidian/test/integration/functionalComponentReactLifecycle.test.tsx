import React, { useCallback, useEffect, useState } from 'react';
import { fireEvent, render } from '@testing-library/react';
import { injectComponent } from '../../src';
import MainGraph from '../fixtures/MainGraph';

enum Lifecycle { Mounted, Unmounted }

const componentLifecycle: Lifecycle[] = [];

interface InjectedComponentProps {
  someString: string;
}

const Component: React.FunctionComponent<InjectedComponentProps> = ({ someString }: InjectedComponentProps) => {
  useEffect(() => {
    componentLifecycle.push(Lifecycle.Mounted);
    return () => void componentLifecycle.push(Lifecycle.Unmounted);
  }, []);

  const onClick = useCallback(() => setCounter(counter + 1), []);
  const [counter, setCounter] = useState(0);

  return (
    <>
      <span data-testid="injectedString">{someString}</span>
      <button data-testid="button" onClick={onClick}>Click Me</button>
      <span data-testid="counter">Clicked {counter}</span>
    </>
  );
};

describe('React lifecycle - functional component', () => {
  let InjectedComponent: React.FunctionComponent<Partial<InjectedComponentProps>>;

  beforeEach(() => {
    InjectedComponent = injectComponent(Component, MainGraph);
  });

  it('useEffect - mount', () => {
    expect(componentLifecycle).toStrictEqual([]);

    const { unmount } = render(<InjectedComponent />);
    expect(componentLifecycle).toStrictEqual([Lifecycle.Mounted]);

    unmount();
    expect(componentLifecycle).toStrictEqual([Lifecycle.Mounted, Lifecycle.Unmounted]);
  });

  it('useState', () => {
    const { getByTestId, getByText } = render(<InjectedComponent />);
    expect(getByText('Clicked 0')).toBeDefined();
    fireEvent.click(getByTestId('button'));
    expect(getByText('Clicked 1')).toBeDefined();
  });
});
