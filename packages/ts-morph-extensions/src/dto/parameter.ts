import { ParameterDeclaration } from "ts-morph";
import { Provider } from "./provider";

export class Parameter {
  constructor(public readonly node: ParameterDeclaration) { }

  public get name() {
    return this.node.getName();
  }

  public isNotProvided(by: Provider[]): boolean {
    return !this.isProvided(by);
  }

  public isProvided(by: Provider[]): boolean {
    return by.some(resolved => resolved.name === this.name);
  }
}
