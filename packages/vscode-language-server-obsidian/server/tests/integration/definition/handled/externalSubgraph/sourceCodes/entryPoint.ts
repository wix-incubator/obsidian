import { graph, ObjectGraph, provides, singleton } from 'react-obsidian';
import { ExternalGraphC } from 'external-lib-c';

@singleton() @graph({ subgraphs: [ExternalGraphC] })
export class SimpleGraph extends ObjectGraph {
  @provides()
  bar(externalDependencyD: string) {
    return 'bar' + externalDependencyD;
  }
}
