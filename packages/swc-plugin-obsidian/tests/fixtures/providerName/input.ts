import { Graph, ObjectGraph, Provides } from "react-obsidian";

@Graph()
export class ProviderName extends ObjectGraph {
  @Provides()
  foo() {
    return "foo";
  }
}