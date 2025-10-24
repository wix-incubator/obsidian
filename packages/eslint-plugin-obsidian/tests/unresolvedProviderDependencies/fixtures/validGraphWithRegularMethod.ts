// validGraphWithRegularMethod.ts
import { graph, ObjectGraph, provides } from 'react-obsidian';

@graph()
export default class SimpleGraph extends ObjectGraph {
  // @ts-ignore
  private target!: any;

  override onBind(target: any) {
    this.target = target;
  }

  @provides()
  foo(): string {
    return 'foo';
  }
}
