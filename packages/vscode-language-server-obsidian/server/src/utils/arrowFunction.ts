import { Node, ArrowFunction } from "ts-morph";

export function getReturnNodeDeclaration(node: ArrowFunction) {
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