import { Inject, Injectable } from '../../src';
import injectedValues from './fixtures/injectedValues';
import MainGraph from './fixtures/MainGraph';

describe('Class injection', () => {
  @Injectable(MainGraph)
  class MyClass {
    @Inject someString!: string;

    constructor(anotherString?: string);
    public constructor(@Inject public anotherString: string) { }
  }

  it('Injects class properties', () => {
    const uut = new MyClass();
    expect(uut.someString).toBe(injectedValues.fromStringProvider);
  });

  // cannot be tested in unit for now, can't get the metadata in reflection
  it.skip('Injects constructor arguments', () => {
    const uut = new MyClass();
    expect(uut.anotherString).toBe(injectedValues.anotherString);
  });
});
