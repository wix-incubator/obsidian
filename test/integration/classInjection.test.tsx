import { Inject, Injectable } from '../../src';
import injectedValues from './fixtures/injectedValues';
import MainGraph from './fixtures/MainGraph';

describe('Class injection', () => {
  @Injectable(MainGraph)
  class SingleArgClass {
    @Inject() someString!: string;

    constructor(anotherString?: string);
    public constructor(@Inject() public anotherString: string) { }
  }

  @Injectable(MainGraph)
  class MultiArgClass {
    constructor(anotherString?: string, someString?: string);
    public constructor(
      @Inject() public someString: string,
      @Inject() public anotherString: string,
    ) { }
  }

  @Injectable(MainGraph)
  class SimpleArgsClass {
    readonly someString: string;

    constructor(anotherString?: string, someString?: string);
    public constructor(@Inject() someString: string, @Inject() public anotherString: string) {
      this.someString = someString;
    }
  }

  it('injects class properties', () => {
    const uut = new SingleArgClass();
    expect(uut.someString).toBe(injectedValues.fromStringProvider);
  });

  it('injects constructor arguments', () => {
    const uut = new SingleArgClass();
    expect(uut.anotherString).toBe(injectedValues.anotherString);
  });

  it('injects multiple constructor arguments', () => {
    const uut = new MultiArgClass();
    expect(uut.someString).toBe(injectedValues.fromStringProvider);
    expect(uut.anotherString).toBe(injectedValues.anotherString);
  });

  it('only injects if constructor arg is undefined', () => {
    const uut = new MultiArgClass('override');
    expect(uut.someString).toBe('override');
    expect(uut.anotherString).toBe(injectedValues.anotherString);
  });

  it('injects simple constructor args', () => {
    const uut = new SimpleArgsClass();
    expect(uut.someString).toBe(injectedValues.fromStringProvider);
    expect(uut.anotherString).toBe(injectedValues.anotherString);
  });
});
