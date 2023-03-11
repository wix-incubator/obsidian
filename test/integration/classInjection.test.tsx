import { Inject, Injectable } from '../../src';
import { GraphWithOnBind } from '../fixtures/GraphWithOnBind';
import injectedValues from '../fixtures/injectedValues';
import MainGraph from '../fixtures/MainGraph';

describe('Class injection', () => {
  it('injects class properties', () => {
    const uut = new SingleArg();
    expect(uut.someString).toBe(injectedValues.fromStringProvider);
  });

  it('Binds to the graph before injecting properties', () => {
    const uut = new ClassToTestOnBind();
    expect(uut.targetName).toBe('ClassToTestOnBind');
  });

  // it('injects constructor arguments', () => {
  //   const uut = new SingleArg();
  //   expect(uut.anotherString).toBe(injectedValues.anotherString);
  // });

  // it('injects multiple constructor arguments', () => {
  //   const uut = new MultiArg();
  //   expect(uut.someString).toBe(injectedValues.fromStringProvider);
  //   expect(uut.anotherString).toBe(injectedValues.anotherString);
  // });

  // it('only injects if constructor arg is undefined', () => {
  //   const uut = new MultiArg('override');
  //   expect(uut.someString).toBe('override');
  //   expect(uut.anotherString).toBe(injectedValues.anotherString);
  // });

  // it('injects simple constructor args', () => {
  //   const uut = new SimpleArgs();
  //   expect(uut.someString).toBe(injectedValues.fromStringProvider);
  //   expect(uut.anotherString).toBe(injectedValues.anotherString);
  // });

  @Injectable(GraphWithOnBind)
  class ClassToTestOnBind {
    @Inject() public readonly targetName!: string;
  }

  @Injectable(MainGraph)
  class SingleArg {
    @Inject() public readonly someString!: string;

    // constructor(anotherString?: string);
    // public constructor(@Inject() public anotherString: string) { }
  }

  // @Injectable(MainGraph)
  // class MultiArg {
  //   constructor(anotherString?: string, someString?: string);
  //   public constructor(
  //     @Inject() public someString: string,
  //     @Inject() public anotherString: string,
  //   ) { }
  // }

  // @Injectable(MainGraph)
  // class SimpleArgs {
  //   readonly someString: string;

  //   constructor(anotherString?: string, someString?: string);
  //   public constructor(@Inject() someString: string, @Inject() public anotherString: string) {
  //     this.someString = someString;
  //   }
  // }
});
