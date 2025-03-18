import { inject } from "react-obsidian";

export class Foo {
  @inject() public readonly bar!: string;
}
