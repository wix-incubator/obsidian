import { GoToDefinitionStrategy } from "./goToDefinitionStrategy";
import { Node, SyntaxKind } from "ts-morph";
import { Definition } from "vscode-languageserver/node";
import { hasParentWithDecorator } from "../../../utils/decorators";
import { createDefinition } from "../helpers";
import { Logger } from "../../../services/logger";
import { getProvidedHookDeclaration } from "../../../utils/providers";

export class HookStrategy implements GoToDefinitionStrategy {

  constructor (private logger: Logger) { }

  public async goToDefinition(node: Node): Promise<Definition | undefined> {
    const declarations = node.getSymbol()?.getDeclarations();
    const hook = this.resolveInjectedHook(declarations);
    return hook && createDefinition(hook.getSourceFile(), hook);
  }

  private resolveInjectedHook(declarations: Node[] | undefined) {
    if (declarations?.length !== 1) return;
    const symbol = declarations[0]?.getType()?.getSymbol();
    const symbolDeclaration = symbol?.getDeclarations()[0];
    return this.getProviderDeclarationIfHook(symbolDeclaration);
  }

  private getProviderDeclarationIfHook(node: Node | undefined) {
    if (Node.isArrowFunction(node) && hasParentWithDecorator(node, ['Provides', 'provides'])) {
      return getProvidedHookDeclaration(node);
    } else if (Node.isFunctionTypeNode(node)) {
      const typeReference = node.getChildrenOfKind(SyntaxKind.TypeReference)[0];
      const arg = typeReference.getTypeArguments()[0];
      if (Node.isTypeQuery(arg)) {
        const type = arg.getExprName();
        if (Node.isIdentifier(type)) {
          const references = type.findReferencesAsNodes() || [];
          for (const reference of references) {
            const symbol = reference.getSymbol();
            if (symbol?.getDeclarations().length === 1) {
              const declaration = symbol.getDeclarations()[0];
              if (Node.isVariableDeclaration(declaration)) {
                return declaration;
              }
            }
          }
        }
      }
    }
  }
}
