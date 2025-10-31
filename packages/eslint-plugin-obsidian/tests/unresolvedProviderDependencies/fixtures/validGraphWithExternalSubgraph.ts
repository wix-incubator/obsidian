// validGraphWithExternalSubgraph.ts
import { graph, ObjectGraph, provides } from 'react-obsidian';
import { ExternalGraphB } from 'external-lib-b';

@graph({ subgraphs: [ExternalGraphB] })
export default class GraphA extends ObjectGraph {
  @provides()
  foo(complexExternalDepB: string): string {
    return 'foo' + complexExternalDepB;
  }
}
