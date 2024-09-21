import { AST_NODE_TYPES, type TSESTree } from '@typescript-eslint/types';
import type { ArrayExpressionElement } from '../types';
import { assertDefined } from './assertions';

export function isClassLike(node: TSESTree.Node): node is TSESTree.ClassDeclaration {
  switch (node.type) {
    case AST_NODE_TYPES.ClassDeclaration:
      return true;
    case AST_NODE_TYPES.ExportDefaultDeclaration:
      return isClassLike(node.declaration);
    case AST_NODE_TYPES.ExportNamedDeclaration:
      return isClassLike(node.declaration!);
    default:
      return false;
  }
}

export function isTypeReference(node?: TSESTree.Node): node is TSESTree.TSTypeReference {
  return node?.type === AST_NODE_TYPES.TSTypeReference;
}

export function isTypeLiteral(node: TSESTree.Node): node is TSESTree.TSTypeLiteral {
  return node.type === AST_NODE_TYPES.TSTypeLiteral;
}

export function isImportDeclaration(node: TSESTree.Node): node is TSESTree.ImportDeclaration {
  return node.type === AST_NODE_TYPES.ImportDeclaration;
}

export function isMethodDefinition(node: TSESTree.Node): node is TSESTree.MethodDefinition {
  return node.type === AST_NODE_TYPES.MethodDefinition;
}

export function getClassDeclaration(node: TSESTree.Node): TSESTree.ClassDeclaration | undefined {
  switch (node.type) {
    case AST_NODE_TYPES.ClassDeclaration:
      return node;
    case AST_NODE_TYPES.ExportDefaultDeclaration:
      return getClassDeclaration(node.declaration);
    case AST_NODE_TYPES.ExportNamedDeclaration:
      return getClassDeclaration(node.declaration!);
    default:
      return undefined;
  }
}

export function requireProgram(node: TSESTree.Node | undefined): TSESTree.Program {
  assertDefined(node);
  switch (node.type) {
    case AST_NODE_TYPES.Program:
      return node;
    default:
      return requireProgram(node.parent);
  }
}

export function getDecoratorProperty(decorator: TSESTree.Decorator, propertyName: string) {
  const expression = decorator.expression as TSESTree.CallExpression;
  const property = expression.arguments.map((argument) => {
    return getObjectProperty(argument as TSESTree.ObjectExpression, propertyName);
  })[0];
  return property;
}

function getObjectProperty(obj: TSESTree.ObjectExpression, propertyName: string) {
  return obj.properties.find((property) => {
    return property.type === AST_NODE_TYPES.Property
      && property.key.type === AST_NODE_TYPES.Identifier
      && property.key.name === propertyName;
  }) as TSESTree.Property | undefined;
}

export function mapArrayExpression<T>(array: TSESTree.ArrayExpression, map: (el: ArrayExpressionElement) => T) {
  return array.elements.map(map);
}

export function isTypeIntersection(node: TSESTree.Node | undefined): node is TSESTree.TSIntersectionType {
  return node?.type === AST_NODE_TYPES.TSIntersectionType;
}

export function isTypeAnnotation(node: TSESTree.Node | undefined): node is TSESTree.TSTypeAnnotation {
  return node?.type === AST_NODE_TYPES.TSTypeAnnotation;
}

export function isAnyType(node: TSESTree.Node | undefined): node is TSESTree.TSAnyKeyword {
  return node?.type === AST_NODE_TYPES.TSAnyKeyword;
}

export function isVariableDeclaration(node: TSESTree.Node): node is TSESTree.VariableDeclaration {
  return node.type === AST_NODE_TYPES.VariableDeclaration;
}
