import React from 'react';
import { render, screen } from '@testing-library/react';
import { injectComponent, Obsidian } from '../../src';
import { RetainedLifecycleBoundGraph } from '../fixtures/RetainedLifecycleBoundGraph';

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