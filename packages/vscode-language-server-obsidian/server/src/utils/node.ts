import ts = require("typescript");

export function getNodeAtPosition(node: ts.Node, position: number) {
  return find(node, node => position >= node.getStart() && position < node.getEnd());
}

export function findNodeByText(node: ts.Node | undefined, text: string): ts.Node | undefined {
  if (!node) return undefined;
  if (node.getText() === text) return node;
  return ts.forEachChild(node, child => findNodeByText(child, text));
}

export function find(node: ts.Node, predicate: (node: ts.Node) => boolean): ts.Node | undefined {
  if (predicate(node)) {
    return ts.forEachChild(node, child => find(child, predicate)) || node;
  }
  return undefined;
}

export function getParentByType(node: ts.Node, type: ts.SyntaxKind): ts.Node | undefined {
  if (node.kind === type) return node;
  return getParentByType(node.parent, type);
}

export function getType(node: ts.Node): ts.BindingElement {
  if (ts.isBindingElement(node)) return node;
  return getType(node.parent);
}
