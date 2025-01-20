import { Graph, ObjectGraph, Provides } from "react-obsidian";
import { UnusedClass } from './unused';

@Graph()
export class Container extends ObjectGraph {
  @Provides({
    name: "provideUsedClass"
  })
  provideUsedClass() {
    const UsedClass = require("./used");
    return new UsedClass();
  }

  @Provides({
    name: "provideAnotherClass"
  })
  provideAnotherClass() {
    const AnotherUsedClass = require("./another");
    return new AnotherUsedClass();
  }
} 