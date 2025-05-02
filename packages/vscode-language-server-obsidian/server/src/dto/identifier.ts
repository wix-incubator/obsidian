import { Node } from "ts-morph";
import { hasParentWithDecorator } from "../utils/ts/decorators";

export class Identifier {
  constructor (private node: Node) { }

  public isInjected(): boolean {
    if (!Node.isIdentifier(this.node)) return false;
    for (const reference of this.node.findReferencesAsNodes()) {
      if (hasParentWithDecorator(reference, ['Provides', 'provides'])) {
        return true;
      }
    }
    return false;
  }

  public isHook(): boolean {
    return /^use[A-Z][a-zA-Z]*$/.test(this.node.getText());
  }

  public isProviderDependency(): boolean {
    return Node.isParameterDeclaration(this.node.getParent()) && hasParentWithDecorator(this.node, ['Provides', 'provides']);
  }
}
