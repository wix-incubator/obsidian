import { Injectable, LazyInject, Obsidian } from '../../src';
import injectedValues from './fixtures/injectedValues';
import lazyInjector from '../../src/injectors/class/LazyInjector';
import MainGraph from './fixtures/MainGraph';

describe('Class lazy injection', () => {
  it('Inject @LazyInject property', () => {
    const uut = new LazySingleArg();
    expect(uut.someString).toBeUndefined();
    lazyInjector.inject(uut);
    expect(uut.someString).toBe(injectedValues.fromStringProvider);
  });

  it('Does not inject @LazyInject property without calling constructor', () => {
    const uut = Object.create(LazyConstruct.prototype);
    expect(uut.someString).toBeUndefined();
  });

  it('Inject @LazyInject property by calling constructor', () => {
    const uut = new LazyConstruct();
    expect(uut.someString).toBe(injectedValues.fromStringProvider);
  });
});

@Injectable(MainGraph)
class LazySingleArg {
  @LazyInject() someString!: string;
}

@Injectable(MainGraph)
class LazyConstruct {
  @LazyInject() someString!: string;
  constructor() {
    Obsidian.inject(this);
  }
}
