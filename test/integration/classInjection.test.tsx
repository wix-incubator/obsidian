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

  it('Injects class properties', () => {
    const uut = new SingleArgClass();
    expect(uut.someString).toBe(injectedValues.fromStringProvider);
  });

  it('Injects constructor arguments', () => {
    const uut = new SingleArgClass();
    expect(uut.anotherString).toBe(injectedValues.anotherString);
  });

  it('Injects multiple constructor arguments', () => {
    const uut = new MultiArgClass();
    expect(uut.someString).toBe(injectedValues.fromStringProvider);
    expect(uut.anotherString).toBe(injectedValues.anotherString);
  });
});
