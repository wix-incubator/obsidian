import { Node } from "ts-morph";
import { hasParentWithDecorator } from "./decorators";

export function isInjected(node: Node | undefined) {
  if (node && Node.isIdentifier(node)) {
    for (const referencedSymbol of node.findReferences()) {
      for (const reference of referencedSymbol.getReferences()) {
        if (hasParentWithDecorator(reference.getNode(), ['Provides', 'provides'])) {
          return true;
        }
      }
    }
  }
  return false;
}
