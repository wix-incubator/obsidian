import ts = require("typescript");
import { getDecoratedMethods } from "../utils/decorators";

export class Graph {
  constructor(private node: ts.ClassDeclaration) {}

  public findProvider(name: string) {
    const providers = this.getProviders();
    return providers.find((provider) => provider.name.getText() === name);
  }

  public getProviders() {
    return getDecoratedMethods(this.node, ['Provides', 'provides']);
  }
}
