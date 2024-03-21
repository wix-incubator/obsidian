import { DependencyTrackingGraph, SOME_STRING } from '../fixtures/DependencyTrackingGraph';
import { Injectable, LazyInject, Obsidian } from '../../src';

describe('Lazy inject', () => {
  it('does not create dependencies before they are used', () => {
    // eslint-disable-next-line no-new
    new Container();

    const graph = Obsidian.obtain(DependencyTrackingGraph);
    expect(graph.createdDependencies().has(SOME_STRING)).toBe(false);
  });

  it('creates dependencies when they are used', () => {
    const container = new Container();
    expect(container.someString).toBe(SOME_STRING);
  });
});

@Injectable(DependencyTrackingGraph)
class Container {
  @LazyInject() someString!: string;
}
