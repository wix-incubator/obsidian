import { render } from '@testing-library/react';
import React from 'react';
import {
  inject,
  injectable,
  Obsidian,
  injectComponent,
  injectHook,
} from '../../src';
import { LifecycleBoundGraph } from '../fixtures/LifecycleBoundGraph';
import { ObtainLifecycleBoundGraphException } from '../../src/graph/registry/ObtainLifecycleBoundGraphException';

describe('React lifecycle bound graphs', () => {
  const Component = createFunctionalComponent();

  beforeEach(() => {
    LifecycleBoundGraph.timesCreated = 0;
  });

  it('creates a bound graph only once', () => {
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

  it('clears a bound graph after dependent components are unmounted when it was used for class injection', () => {
    const Component2 = createFunctionalComponent({ instantiateInjectableClass: true });
    const { unmount } = render(<Component2 />);
    unmount();
    render(<Component2 />);

    expect(LifecycleBoundGraph.timesCreated).toBe(2);
  });

  it('passes props to the component', () => {
    const { container } = render(<ClassComponent stringFromProps="Obsidian is cool" />);
    expect(container.textContent).toBe('A string passed via props: Obsidian is cool');
  });

  it('obtains a lifecycle bound graph only if it was already created', () => {
    expect(() => Obsidian.obtain(LifecycleBoundGraph)).toThrow(
      'Tried to obtain a @LifecycleBound graph LifecycleBoundGraph, but it was not created yet. '
      + '@LifecycleBound graphs can only be obtained after they were created by a React component or hook.',
    );
  });

  it('throws when a lifecycle bound graph is used to inject a class before it was created', () => {
    expect(() => {
      @injectable(LifecycleBoundGraph)
      class Foo {
        // @ts-expect-error - This is used to inject the class
        @inject() private computedFromProps!: string;
      }

      new Foo();
    }).toThrow(ObtainLifecycleBoundGraphException);
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

  it('clears a bound graph when all dependent class components are unmounted', () => {
    const { unmount } = render(<ClassComponent stringFromProps="foo" />);
    unmount();
    render(<Component />);

    expect(LifecycleBoundGraph.timesCreated).toBe(2);
  });

  type CreateOptions = { instantiateInjectableClass: boolean };
  function createFunctionalComponent({ instantiateInjectableClass }: CreateOptions = {
    instantiateInjectableClass: false,
  }) {
    const useHook = injectHook(() => {
      if (instantiateInjectableClass) {
        new Foo();
      }
    }, LifecycleBoundGraph);

    return injectComponent(() => {
      useHook();
      return <></>;
    }, LifecycleBoundGraph);
  }

  @injectable(LifecycleBoundGraph)
  class ClassComponent extends React.Component<{ stringFromProps: string }> {
    @inject() private computedFromProps!: string;

    override render() {
      return <>{this.computedFromProps}</>;
    }
  }

  @injectable(LifecycleBoundGraph)
  class Foo {
    @inject() private computedFromProps!: string;

    log() {
      console.log(this.computedFromProps);
    }
  }
});
