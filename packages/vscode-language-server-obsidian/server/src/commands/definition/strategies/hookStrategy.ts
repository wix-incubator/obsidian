import { GoToDefinitionStrategy } from "./goToDefinitionStrategy";
import { Node } from "ts-morph";
import { Definition } from "vscode-languageserver/node";
import { hasParentWithDecorator } from "ts-morph-extensions";
import { createDefinition } from "../helpers";
import { Logger } from "../../../services/logger";
import { getHookDecarationFromTypedProvider, getHookDeclaration } from "ts-morph-extensions";

export class HookStrategy implements GoToDefinitionStrategy {

  constructor (private logger: Logger) { }

  public async goToDefinition(node: Node): Promise<Definition | undefined> {
    const declarations = node.getSymbol()?.getDeclarations();
    const hook = this.resolveInjectedHook(declarations);
    return hook && createDefinition(this.logger, hook);
  }

  private resolveInjectedHook(declarations: Node[] | undefined) {
    if (declarations?.length !== 1) return;
    const symbol = declarations[0]?.getType()?.getSymbol();
    const symbolDeclaration = symbol?.getDeclarations()[0];
    return this.getProviderDeclarationIfHook(symbolDeclaration);
  }

  private getProviderDeclarationIfHook(node: Node | undefined) {
    if (Node.isArrowFunction(node) && hasParentWithDecorator(node, ['Provides', 'provides'])) {
      return getHookDeclaration(node);
    } else if (Node.isFunctionTypeNode(node)) {
      return getHookDecarationFromTypedProvider(node);
    }
  }
}
