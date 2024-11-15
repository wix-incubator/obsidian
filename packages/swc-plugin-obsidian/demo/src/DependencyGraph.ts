import { Singleton, Graph, ObjectGraph, Provides } from 'react-obsidian';
import { StringBuilder } from './StringBuilder';
import { Clock } from './Clock';

@Singleton() @Graph()
export class DependencyGraph extends ObjectGraph {
  @Provides()
  hello(stringBuilder: StringBuilder): string {
    return stringBuilder
      .append('Hello, ')
      .append('world!')
      .toString();
  }

  @Provides()
  stringBuilder() {
    return new StringBuilder();
  }

  @Provides()
  clock() {
    return new Clock();
  }
}
