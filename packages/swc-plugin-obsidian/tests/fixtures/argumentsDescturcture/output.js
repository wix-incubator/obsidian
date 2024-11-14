import { Graph, ObjectGraph, Provides } from "react-obsidian";
@Graph()
export class ProviderArgumentsDestructure extends ObjectGraph {
    @Provides({
        name: "foo"
    })
    foo({ a, b }) {
        return `${a} ${b}`;
    }
    @Provides({
        name: "a"
    })
    a() {
        return "a";
    }
    @Provides({
        name: "b"
    })
    b() {
        return "b";
    }
}
