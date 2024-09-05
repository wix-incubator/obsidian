export const invalidGraph = `import { Graph, ObjectGraph, Provides } from 'src';

@Graph()
class SimpleGraph extends ObjectGraph {
  @Provides()
  foo(bar: any): string {
    return 'foo';
  }

  @Provides()
  bar(foo: any): string {
    return 'bar';
  }
}`;

export const circularDependencyBetween3Providers = `import { Graph, ObjectGraph, Provides } from 'src';

@Graph()
class SimpleGraph extends ObjectGraph {
  @Provides()
  foo(bar: any): string {
    return 'foo';
  }

  @Provides()
  bar(baz: any): string {
    return 'bar';
  }

  @Provides()
  baz(foo: any): string {
    return 'baz';
  }
}`;

export const circularDependencyBetweenSomeOfTheProviders = `import { Graph, ObjectGraph, Provides } from 'src';

@Graph()
class SimpleGraph extends ObjectGraph {
  @Provides()
  foo(bar: any): string {
    return 'foo';
  }

  @Provides()
  bar(baz: any): string {
    return 'bar';
  }

  @Provides()
  baz(bar: any): string {
    return 'baz';
  }
}`;
