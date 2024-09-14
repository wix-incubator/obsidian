import { uniqueId } from 'lodash';
import { graph, ObjectGraph, provides } from '../../src';
import injectedValues from './injectedValues';
import StringProvider from './StringProvider';

@graph()
export default class Subgraph extends ObjectGraph {
  @provides()
  stringProvider(): StringProvider {
    return new StringProvider();
  }

  @provides()
  stringFromSubgraph(): string {
    return injectedValues.fromSubgraph;
  }

  @provides()
  unusedDependency(): string {
    throw Error('This dependency should not have been resolved since it is not required by anyone.');
  }

  @provides()
  instanceId(): string {
    return uniqueId('graph');
  }
}
