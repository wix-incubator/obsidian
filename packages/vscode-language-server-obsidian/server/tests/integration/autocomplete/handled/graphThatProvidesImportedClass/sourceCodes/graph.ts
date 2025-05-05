import { graph, ObjectGraph, provides } from 'react-obsidian';
import { Clazz } from './clazz';

@graph()
export class GraphWithoutSubgraphs extends ObjectGraph {
  @provides()
  public foo() {
    return 'foo';
  }

  @provides()
  public clazz() {
    return new Clazz();
  }
}