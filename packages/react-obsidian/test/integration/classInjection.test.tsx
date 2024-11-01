import { inject, injectable, Obsidian } from '../../src';
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

  @injectable('main')
  class ClassToTestRegisteredGraph {
    @inject() public readonly someString!: string;
  }

  @injectable(GraphWithOnBind)
  class ClassToTestOnBind {
    @inject() public readonly targetName!: string;
  }

  @injectable(MainGraph)
  class SingleArg {
    @inject() public readonly someString!: string;
  }
});
