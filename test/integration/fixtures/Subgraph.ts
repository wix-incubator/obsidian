import { Graph, ObjectGraph, Provides } from '../../../src';
import { StringProvider } from './StringProvider';

@Graph()
export default class Subgraph extends ObjectGraph {
  @Provides()
  stringProvider(): StringProvider {
    return new StringProvider();
  }

  @Provides()
  stringFromSubgraph(): string {
    return 'FromSubgraph';
  }
}
