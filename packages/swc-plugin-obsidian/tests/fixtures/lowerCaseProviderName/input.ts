import { graph, ObjectGraph, provides } from "react-obsidian";

@graph()
export class ProviderName extends ObjectGraph {
  @provides()
  foo() {
    return "foo";
  }
}