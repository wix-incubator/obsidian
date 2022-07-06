import {
  Graph,
  ObjectGraph,
  Provides,
  DependenciesOf,
} from '../../src';
import injectedValues from './injectedValues';
import StringProvider from './StringProvider';
import Subgraph from './Subgraph';

export type Dependencies = DependenciesOf<[MainGraph, Subgraph]>;

@Graph({ subgraphs: [Subgraph] })
export default class MainGraph extends ObjectGraph {
  @Provides()
  someString(stringProvider: StringProvider): string {
    return stringProvider.theString;
  }

  @Provides()
  anotherString(): string {
    return injectedValues.anotherString;
  }
}
