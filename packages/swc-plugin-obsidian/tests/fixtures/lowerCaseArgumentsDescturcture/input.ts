import { graph, ObjectGraph, provides } from "react-obsidian";

@graph()
export class ProviderArgumentsDestructure extends ObjectGraph {
  @provides()
  foo(a: string, b: number) {
    return `${a} ${b}`;
  }

  @provides()
  a() {
    return "a";
  }

  @provides()
  b() {
    return "b";
  }
}
