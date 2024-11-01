import {
  graph,
  ObjectGraph,
  Obsidian,
  provides,
} from '../../src';

describe('abstract graph', () => {
  it('should be able to create a graph', () => {
    expect(new FooGraph()).toBeInstanceOf(FooGraph);
  });

  it('should be able to provide a value', () => {
    expect(Obsidian.obtain(FooGraph).atomicDependency()).toBe('foo');
  });

  it('should be able to provide a composite value', () => {
    expect(Obsidian.obtain(FooGraph).compositeDependency()).toBe('foobar');
  });

  it('should provide dependencies that depend on abstract dependencies', () => {
    expect(Obsidian.obtain(FooGraph).dependsOnAbstractDependency()).toBe('depends on baz');
  });
});

abstract class AbstractGraph extends ObjectGraph {
  @provides()
  compositeDependency(atomicDependency: string, bar: string) {
    return atomicDependency + bar;
  }

  @provides()
  atomicDependency() {
    return 'foo';
  }

  @provides()
  dependsOnAbstractDependency(baz: string) {
    return `depends on ${baz}`;
  }

  abstract baz(): string;
}

@graph()
class FooGraph extends AbstractGraph {
  @provides()
  bar() {
    return 'bar';
  }

  @provides()
  override baz() {
    return 'baz';
  }
}
