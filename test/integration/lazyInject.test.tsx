import { Injectable, LazyInject } from '../../src';
import injectedValues from './fixtures/injectedValues';
import lazyInjector from '../../src/injectors/class/LazyInjector';
import MainGraph from './fixtures/MainGraph';

describe('Class lazy injection', () => {
  it('lazy injector injects class property', () => {
    const uut = new LazySingleArg();
    expect(uut.someString).toBeUndefined();
    lazyInjector.inject(uut);
    expect(uut.someString).toBe(injectedValues.fromStringProvider);
  });

  it('lazy injector injects class property', () => {
    const uut = new LazyMultiArg();
    expect(uut.someString).toBeUndefined();
    expect(uut.anotherString).toBeUndefined();
    lazyInjector.inject(uut);
    expect(uut.someString).toBe(injectedValues.fromStringProvider);
    expect(uut.anotherString).toBe(injectedValues.anotherString);
  });
});

@Injectable(MainGraph)
class LazySingleArg {
  @LazyInject() someString!: string;
}

@Injectable(MainGraph)
class LazyMultiArg {
  @LazyInject() someString!: string;
  @LazyInject() anotherString!: string;
}
