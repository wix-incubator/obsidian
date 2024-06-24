import { uniqueId } from 'lodash';
import { Graph, ObjectGraph, Provides } from 'react-obsidian';

@Graph()
export default class Subgraph extends ObjectGraph {
  @Provides()
  unusedDependency(): string {
    throw Error('This dependency should not have been resolved since it is not required by anyone.');
  }

  @Provides()
  instanceId(): string {
    return uniqueId('graph');
  }

  @Provides()
  foo(): string {
    return 'foo';
  }
}
