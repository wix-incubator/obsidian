import { Obsidian } from '../../src';
import { CircularDependencyGraph } from '../fixtures/CircularDependencyGraph';
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
    ).toThrowError(
      /Could not resolve property aString from CircularDependencyGraph\d because of a circular dependency/,
    );
  });
});
