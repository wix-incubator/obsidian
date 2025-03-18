import { graph, ObjectGraph, provides } from "react-obsidian";
@graph()
export class ProviderArgumentsDestructure extends ObjectGraph {
    @provides({
        name: "foo"
    })
    foo({ a, b }) {
        return `${a} ${b}`;
    }
    @provides({
        name: "a"
    })
    a() {
        return "a";
    }
    @provides({
        name: "b"
    })
    b() {
        return "b";
    }
}
