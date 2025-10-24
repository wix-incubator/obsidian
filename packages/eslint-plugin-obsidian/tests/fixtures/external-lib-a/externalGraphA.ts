import { graph, ObjectGraph, provides } from 'react-obsidian';

@graph()
export class ExternalGraphA extends ObjectGraph {
  @provides()
  externalDependencyA(): string {
    return 'from external-lib-a';
  }
}
