/* eslint-disable no-param-reassign */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const t = require('@babel/core').types;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { get } = require('lodash');

function providerIsNotNamed(decorator) {
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

function addNameToProviderArguments(node, decorator) {
  const argument = getDecoratorArgument(decorator) || t.objectExpression([]);
  argument.properties.push(t.objectProperty(
    t.identifier('name'),
    t.stringLiteral(getMethodName(node)),
  ));
  decorator.expression.arguments = [argument];
}

function getDecoratorArgument(decorator) {
  if (t.isCallExpression(decorator.expression)) {
    return decorator.expression.arguments.find((a) => t.isObjectExpression(a));
  }
  return undefined;
}

function getMethodName(node) {
  if (t.isIdentifier(node.key)) return node.key.name;
  throw new Error(`Tried to get class name but encountered unexpected key of type: ${node.key.type}`);
}

function getProviderDecorator(decorators) {
  return decorators ? decorators.find((decorator) => get(decorator, 'expression.callee.name') === 'Provides') : undefined;
}

function getDecoratorName(decorator) {
  return get(decorator, 'expression.callee.name');
}

function paramsToDestructuringAssignment(params) {
  return t.objectPattern(params
    .filter((p) => t.isIdentifier(p))
    .map((p) => t.objectProperty(t.identifier(p.name), t.identifier(p.name))));
}

module.exports = {
  addNameToProviderArguments,
  getDecoratorName,
  getProviderDecorator,
  paramsToDestructuringAssignment,
  providerIsNotNamed,
};
