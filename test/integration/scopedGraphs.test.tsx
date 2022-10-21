import { render } from '@testing-library/react';
import React from 'react';
import { injectComponent, injectHook } from '../../src';
import { ScopedGraph } from '../fixtures/ScopedGraph';

describe('Scoped graphs', () => {
  const Component = createComponent();

  beforeEach(() => {
    ScopedGraph.timesCreated = 0;
  });

  it('creates a scoped graph only once', async () => {
    render(<Component />);
    render(<Component />);
    expect(ScopedGraph.timesCreated).toBe(1);
  });

  it('clears a scoped graph when all dependent components and hooks are unmounted', () => {
    const { unmount } = render(<Component />);
    unmount();
    render(<Component />);

    expect(ScopedGraph.timesCreated).toBe(2);
  });

  function createComponent() {
    const useHook = injectHook(() => {}, ScopedGraph);

    return injectComponent(() => {
      useHook();
      return <></>;
    }, ScopedGraph);
  }
});
