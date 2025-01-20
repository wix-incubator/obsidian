import { Graph, ObjectGraph, Provides } from "react-obsidian";
import { UsedClass } from './used';
import { UnusedClass } from './unused';
import { AnotherUsedClass } from './another';

@Graph()
export class Container extends ObjectGraph {
  @Provides()
  provideUsedClass() {
    return new UsedClass();
  }

  @Provides()
  provideAnotherClass() {
    return new AnotherUsedClass();
  }
} 