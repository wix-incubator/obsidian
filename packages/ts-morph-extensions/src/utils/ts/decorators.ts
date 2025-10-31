import { Decorator } from '../../dto/decorator';
import { Node, SyntaxKind, MethodDeclaration, ClassDeclaration } from 'ts-morph';

export function hasDecorator(node: MethodDeclaration | undefined, decoratorNames: string[]): boolean {
  return getDecorator(node, decoratorNames) !== undefined;
}

export function getDecorator(node: MethodDeclaration | ClassDeclaration | undefined, decoratorNames: string[]): Decorator | undefined {
  if (!node?.getDecorators()) return undefined;
  for (const decorator of node.getDecorators()) {
    const decoratorName = decorator.getExpression().getChildren()[0].getText();
    if (decoratorNames.includes(decoratorName)) {
      return new Decorator(decorator);
    }
  }
}

export function hasParentWithDecorator(node: Node | undefined, decoratorNames: string[]): boolean {
  const parent = node?.getParent();
  if (!parent) return false;
  if (Node.isMethodDeclaration(parent) && hasDecorator(parent, decoratorNames)) return true;
  return hasParentWithDecorator(parent, decoratorNames);
}

export function hasGraphDecorator(node: Node | undefined): boolean {
  if (node?.getKind() !== SyntaxKind.ClassDeclaration) return false;
  return hasDecorator(node as MethodDeclaration, ['Graph', 'graph']);
}

export function getDecoratedMethods(node: Node, decoratorNames: string[]): MethodDeclaration[] {
  return node
    .getDescendants()
    .filter(Node.isMethodDeclaration)
    .filter(method => hasDecorator(method, decoratorNames));
}
