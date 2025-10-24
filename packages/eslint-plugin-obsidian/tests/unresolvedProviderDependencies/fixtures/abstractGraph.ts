import { ObjectGraph, provides } from 'react-obsidian';

export abstract class AbstractGraph extends ObjectGraph {
  @provides()
  bar(): string {
    return 'bar';
  }
}
