import { Node, ArrowFunction, FunctionTypeNode, SyntaxKind } from "ts-morph";
import { getDeclarationFromIdentifier } from "../ts/tsMorph";

export function getHookDeclaration(node: ArrowFunction) {
  const body = node.getBody();
  if (Node.isCallExpression(body)) {
    return getDeclarationFromIdentifier(body.getExpression(), SyntaxKind.VariableDeclaration);
  }
}

export function getHookDecarationFromTypedProvider(node: FunctionTypeNode) {
  const typeReference = node.getChildrenOfKind(SyntaxKind.TypeReference)[0];
  const arg = typeReference.getTypeArguments()[0];
  if (Node.isTypeQuery(arg)) {
    return getDeclarationFromIdentifier(arg.getExprName(), SyntaxKind.VariableDeclaration);
  }
}
