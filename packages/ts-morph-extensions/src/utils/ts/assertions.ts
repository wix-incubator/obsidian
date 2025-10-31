import { Identifier, Node } from "ts-morph";

export function assertIdentifier(node: Node): asserts node is Identifier {
  if (!Node.isIdentifier(node)) throw new Error(`Expected identifier, got ${node.getKindName()} (${node.getText()})`);
}
