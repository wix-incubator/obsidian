import {
  ClassMethod,
  ClassProperty,
  Identifier,
  Program,
  TSParameterProperty,
} from '@babel/types';
import { NodePath, PluginObj } from '@babel/core';
import unmagler from './unmagler';

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
      unmagler.saveClassMethod('provides', node);
    },
  },
  ClassProperty: {
    enter({ node }: NodePath<ClassProperty>) {
      unmagler.saveClassProperty('inject', node);
      unmagler.saveClassProperty('lateInject', node);
    },
  },
  Identifier: {
    enter({ node }: NodePath<Identifier>) {
      unmagler.saveIdentifier('inject', node);
    },
  },
  TSParameterProperty: {
    enter({ node }: NodePath<TSParameterProperty>) {
      unmagler.saveTSParameterProperty('inject', node);
    },
  },
};

export default function plugin() {
  return providerArgumentsTransformer;
}
