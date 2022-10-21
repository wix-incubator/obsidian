import { render } from '@testing-library/react';
import React from 'react';
import { injectComponent, injectHook } from '../../src';
import { ScopedGraph } from '../fixtures/ScopedGraph';

describe('Scoped graphs', () => {
  const useHook = injectHook(() => {}, ScopedGraph);

  const Component = injectComponent(() => {
    useHook();
    return <></>;
  }, ScopedGraph);

  it('should render the scoped graph', async () => {
    const { container } = render(<Component />);
    expect(ScopedGraph.timesCreated).toBe(1);
  });
});
