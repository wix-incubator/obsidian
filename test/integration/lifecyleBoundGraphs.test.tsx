import { render } from '@testing-library/react';
import React from 'react';
import {
  Inject,
  Injectable,
  Obsidian,
  injectComponent,
  injectHook,
} from '../../src';
import { LifecycleBoundGraph } from '../fixtures/LifecycleBoundGraph';

describe('React lifecycle bound graphs', () => {
  const Component = createFunctionalComponent();

  beforeEach(() => {
    LifecycleBoundGraph.timesCreated = 0;
  });

  it('creates a bound graph only once', async () => {
    render(<Component />);
    render(<Component />);
    expect(LifecycleBoundGraph.timesCreated).toBe(1);
  });

  it('clears a bound graph when all dependent components and hooks are unmounted', () => {
    const { unmount } = render(<Component />);
    unmount();
    render(<Component />);

    expect(LifecycleBoundGraph.timesCreated).toBe(2);
  });

  it('passes props to the component', () => {
    const { container } = render(<ClassComponent stringFromProps='Obsidian is cool' />);
    expect(container.textContent).toBe('A string passed via props: Obsidian is cool');
  });

  it('obtains a lifecycle bound graph only if it was already created', () => {
    expect(() => Obsidian.obtain(LifecycleBoundGraph)).toThrowError(
      'Tried to obtain a @LifecycleBound graph, but it was not created yet.',
    );
  });

  it(`resolves a dependency when @LifecycleBound graph is used as a service locator`, () => {
    render(<Component />);

    const dependency = Obsidian.obtain(LifecycleBoundGraph).doesNotRequireProps();
    expect(dependency).toBe('A string that does not require props');
  });

  it(`treats a @LifecycleBound graph as a singleton while it's bound to a graph`, () => {
    render(<Component />);
    Obsidian.obtain(LifecycleBoundGraph).doesNotRequireProps();

    expect(LifecycleBoundGraph.timesCreated).toBe(1);
  });

  function createFunctionalComponent() {
    const useHook = injectHook(() => {}, LifecycleBoundGraph);

    return injectComponent(() => {
      useHook();
      return <></>;
    }, LifecycleBoundGraph);
  }

  @Injectable(LifecycleBoundGraph)
  class ClassComponent extends React.Component<{ stringFromProps: string }> {
    @Inject() private computedFromProps!: string;

    override render() {
      return <>{this.computedFromProps}</>;
    }
  }
});
