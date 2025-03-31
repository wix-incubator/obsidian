import ts = require("typescript");

export function getNodeAtPosition(node: ts.Node, position: number) {
  return find(node, node => position >= node.getStart() && position < node.getEnd());
}

export function find(node: ts.Node, predicate: (node: ts.Node) => boolean): ts.Node | undefined {
  if (predicate(node)) {
    return ts.forEachChild(node, child => find(child, predicate)) || node;
  }
  return undefined;
}
