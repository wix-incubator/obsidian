import React from 'react';
import { render, screen } from '@testing-library/react';
import { injectComponent, Obsidian } from '../../src';
import { RetainedLifecycleBoundGraph } from '../fixtures/RetainedLifecycleBoundGraph';

// Activity is a React 19 export — cast needed because IDE resolves @types/react from monorepo root (v18)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Activity = (React as any).Activity as React.FC<{ mode: 'visible' | 'hidden'; children: React.ReactNode }>;

describe('lifecycle-bound graph with inactiveBehavior: retain', () => {
  const PausedComponent = injectComponent(() => <div data-testid="component" />, RetainedLifecycleBoundGraph);

  beforeEach(() => {
    RetainedLifecycleBoundGraph.timesCreated = 0;
  });

  it('retains the graph in the registry when effects are cleaned up without unmounting', () => {
    render(
      <React.StrictMode>
        <PausedComponent />
      </React.StrictMode>,
    );

    expect(screen.getByTestId('component')).toBeInTheDocument();
    expect(() => Obsidian.obtain(RetainedLifecycleBoundGraph)).not.toThrow();
  });

  it('releases the graph from the registry after unmount', () => {
    const { unmount } = render(
      <React.StrictMode>
        <PausedComponent />
      </React.StrictMode>,
    );

    unmount();

    expect(() => Obsidian.obtain(RetainedLifecycleBoundGraph)).toThrow();
  });

  it('retains the graph when the screen is hidden by Activity', () => {
    const { rerender } = render(
      <Activity mode="visible">
        <PausedComponent />
      </Activity>,
    );

    rerender(
      <Activity mode="hidden">
        <PausedComponent />
      </Activity>,
    );

    expect(() => Obsidian.obtain(RetainedLifecycleBoundGraph)).not.toThrow();
  });

  it('does not recreate the graph after a pause/resume cycle', () => {
    render(
      <React.StrictMode>
        <PausedComponent />
      </React.StrictMode>,
    );

    render(<PausedComponent />);

    expect(RetainedLifecycleBoundGraph.timesCreated).toBe(1);
  });
});
