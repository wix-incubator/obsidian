/* eslint-disable no-param-reassign */
import { ClassMethod, Decorator, Program } from '@babel/types';
import { NodePath, PluginObj } from '@babel/core';
import {
  addNameToProviderArguments,
  getDecoratorName,
  getProviderDecorator,
  paramsToDestructuringAssignment,
  providerIsNotNamed,
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
      const decorator = getProviderDecorator(node.decorators);
      if (getDecoratorName(decorator) === 'Provides') {
        convertProviderParamsToDestructuringAssignment(node);
        saveUnmangledMethodNameInProviderArguments(node, decorator!);
      }
    },
  },
};

function convertProviderParamsToDestructuringAssignment(node: ClassMethod) {
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
