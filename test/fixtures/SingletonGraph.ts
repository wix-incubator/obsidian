import { uniqueId } from 'lodash';
import { Singleton } from '../../src/decorators/Singleton';
import { Graph, ObjectGraph, Provides } from '../../src';

@Singleton() @Graph()
export default class SingletonGraph extends ObjectGraph {
  private id = uniqueId();

  @Provides()
  instanceId(): string {
    return `graph${this.id}`;
  }
}
