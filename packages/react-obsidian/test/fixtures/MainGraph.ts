import {
  Graph,
  ObjectGraph,
  Provides,
  DependenciesOf,
} from '../../src';
import injectedValues from './injectedValues';
import { HttpClient, PrivateSubgraph } from './privateSubgraph';
import StringProvider from './StringProvider';
import Subgraph from './Subgraph';

export type Dependencies = DependenciesOf<[MainGraph, Subgraph]>;

@Graph({ subgraphs: [Subgraph], privateSubgraphs: [PrivateSubgraph] })
export default class MainGraph extends ObjectGraph {
  @Provides()
  someString(stringProvider: StringProvider): string {
    return stringProvider.theString;
  }

  @Provides()
  anotherString(): string {
    return injectedValues.anotherString;
  }

  @Provides()
  fetcher(httpClient: HttpClient) {
    return {
      fetch: (url: string) => httpClient.fetch(url),
    };
  }
}
