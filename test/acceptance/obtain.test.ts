import { Obsidian } from '../../src';
import injectedValues from '../fixtures/injectedValues';
import MainGraph from '../fixtures/MainGraph';
import { MissingDependencyHasSubgraph } from '../fixtures/MissingDependencyHasSubgraph';

describe('obtain', () => {
  it('Retrieves value from a provider that has no dependencies', () => {
    expect(Obsidian.obtain(MainGraph).anotherString()).toBe(injectedValues.anotherString);
  });

  it('Retrieves value from a provider that has dependencies', () => {
    expect(Obsidian.obtain(MainGraph).someString()).toBe(injectedValues.fromStringProvider);
  });

  it('Should not overflow when attempting to retrieve a dependency with unsatisfied dependencies', () => {
    expect(
      () => Obsidian.obtain(MissingDependencyHasSubgraph).aString(),
    ).not.toThrowError('Maximum call stack size exceeded');
  });
});
