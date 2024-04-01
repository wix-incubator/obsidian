import { Obsidian } from '../../src';
import { CircularDependencyFromSubgraph } from '../fixtures/CircularDependencyFromSubgraph';
import { CircularDependencyGraph } from '../fixtures/CircularDependencyGraph';
import { GraphWithMultipleDependencies } from '../fixtures/GraphWithMultipleDependencies';
import injectedValues from '../fixtures/injectedValues';
import MainGraph from '../fixtures/MainGraph';

describe('obtain', () => {
  it('Retrieves value from a provider that has no dependencies', () => {
    expect(Obsidian.obtain(MainGraph).anotherString()).toBe(injectedValues.anotherString);
  });

  it('Retrieves value from a provider that has dependencies', () => {
    expect(Obsidian.obtain(MainGraph).someString()).toBe(injectedValues.fromStringProvider);
  });

  it('Should throw circular dependency error when encountering circular dependencies', () => {
    expect(
      () => Obsidian.obtain(CircularDependencyGraph).aString(),
    ).toThrowError(/Could not resolve aString from CircularDependencyGraph\d because of a circular dependency: aString -> aString$/);
  });

  it('Should not throw circular dependency error resolving valid dependencies', () => {
    expect(
      Obsidian.obtain(GraphWithMultipleDependencies).theDep(),
    ).toBe(`prefixSuffix`);
  });

  it('describes the circular dependency path in the thrown exception', () => {
    expect(() => Obsidian.obtain(CircularDependencyFromSubgraph).dep1()).toThrowError(
      // eslint-disable-next-line max-len
      /Could not resolve dep1 from CircularDependencyFromSubgraph\d because of a circular dependency: dep1 -> dep2 -> dep3 -> dep2/,
    );
  });
});
