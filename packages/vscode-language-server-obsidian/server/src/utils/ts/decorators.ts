import { Decorator } from '../../dto/decorator';
import { Node, SyntaxKind, MethodDeclaration, ClassDeclaration } from 'ts-morph';

export function hasDecorator(node: MethodDeclaration, decoratorNames: string[]): boolean {
  return getDecorator(node, decoratorNames) !== undefined;
}

export function getDecorator(node: MethodDeclaration | ClassDeclaration, decoratorNames: string[]): Decorator | undefined {
  if (!node.getDecorators()) return undefined;
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

export function hasProvidesDecorator(node: Node | undefined): boolean {
  if (node?.getKind() !== SyntaxKind.MethodDeclaration) return false;
  return hasDecorator(node as MethodDeclaration, ['Provides', 'provides']);
}

export function hasGraphDecorator(node: Node | undefined): boolean {
  if (node?.getKind() !== SyntaxKind.ClassDeclaration) return false;
  return hasDecorator(node as MethodDeclaration, ['Graph', 'graph']);
}

export function getDecoratedMethods(node: Node, decoratorNames: string[]): MethodDeclaration[] {
  const methods: MethodDeclaration[] = [];

  function visit(node: Node) {
    if (node.getKind() === SyntaxKind.MethodDeclaration && hasDecorator(node as MethodDeclaration, decoratorNames)) {
      methods.push(node as MethodDeclaration);
    }
    node.getChildren().forEach(visit);
  }

  visit(node);
  return methods;
}
