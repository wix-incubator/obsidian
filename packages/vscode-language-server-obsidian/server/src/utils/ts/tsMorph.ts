import {
  SyntaxKind,
  Node,
  Identifier,
  ObjectBindingPattern,
  ParameterDeclaration,
  ClassDeclaration,
  ArrayLiteralExpression,
  BindingElement,
} from "ts-morph";

export function isDestructuredParameter(node: Node | undefined): node is BindingElement {
  return node?.getKind() === SyntaxKind.BindingElement;
}

export function isObjectBindingPattern(node: Node | undefined): node is ObjectBindingPattern {
  return node?.getKind() === SyntaxKind.ObjectBindingPattern;
}

export function isParameter(node: Node | undefined): node is ParameterDeclaration {
  return node?.getKind() === SyntaxKind.Parameter;
}

export function isClassDeclaration(node: Node | undefined): node is ClassDeclaration {
  return node?.getKind() === SyntaxKind.ClassDeclaration;
}

export function isArrayLiteralExpression(node: Node | undefined): node is ArrayLiteralExpression {
  return node?.getKind() === SyntaxKind.ArrayLiteralExpression;
}

export function isIdentifier(node: Node | undefined): node is Identifier {
  return node?.getKind() === SyntaxKind.Identifier;
}
