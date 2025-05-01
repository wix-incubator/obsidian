import { Node, ArrowFunction, FunctionTypeNode, SyntaxKind } from "ts-morph";

export function getHookDeclaration(node: ArrowFunction) {
  const body = node.getBody();
  if (Node.isCallExpression(body)) {
    return getDeclarationFromIdentifier(body.getExpression());
  }
}

export function getHookDecarationFromTypedProvider(node: FunctionTypeNode) {
  const typeReference = node.getChildrenOfKind(SyntaxKind.TypeReference)[0];
  const arg = typeReference.getTypeArguments()[0];
  if (Node.isTypeQuery(arg)) {
    return getDeclarationFromIdentifier(arg.getExprName());
  }
}

function getDeclarationFromIdentifier(node: Node) {
  if (Node.isIdentifier(node)) {
    const references = node.findReferencesAsNodes() || [];
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
