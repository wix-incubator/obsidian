import { Inject } from "react-obsidian";
export class Foo {
    @Inject("bar")
    public readonly bar!: string;
}
