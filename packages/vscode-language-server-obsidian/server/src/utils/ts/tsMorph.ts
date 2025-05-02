import { SyntaxKind, Node } from "ts-morph";

// TODO: move to dto
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
