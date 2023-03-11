import { Graph, ObjectGraph, Provides } from '../../src';

@Graph()
export class GraphWithOnBind extends ObjectGraph {
  private target!: any;

  override onBind(target: any) {
    this.target = target;
  }

  @Provides()
  targetName(): string {
    return this.target.name;
  }
}
