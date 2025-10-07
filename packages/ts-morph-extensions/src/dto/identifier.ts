import { Node, Identifier as TSMorphIdentifier } from "ts-morph";
import { hasParentWithDecorator } from "../utils/ts/decorators";
import { assertIdentifier } from "../utils/ts/assertions";

export class Identifier {
  private node: TSMorphIdentifier;

  constructor (node: Node) {
    assertIdentifier(node);
    this.node = node;
  }

  public isInjected(): boolean {
    return this.node.findReferencesAsNodes().some(
      reference => hasParentWithDecorator(reference, ['Provides', 'provides'])
    );
  }

  public isHook(): boolean {
    return /^use[A-Z][a-zA-Z]*$/.test(this.node.getText());
  }

  public isProviderDependency(): boolean {
    return Node.isParameterDeclaration(this.node.getParent()) && hasParentWithDecorator(this.node, ['Provides', 'provides']);
  }
}
