import { inject } from "react-obsidian";
export class Foo {
    @inject("bar")
    public readonly bar!: string;
}
