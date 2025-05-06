import { graph, ObjectGraph, provides, singleton } from 'react-obsidian';

@singleton() @graph()
export class ThemeGraph extends ObjectGraph {

  @provides()
  foo(bar: string, baz: string) {
    return `foo: ${bar} ${baz}`;
  }

  @provides()
  bar() {
    return 'bar';
  }

  @provides()
  baz() {
    return 'baz';
  }
}
