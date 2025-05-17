import { graph, ObjectGraph, provides, singleton } from 'react-obsidian';

@singleton() @graph()
export class NetworkGraph extends ObjectGraph {
  @provides()
  httpClient() {
    return 'httpClient';
  }
}
