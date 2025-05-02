import { SyntaxKind, Node } from "ts-morph";

export function getDefinition(node: Node, declarationKind: SyntaxKind) {
  if (!Node.isIdentifier(node)) return;
  for (const definition of node.getDefinitionNodes()) {
    if (definition.getKind() === declarationKind) {
      return definition;
    }
  }
}
