import { graph, provides } from 'react-obsidian';

@graph()
export class GraphWithoutSubgraphs {
  @provides()
  public foo() {
    return 'foo';
  }

  @provides()
  public bar() {
    return 'bar';
  }
}