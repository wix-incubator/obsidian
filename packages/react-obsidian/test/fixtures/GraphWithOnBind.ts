import { graph, ObjectGraph, provides } from '../../src';

@graph()
export class GraphWithOnBind extends ObjectGraph {
  private target!: any;

  override onBind(target: unknown) {
    this.target = target;
  }

  @provides()
  targetName(): string {
    return this.target.name as string;
  }
}
