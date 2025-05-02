import { SyntaxKind, Node, ParameterDeclaration, ArrayLiteralExpression, BindingElement } from "ts-morph";

export function isDestructuredParameter(node: Node | undefined): node is BindingElement {
  return node?.getKind() === SyntaxKind.BindingElement;
}

export function isParameter(node: Node | undefined): node is ParameterDeclaration {
  return node?.getKind() === SyntaxKind.Parameter;
}

export function isArrayLiteralExpression(node: Node | undefined): node is ArrayLiteralExpression {
  return node?.getKind() === SyntaxKind.ArrayLiteralExpression;
}

export function getDeclarationFromIdentifier(node: Node, declarationKind: SyntaxKind) {
  if (Node.isIdentifier(node)) {
    const references = node.findReferencesAsNodes() || [];
    for (const reference of references) {
      const symbol = reference.getSymbol();
      if (symbol?.getDeclarations().length === 1) {
        const declaration = symbol.getDeclarations()[0];
        if (declaration.getKind() === declarationKind) {
          return declaration;
        }
      }
    }
  }
}
