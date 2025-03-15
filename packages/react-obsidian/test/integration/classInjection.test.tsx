import { Inject, Injectable, Obsidian } from '../../src';
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

  it('injects properties from a registered graph', () => {
    Obsidian.registerGraph('main', () => MainGraph);
    const uut = new ClassToTestRegisteredGraph();
    expect(uut.someString).toBe(injectedValues.fromStringProvider);
  });

  @Injectable('main')
  class ClassToTestRegisteredGraph {
    @Inject() public readonly someString!: string;
  }

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
