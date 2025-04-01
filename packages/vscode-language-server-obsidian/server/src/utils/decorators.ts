import * as ts from 'typescript';
import { Decorator } from '../dto/decorator';

export function hasDecorator(node: ts.Node, decoratorNames: string[]): boolean {
  return getDecorator(node, decoratorNames) !== undefined;
}

export function getDecorator(node: ts.Node, decoratorNames: string[]): Decorator | undefined {
  const decorators = ts.canHaveDecorators(node) ? ts.getDecorators(node) : undefined;
  if (!decorators) return undefined;

  for (const decorator of decorators) {
    const decoratorExpr = decorator.expression;
    if (ts.isCallExpression(decoratorExpr)) {
      const identifier = decoratorExpr.expression;
      if (ts.isIdentifier(identifier)) {
        const decoratorName = identifier.text;
        if (decoratorNames.includes(decoratorName)) return new Decorator(decorator);
      }
    }
  }

  return undefined;
}

export function hasProvidesDecorator(node: ts.Node): boolean {
  if (!ts.isMethodDeclaration(node)) return false;
  return hasDecorator(node, ['Provides', 'provides']);
}

export function hasGraphDecorator(node: ts.Node): boolean {
  if (!ts.isClassDeclaration(node)) return false;
  return hasDecorator(node, ['Graph', 'graph']);
}

export function getDecoratedMethods(node: ts.ClassDeclaration, decoratorNames: string[]): ts.MethodDeclaration[] {
  const methods: ts.MethodDeclaration[] = [];

  function visit(node: ts.Node) {
    if (ts.isMethodDeclaration(node) && hasDecorator(node, decoratorNames)) {
      methods.push(node);
    }
    ts.forEachChild(node, visit);
  }

  visit(node);
  return methods;
}
