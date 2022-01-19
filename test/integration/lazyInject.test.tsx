import lazyInjector from 'src/injectors/class/LazyInjector';
import { Injectable, LazyInject } from '../../src';
import injectedValues from './fixtures/injectedValues';
import MainGraph from './fixtures/MainGraph';

describe('Class lazy injection', () => {
  it('lazy injector injects class property', () => {
    const uut = new LazySingleArg();
    expect(uut.someString).toBeUndefined();
    lazyInjector.inject(uut);
    expect(uut.someString).toBe(injectedValues.fromStringProvider);
  });
});

@Injectable(MainGraph)
class LazySingleArg {
  @LazyInject() someString!: string;
}
