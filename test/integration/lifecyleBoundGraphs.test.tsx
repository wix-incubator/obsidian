import { render } from '@testing-library/react';
import React from 'react';
import { injectComponent, injectHook } from '../../src';
import { LifecycleBoundGraph } from '../fixtures/LifecycleBoundGraph';

describe('React lifecycle bound graphs', () => {
  const Component = createComponent();

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

  function createComponent() {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const useHook = injectHook(() => {}, LifecycleBoundGraph);

    return injectComponent(() => {
      useHook();
      return <></>;
    }, LifecycleBoundGraph);
  }
});
