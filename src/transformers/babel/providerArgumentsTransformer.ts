/* eslint-disable no-console */
import { ClassMethod, Decorator, Program } from '@babel/types';
import { get } from 'lodash';
import { NodePath, PluginObj, types } from '@babel/core';

const providerArgumentsTransformer: PluginObj = {
  visitor: {
    Program(path: NodePath<Program>) {
      path.traverse(internalVisitor);
    },
  },
};

const internalVisitor = {
  ClassMethod: {
    enter({ node, parent }: NodePath<ClassMethod>) {
      const decorator = getProviderDecorator(node.decorators);
      if (getDecoratorName(decorator) === 'Provides') {
        node.params.forEach((param) => {
          if (types.isIdentifier(param)) {
            console.log(param.name);
          }
        });
      }
    },
  },
};

function getProviderDecorator(decorators: Array<Decorator> | undefined | null): Decorator | undefined {
  return decorators?.find((decorator) => get(decorator, 'expression.callee.name') === 'Provides');
}

function getDecoratorName(decorator?: Decorator): string | undefined {
  return get(decorator, 'expression.callee.name');
}

export default providerArgumentsTransformer;
