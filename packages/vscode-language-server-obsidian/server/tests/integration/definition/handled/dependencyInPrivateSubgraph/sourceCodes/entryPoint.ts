import { graph, ObjectGraph, provides, singleton } from 'react-obsidian';
import { PrivateSubgraph, type HttpClient } from './privateSubgraph';

@singleton() @graph({ privateSubgraphs: [PrivateSubgraph] })
export class MainGraph extends ObjectGraph {
  @provides()
  fetcher(httpClient: HttpClient) {
    return {
      fetch: (url: string) => httpClient.fetch(url),
    };
  }
}
