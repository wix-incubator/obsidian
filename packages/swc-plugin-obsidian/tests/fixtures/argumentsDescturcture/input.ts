import { Graph, ObjectGraph, Provides } from "react-obsidian";

@Graph()
export class ProviderArgumentsDestructure extends ObjectGraph {
  @Provides()
  foo(a: string, b: number) {
    return `${a} ${b}`;
  }

  @Provides()
  a() {
    return "a";
  }

  @Provides()
  b() {
    return "b";
  }
}
