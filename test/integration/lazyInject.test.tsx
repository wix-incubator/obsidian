import { Injectable, LazyInject, Obsidian } from '../../src';
import injectedValues from './fixtures/injectedValues';
import lazyInjector from '../../src/injectors/class/LazyInjector';
import MainGraph from './fixtures/MainGraph';

describe('Class lazy injection', () => {
  it('Inject @LazyInject property', () => {
    const uut = new LazyProperty();
    expect(uut.someString).toBeUndefined();
    lazyInjector.inject(uut);
    expect(uut.someString).toBe(injectedValues.fromStringProvider);
  });

  it('Does not inject @LazyInject property without calling constructor', () => {
    const uut = Object.create(LazyPropertyConstructorInjection.prototype);
    expect(uut.someString).toBeUndefined();
  });

  it('Inject @LazyInject property by calling constructor', () => {
    const uut = new LazyPropertyConstructorInjection();
    expect(uut.someString).toBe(injectedValues.fromStringProvider);
  });

  it('@LazyInject does not change the class name', () => {
    const uut = new LazyPropertyConstructorInjection();
    expect(uut.constructor.name).toBe(LazyPropertyConstructorInjection.name);
  });
});

@Injectable(MainGraph)
class LazyProperty {
  @LazyInject() someString!: string;
}

@Injectable(MainGraph)
class LazyPropertyConstructorInjection {
  @LazyInject() someString!: string;
  constructor() {
    Obsidian.inject(this);
  }
}
