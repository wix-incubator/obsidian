import ts = require("typescript");
import { getDecoratedMethods } from "../utils/decorators";
import { Provider } from "./provider";

export class Graph {
  constructor(private node: ts.ClassDeclaration) { }

  public hasProvider(name: string): boolean {
    return this.findProvider(name) !== undefined;
  }

  public requireProvider(name: string) {
    return this.findProvider(name)!;
  }

  public findProvider(name: string) {
    const providers = this.getProviders().find(provider => provider.name.getText() === name);
    return providers && new Provider(providers);
  }

  public getProviders() {
    return getDecoratedMethods(this.node, ['Provides', 'provides']);
  }
}
