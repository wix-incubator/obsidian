import { uniqueId } from 'lodash';
import { singleton } from '../../src/decorators/Singleton';
import { graph, ObjectGraph, provides } from '../../src';

@singleton() @graph()
export default class SingletonGraph extends ObjectGraph {
  private id = uniqueId();

  @provides()
  instanceId(): string {
    return `graph${this.id}`;
  }
}
