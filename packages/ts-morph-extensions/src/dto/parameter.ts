import { ParameterDeclaration } from "ts-morph";

export class Parameter {
  constructor(public readonly node: ParameterDeclaration) { }

  public get name() {
    return this.node.getName();
  }
}