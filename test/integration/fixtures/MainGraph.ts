import { Graph, ObjectGraph, Provides } from '../../../src';
import { StringProvider } from './StringProvider';
import Subgraph from './Subgraph';

@Graph({ subgraphs: [Subgraph] })
export default class MainGraph extends ObjectGraph {
  // @Provides({ name: 'someString' })
  // someString({ stringProvider }): string {
  @Provides()
  someString(stringProvider: StringProvider): string {
    return stringProvider.theString;
  }
}
