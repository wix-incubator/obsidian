import { Inject } from "react-obsidian";

export class Foo {
  @Inject() public readonly bar!: string;
}
