import { Injectable, LazyInject, Obsidian } from '../../src';
import injectedValues from './fixtures/injectedValues';
import MainGraph from './fixtures/MainGraph';

describe('Class lazy injection', () => {
  it('lazy inject class property', () => {
    const uut = new LazySingleArg();
    expect(uut.someString).toBeUndefined();
    Obsidian.inject(uut);
    expect(uut.someString).toBe(injectedValues.fromStringProvider);
  });
});

@Injectable(MainGraph)
class LazySingleArg {
  @LazyInject() someString!: string;
}
