import { graph, provides } from 'react-obsidian';

@graph()
export class GraphWithoutSubgraphs {
  @provides()
  public foo(bar: string,) {
    return bar + 'foo';
  }

  @provides()
  public bar() {
    return 'bar';
  }

  @provides()
  public baz() {
    return 'baz';
  }
}