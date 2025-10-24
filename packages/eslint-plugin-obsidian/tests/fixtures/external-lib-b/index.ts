import { graph, ObjectGraph, provides } from 'react-obsidian';
import { ExternalGraphA } from 'external-lib-a';

@graph({subgraphs: [ExternalGraphA]})
export class ExternalGraphB extends ObjectGraph {
  @provides()
  complexExternalDepB(externalDependencyA: string): string {
    return `complex from lib-b: ${externalDependencyA}`;
  }
}
