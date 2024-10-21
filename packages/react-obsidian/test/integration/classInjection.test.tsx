import { inject, injectable } from '../../src';
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

  @injectable(GraphWithOnBind)
  class ClassToTestOnBind {
    @inject() public readonly targetName!: string;
  }

  @injectable(MainGraph)
  class SingleArg {
    @inject() public readonly someString!: string;
  }
});
