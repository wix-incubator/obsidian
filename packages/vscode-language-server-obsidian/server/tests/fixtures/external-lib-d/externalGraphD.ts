import { graph, ObjectGraph, provides } from 'react-obsidian';

@graph()
export class ExternalGraphD extends ObjectGraph {
  @provides()
  externalDependencyD(): string {
    return 'from external-lib-d';
  }
}
