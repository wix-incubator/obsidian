import Bar from 'bar';
import { Graph, ObjectGraph, Provides } from "react-obsidian";

@Graph()
export class MyGraph extends ObjectGraph {
    private bar = new Bar();

    @Provides({
        name: "foo"
    })
    foo() {
        const Foo = require("foo");
        return new Foo();
    }
}