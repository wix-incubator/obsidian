import { Node, ArrowFunction, FunctionTypeNode, SyntaxKind } from "ts-morph";
import { getDefinition } from "../ts/identifier";
import { Provider } from "../../dto/provider";
import { hasDecorator } from "../ts/decorators";

export function getHookDeclaration(node: ArrowFunction) {
  const body = node.getBody();
  if (Node.isCallExpression(body)) {
    return getDefinition(body.getExpression(), SyntaxKind.VariableDeclaration);
  }
}

export function getHookDecarationFromTypedProvider(node: FunctionTypeNode) {
  const typeReference = node.getChildrenOfKind(SyntaxKind.TypeReference)[0];
  const arg = typeReference.getTypeArguments()[0];
  if (Node.isTypeQuery(arg)) {
    return getDefinition(arg.getExprName(), SyntaxKind.VariableDeclaration);
  }
}

export function getAncestorProvider(node: Node | undefined): Provider | undefined {
  const parent = node?.getFirstAncestorByKind(SyntaxKind.MethodDeclaration);
  if (parent && hasDecorator(parent, ['provides', 'Provides'])) {
    return new Provider(parent);
  }
}
