import { graph, ObjectGraph, provides } from '../../src';

@graph()
export class GraphWithMultipleDependencies extends ObjectGraph {
  @provides()
  theDep(prefix: string, suffix: string) {
    return prefix + suffix;
  }

  @provides()
  prefix(noopDep: string) {
    return `prefix${noopDep}`;
  }

  @provides()
  suffix(noopDep: string) {
    return `Suffix${noopDep}`;
  }

  @provides()
  noopDep(): string {
    return '';
  }
}
