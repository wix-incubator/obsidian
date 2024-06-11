import { Graph, ObjectGraph, Provides } from '../../src';

@Graph()
export class GraphWithMultipleDependencies extends ObjectGraph {
  @Provides()
  theDep(prefix: string, suffix: string) {
    return prefix + suffix;
  }

  @Provides()
  prefix(noopDep: string) {
    return `prefix${noopDep}`;
  }

  @Provides()
  suffix(noopDep: string) {
    return `Suffix${noopDep}`;
  }

  @Provides()
  noopDep(): string {
    return '';
  }
}
