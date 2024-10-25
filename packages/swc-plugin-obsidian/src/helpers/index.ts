/* eslint-disable no-param-reassign */
import {
  Argument,
  ClassMethod,
  ClassProperty,
  Decorator,
  Identifier,
  Param,
  StringLiteral,
  TsParameterProperty,
  KeyValueProperty,
  BindingIdentifier,
  KeyValuePatternProperty,
  ObjectPattern
} from '@swc/types';

const never = '';

export type AcceptedNodeType = Identifier | TsParameterProperty | ClassProperty;

export function providerIsNotNamed(decorator: Decorator): boolean {
  const argument = getDecoratorArgument(decorator);
  if (argument && argument.expression.type === 'ObjectExpression') {
    return argument.expression.properties.find((p) => {
      if (p.type === 'Identifier') {
        return p.value === 'name';
      }
      return false;
    }) === undefined;
  }
  return true;
}

export function addNameToProviderArguments(node: ClassMethod, decorator: Decorator) {
  const fallbackArgument: Argument = {
   expression: {
      type: "ObjectExpression",
      properties: [],
      span: node.function.span,
   }
  };
  
  const argument = getDecoratorArgument(decorator) ?? fallbackArgument;

  const identifierProperty: KeyValueProperty = {
    type: "KeyValueProperty",
    key: {
      type: "Identifier",
      value: "name",
      optional: false,
      span: decorator.span,
    },
    value: {
      type: "StringLiteral",
      value: getMethodName(node),
      span: decorator.span,
    }
  }

  if (argument.expression.type === 'ObjectExpression') {
    argument.expression.properties.push(identifierProperty);
  }

  if (decorator.expression.type === 'CallExpression') {
    decorator.expression.arguments = [argument];
  }
}

export function getDecoratorArgument(decorator: Decorator): Argument | undefined {
  if (decorator.expression.type === 'CallExpression') {
    return decorator.expression.arguments.find((a) => a.expression.type === "ObjectExpression");

  }
  return undefined;
}

export function getMethodName(node: ClassMethod): string {
  if (node.key.type === "Identifier") return node.key.value;
  throw new Error(`Tried to get class name but encountered unexpected key of type: ${node.key.type}`);
}

export function getDecoratorByName(
  decorators: Array<Decorator> | undefined | null,
  decoratorName: string,
): Decorator | undefined {
  return decorators?.find((decorator) => {
    return get(decorator, 'expression.callee.value') === decoratorName;
  });
}

export function getDecoratorName(decorator?: Decorator): string | undefined {
  return get(decorator, 'expression.callee.value');
}

export function paramsToDestructuringAssignment(params: Param[]): Param {
  return {
    type: "Parameter",
    span: params[0].span,
    decorators: [],
    pat: {
      type: "ObjectPattern",
      span: params[0].span,
      properties: params.map((p): KeyValuePatternProperty => ({
        type: "KeyValuePatternProperty",
        key: {
          type: "Identifier",
          value: (p.pat as BindingIdentifier).value,
          optional: false,
          ctxt: (params[0].pat as any).ctxt,
          span: (p.pat as BindingIdentifier).span,
        } as BindingIdentifier,
        value: {
          type: "Identifier",
          value: (p.pat as BindingIdentifier).value,
          optional: false,
          ctxt: (params[0].pat as any).ctxt,
          span: (p.pat as BindingIdentifier).span,
        } as BindingIdentifier
      })),
      optional: false,
    } as ObjectPattern,
  };
}

export function passParamNameAsInjectArgument(
  node: AcceptedNodeType,
  decorator: Decorator,
) {
  if (decorator.expression.type === 'CallExpression') {
    const stringLiteral: StringLiteral = {
      type: "StringLiteral",
      value: getNodeName(node),
      span: node.span,
    }
    const argument: Argument = {
      expression: stringLiteral,
    }
    decorator.expression.arguments = [argument];
  }
}

function getNodeName(node: AcceptedNodeType): string {
  if (node.type === 'TsParameterProperty') {
    if (node.param.type === 'Identifier') {
      return node.param.value;
    }
    return never;
  }
  if (node.type === 'ClassProperty') {
    if (node.key.type === 'Identifier') {
      return node.key.value;
    }
    return never;
  }
  return node.value;
}

function get(node: any, path: string): any {
  if (node === undefined || node === null) return undefined;
  const [key, ...rest] = path.split('.');
  if (rest.length === 0) return node[key];
  return get(node[key], rest.join('.'));
}
