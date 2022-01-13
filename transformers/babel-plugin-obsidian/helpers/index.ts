/* eslint-disable no-param-reassign */
import { types as t } from '@babel/core';
import {
  CallExpression,
  ClassMethod,
  Decorator,
  Identifier,
  ObjectExpression,
  ObjectPattern,
  TSParameterProperty,
} from '@babel/types';
import { get } from 'lodash';

const never = '';

export function providerIsNotNamed(decorator: Decorator): boolean {
  const argument = getDecoratorArgument(decorator);
  if (t.isObjectExpression(argument)) {
    return argument.properties.find((p) => {
      if (t.isObjectProperty(p)) {
        return t.isIdentifier(p.key) && p.key.name === 'name';
      }
      return false;
    }) === undefined;
  }
  return true;
}

export function addNameToProviderArguments(node: ClassMethod, decorator: Decorator) {
  const argument = getDecoratorArgument(decorator) ?? t.objectExpression([]);
  argument.properties.push(t.objectProperty(
    t.identifier('name'),
    t.stringLiteral(getMethodName(node)),
  ));
  (decorator.expression as CallExpression).arguments = [argument];
}

export function getDecoratorArgument(decorator: Decorator): ObjectExpression | undefined {
  if (t.isCallExpression(decorator.expression)) {
    return decorator.expression.arguments.find((a) => t.isObjectExpression(a)) as ObjectExpression;
  }
  return undefined;
}

export function getMethodName(node: ClassMethod): string {
  if (t.isIdentifier(node.key)) return node.key.name;
  throw new Error(`Tried to get class name but encountered unexpected key of type: ${node.key.type}`);
}

export function getDecoratorByName(
  decorators: Array<Decorator> | undefined | null,
  decoratorName: string,
): Decorator | undefined {
  return decorators?.find((decorator) => get(decorator, 'expression.callee.name') === decoratorName);
}

export function getDecoratorName(decorator?: Decorator): string | undefined {
  return get(decorator, 'expression.callee.name');
}

export function paramsToDestructuringAssignment(params: (Identifier | any)[]): ObjectPattern {
  return t.objectPattern(params
    .filter((p) => t.isIdentifier(p))
    .map((p) => t.objectProperty(t.identifier(p.name), t.identifier(p.name))));
}

export function passParamNameAsInjectArgument(node: Identifier | TSParameterProperty, decorator: Decorator) {
  if (t.isCallExpression(decorator.expression)) {
    decorator.expression.arguments = [
      t.stringLiteral(getIdentifierOrParamName(node)),
    ];
  }
}

function getIdentifierOrParamName(node: Identifier | TSParameterProperty): string {
  if (t.isTSParameterProperty(node)) {
    if (t.isIdentifier(node.parameter)) {
      return node.parameter.name;
    }
    return never;
  }
  return node.name;
}
