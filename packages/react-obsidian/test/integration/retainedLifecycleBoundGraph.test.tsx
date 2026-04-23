import React, { Activity } from 'react';
import { act, render, screen } from '@testing-library/react';
import {
  DependenciesOf,
  Model,
  ObjectGraph,
  Observable,
  graph,
  injectComponent,
  lifecycleBound,
  Obsidian,
  provides,
} from '../../src';
import { RetainedLifecycleBoundGraph } from '../fixtures/RetainedLifecycleBoundGraph';

class ActivityThemeModel extends Model {
  public readonly theme = new Observable('light');
}

let activityThemeModel = new ActivityThemeModel();

@lifecycleBound({ inactiveBehavior: 'retain' }) @graph()
class ActivityThemeGraph extends ObjectGraph {
  @provides()
  activityThemeModel(): ActivityThemeModel {
    return activityThemeModel;
  }
}

type InjectedActivityTheme = DependenciesOf<ActivityThemeGraph, 'activityThemeModel'>;

const ActivityThemeComponent = injectComponent(
  ({ activityThemeModel: themeModel }: InjectedActivityTheme) => {
    const { theme } = themeModel.use();
    return <div data-testid="theme">{theme}</div>;
  },
  ActivityThemeGraph,
);

describe('lifecycle-bound graph with inactiveBehavior: retain', () => {
  const PausedComponent = injectComponent(() => <div data-testid="component" />, RetainedLifecycleBoundGraph);

  beforeEach(() => {
    RetainedLifecycleBoundGraph.timesCreated = 0;
    activityThemeModel = new ActivityThemeModel();
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

  it('refreshes model.use values that changed while the Activity was hidden', () => {
    const { rerender } = render(
      <Activity mode="visible">
        <ActivityThemeComponent />
      </Activity>,
    );

    expect(screen.getByTestId('theme')).toHaveTextContent('light');

    rerender(
      <Activity mode="hidden">
        <ActivityThemeComponent />
      </Activity>,
    );

    act(() => {
      activityThemeModel.theme.value = 'dark';
    });

    rerender(
      <Activity mode="visible">
        <ActivityThemeComponent />
      </Activity>,
    );

    expect(screen.getByTestId('theme')).toHaveTextContent('dark');
  });
});
