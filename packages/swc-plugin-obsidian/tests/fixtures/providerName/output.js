import { Graph, ObjectGraph, Provides } from "react-obsidian";
@Graph()
export class ProviderName extends ObjectGraph {
    @Provides({
        name: "foo"
    })
    foo() {
        return "foo";
    }
}
