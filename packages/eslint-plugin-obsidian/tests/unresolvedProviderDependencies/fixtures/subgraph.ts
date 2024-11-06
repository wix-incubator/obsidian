import { uniqueId } from 'lodash';
import { graph, ObjectGraph, provides } from 'react-obsidian';

@graph()
export default class Subgraph extends ObjectGraph {
  @provides()
  unusedDependency(): string {
    throw Error('This dependency should not have been resolved since it is not required by anyone.');
  }

  @provides()
  instanceId(): string {
    return uniqueId('graph');
  }

  @provides()
  foo(): string {
    return 'foo';
  }
}
