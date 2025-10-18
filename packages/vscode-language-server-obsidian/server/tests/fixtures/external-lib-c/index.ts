import { graph, ObjectGraph, provides } from 'react-obsidian';
import { ExternalGraphD } from 'external-lib-d';

@graph({subgraphs: [ExternalGraphD]})
export class ExternalGraphC extends ObjectGraph {
  @provides()
  complexExternalDepC(externalDependencyD: string): string {
    return `complex from lib-b: ${externalDependencyD}`;
  }
}
