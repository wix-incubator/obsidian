import type { TSESTree } from '@typescript-eslint/types';
import type { ArrayExpressionElement } from '../types';
import { assertDefined } from './assertions';

export function isClassLike(node: TSESTree.Node): node is TSESTree.ClassDeclaration {
  switch (node.type) {
    case 'ClassDeclaration':
      return true;
    case 'ExportDefaultDeclaration':
      return isClassLike(node.declaration);
    case 'ExportNamedDeclaration':
      return isClassLike(node.declaration!);
    default:
      return false;
  }
}

export function isImportDeclaration(node: TSESTree.Node): node is TSESTree.ImportDeclaration {
  return node.type === 'ImportDeclaration';
}

export function isMethodDefinition(node: TSESTree.Node): node is TSESTree.MethodDefinition {
  return node.type === 'MethodDefinition';
}

export function getClassDeclaration(node: TSESTree.Node): TSESTree.ClassDeclaration | undefined {
  switch (node.type) {
    case 'ClassDeclaration':
      return node;
    case 'ExportDefaultDeclaration':
      return getClassDeclaration(node.declaration);
    case 'ExportNamedDeclaration':
      return getClassDeclaration(node.declaration!);
    default:
      return undefined;
  }
}

export function requireProgram(node: TSESTree.Node | undefined): TSESTree.Program {
  assertDefined(node);
  switch (node.type) {
    case 'Program':
      return node;
    default:
      return requireProgram(node.parent);
  }
}

export function isImportLike(node: TSESTree.Node): boolean {
  switch (node.type) {
    case 'ImportDeclaration':
    case 'ImportDefaultSpecifier':
      return true;
    default:
      return false;
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
    return property.type === 'Property'
      && property.key.type === 'Identifier'
      && property.key.name === propertyName;
  }) as TSESTree.Property | undefined;
}

export function mapArrayExpression<T>(array: TSESTree.ArrayExpression, map: (el: ArrayExpressionElement) => T) {
  return array.elements.map(map);
}

export function isTypeIntersection(node: TSESTree.Node | undefined): node is TSESTree.TSIntersectionType {
  return node?.type === 'TSIntersectionType';
}