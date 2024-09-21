import {
  graph,
  ObjectGraph,
  provides,
  DependenciesOf,
} from '../../src';
import injectedValues from './injectedValues';
import StringProvider from './StringProvider';
import Subgraph from './Subgraph';

export type Dependencies = DependenciesOf<[MainGraph, Subgraph]>;

@graph({ subgraphs: [Subgraph] })
export default class MainGraph extends ObjectGraph {
  @provides()
  someString(stringProvider: StringProvider): string {
    return stringProvider.theString;
  }

  @provides()
  anotherString(): string {
    return injectedValues.anotherString;
  }
}
