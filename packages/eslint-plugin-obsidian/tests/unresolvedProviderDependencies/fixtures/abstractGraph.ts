import { ObjectGraph, Provides } from 'react-obsidian';

export abstract class AbstractGraph extends ObjectGraph {
  @Provides()
  bar(): string {
    return 'bar';
  }
}
