import Foo from 'foo';
import Bar from 'bar';
import { Graph, ObjectGraph, Provides } from "react-obsidian";

@Graph()
export class MyGraph extends ObjectGraph {
    private bar = new Bar();

    @Provides()
    foo() {
        return new Foo();
    }
}