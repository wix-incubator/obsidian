/* eslint-disable no-param-reassign */
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
      unmagler.saveClassMethod('Provides', node);
    },
  },
  ClassProperty: {
    enter({ node }: NodePath<ClassProperty>) {
      unmagler.saveClassProperty('Inject', node);
      unmagler.saveClassProperty('LateInject', node);
    },
  },
  Identifier: {
    enter({ node }: NodePath<Identifier>) {
      unmagler.saveIdentifier('Inject', node);
    },
  },
  TSParameterProperty: {
    enter({ node }: NodePath<TSParameterProperty>) {
      unmagler.saveTSParameterProperty('Inject', node);
    },
  },
};

export default function plugin() {
  return providerArgumentsTransformer;
}
