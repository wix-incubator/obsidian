import { Node, ArrowFunction, FunctionTypeNode, SyntaxKind } from "ts-morph";

export function getHookDeclaration(node: ArrowFunction) {
  const body = node.getBody();
  if (Node.isCallExpression(body)) {
    const expression = body.getExpression();
    if (Node.isIdentifier(expression)) {
      const references = expression.findReferencesAsNodes() || [];
      for (const reference of references) {
        const symbol = reference.getSymbol();
        if (symbol && symbol.getDeclarations().length > 0) {
          const declaration = symbol.getDeclarations()[0];
          if (Node.isVariableDeclaration(declaration)) {
            return declaration;
          }
        }
      }
    }
  }
}

export function getHookDecarationFromTypedProvider(node: FunctionTypeNode) {
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
