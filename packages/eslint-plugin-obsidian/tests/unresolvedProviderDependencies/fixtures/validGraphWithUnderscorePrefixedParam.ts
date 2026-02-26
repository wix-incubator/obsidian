import { graph, ObjectGraph, provides } from 'react-obsidian';

@graph()
export default class GraphWithUnderscorePrefixedParam extends ObjectGraph {
  @provides()
  provider(_unusedParam: string): string {
    return 'value';
  }
}
