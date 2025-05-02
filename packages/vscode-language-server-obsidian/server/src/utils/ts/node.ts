import { Node } from "ts-morph";
import { hasParentWithDecorator } from "./decorators";

export function isInjected(node: Node | undefined): boolean {
  if (!node || !Node.isIdentifier(node)) return false;
  for (const reference of node.findReferencesAsNodes()) {
    if (hasParentWithDecorator(reference, ['Provides', 'provides'])) {
      return true;
    }
  }
  return false;
}
