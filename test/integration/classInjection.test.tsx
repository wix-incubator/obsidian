import { Inject, Injectable } from '../../src';
import injectedValues from './fixtures/injectedValues';
import MainGraph from './fixtures/MainGraph';

describe('Class injection', () => {
  @Injectable(MainGraph)
  class MyClass {
    @Inject someString!: string;
  }

  it('Injects class properties', () => {
    const uut = new MyClass();
    expect(uut.someString).toBe(injectedValues.fromStringProvider);
  });
});
