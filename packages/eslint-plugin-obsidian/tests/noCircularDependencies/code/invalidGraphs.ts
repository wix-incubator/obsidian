export const invalidGraph = `import { graph, ObjectGraph, provides } from 'src';

@graph()
class SimpleGraph extends ObjectGraph {
  @provides()
  foo(bar: any): string {
    return 'foo';
  }

  @provides()
  bar(foo: any): string {
    return 'bar';
  }
}`;

export const circularDependencyBetween3Providers = `import { graph, ObjectGraph, provides } from 'src';

@graph()
class SimpleGraph extends ObjectGraph {
  @provides()
  foo(bar: any): string {
    return 'foo';
  }

  @provides()
  bar(baz: any): string {
    return 'bar';
  }

  @provides()
  baz(foo: any): string {
    return 'baz';
  }
}`;

export const circularDependencyBetweenSomeOfTheProviders = `import { graph, ObjectGraph, provides } from 'src';

@graph()
class SimpleGraph extends ObjectGraph {
  @provides()
  foo(bar: any): string {
    return 'foo';
  }

  @provides()
  bar(baz: any): string {
    return 'bar';
  }

  @provides()
  baz(bar: any): string {
    return 'baz';
  }
}`;
