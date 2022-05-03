import { Obsidian } from '../../src';
import injectedValues from '../integration/fixtures/injectedValues';
import MainGraph from '../integration/fixtures/MainGraph';

describe('obtain', () => {
  it('Retrieves value from a provider that has no dependencies', () => {
    expect(Obsidian.obtain(MainGraph).anotherString()).toBe(injectedValues.anotherString);
  });

  it('Retrieves value from a provider that has dependencies', () => {
    expect(Obsidian.obtain(MainGraph).someString()).toBe(injectedValues.fromStringProvider);
  });
});
