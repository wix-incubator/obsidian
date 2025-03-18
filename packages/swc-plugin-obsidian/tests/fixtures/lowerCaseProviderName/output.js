import { graph, ObjectGraph, provides } from "react-obsidian";
@graph()
export class ProviderName extends ObjectGraph {
    @provides({
        name: "foo"
    })
    foo() {
        return "foo";
    }
}
