/* eslint-disable no-param-reassign */
import {
  ClassMethod,
  Identifier,
  Decorator,
  Program,
  TSParameterProperty,
} from '@babel/types';
import { NodePath, PluginObj } from '@babel/core';
import {
  addNameToProviderArguments,
  getDecoratorName,
  getDecoratorByName,
  paramsToDestructuringAssignment,
  providerIsNotNamed,
  passParamNameAsInjectArgument,
  getDecoratorArgument,
} from './helpers';

const providerArgumentsTransformer: PluginObj = {
  visitor: {
    Program(path: NodePath<Program>) {
      path.traverse(internalVisitor);
    },
  },
};

const internalVisitor = {
  ClassMethod: {
    enter({ node }: NodePath<ClassMethod>) {
      const decorator = getDecoratorByName(node.decorators, 'Provides');
      if (getDecoratorName(decorator) === 'Provides') {
        convertProviderParamsToDestructuringAssignment(node);
        saveUnmangledMethodNameInProviderArguments(node, decorator!);
      }
    },
  },
  Identifier: {
    enter({ node }: NodePath<Identifier>) {
      const decorator = getDecoratorByName(node.decorators, 'Inject');
      if (getDecoratorName(decorator) === 'Inject') {
        saveUnmangledParamName(node, decorator!);
      }
    },
  },
  TSParameterProperty: {
    enter({ node }: NodePath<TSParameterProperty>) {
      const decorator = getDecoratorByName(node.decorators, 'Inject');
      if (getDecoratorName(decorator) === 'Inject') {
        saveUnmangledParamName(node, decorator!);
      }
    },
  },
};

function saveUnmangledParamName(node: Identifier | TSParameterProperty, decorator: Decorator) {
  if (injectIsNotNamed(decorator)) {
    passParamNameAsInjectArgument(node, decorator);
  }
}

function injectIsNotNamed(decorator: Decorator): boolean {
  return getDecoratorArgument(decorator) === undefined;
}

function convertProviderParamsToDestructuringAssignment(node: ClassMethod) {
  if (node.params.length === 0) return;
  const destructuredParams = paramsToDestructuringAssignment(node.params);
  node.params.length = 0;
  node.params.push(destructuredParams);
}

function saveUnmangledMethodNameInProviderArguments(node: ClassMethod, decorator: Decorator) {
  if (providerIsNotNamed(decorator)) {
    addNameToProviderArguments(node, decorator);
  }
}

export default function plugin() {
  return providerArgumentsTransformer;
}
