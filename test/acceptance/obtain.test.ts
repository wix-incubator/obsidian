import { MissingDependencyHasSubgraph } from '../fixtures/MissingDependencyHasSubgraph';
import { Obsidian } from '../../src';
import injectedValues from '../fixtures/injectedValues';
import MainGraph from '../fixtures/MainGraph';

describe('obtain', () => {
  it('Retrieves value from a provider that has no dependencies', () => {
    expect(Obsidian.obtain(MainGraph).anotherString()).toBe(injectedValues.anotherString);
  });

  it('Retrieves value from a provider that has dependencies', () => {
    expect(Obsidian.obtain(MainGraph).someString()).toBe(injectedValues.fromStringProvider);
  });
  fit('should throw error when the dependency is not defined', () => {
    const errorMessage = 'Could not resolve dependency aString '
    + 'in MissingDependencyGraph1 or in any of its subgraphs:';
    expect(() => Obsidian.obtain(MissingDependencyHasSubgraph).aString()).toThrow(errorMessage);
  // TODO: the test failing because the recursion is not stopping.
    //   Obsidian.obtain(MissingDependencyHasSubgraph).aString();
  });
});
