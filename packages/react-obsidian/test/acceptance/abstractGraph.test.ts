import {
  Graph,
  ObjectGraph,
  Obsidian,
  Provides,
} from '../../src';

describe('abstract graph', () => {
  it('should be able to create a graph', () => {
    expect(new FooGraph()).toBeInstanceOf(FooGraph);
  });

  it('should allow applying @graph decorator to an abstract class', () => {
    expect(() => {
      @Graph()
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, unused-imports/no-unused-vars
      // @ts-expect-error - dismiss type error for abstract class
      abstract class _SomeAbstractGraph extends ObjectGraph {}
    }).not.toThrow();
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
  @Provides()
  compositeDependency(atomicDependency: string, bar: string) {
    return atomicDependency + bar;
  }

  @Provides()
  atomicDependency() {
    return 'foo';
  }

  @Provides()
  dependsOnAbstractDependency(baz: string) {
    return `depends on ${baz}`;
  }

  abstract baz(): string;
}

@Graph()
class FooGraph extends AbstractGraph {
  @Provides()
  bar() {
    return 'bar';
  }

  @Provides()
  override baz() {
    return 'baz';
  }
}