import { graph, ObjectGraph, provides } from 'react-obsidian';
import { FooModel } from './fooModel';

@graph()
export class Subgraph extends ObjectGraph {
  @provides()
  public fooModel(): FooModel {
    return new FooModel();
  }
}