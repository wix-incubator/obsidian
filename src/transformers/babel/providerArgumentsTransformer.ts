/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
import {
  ClassMethod, Decorator, Identifier, Program,
} from '@babel/types';
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
    enter({ node }: NodePath<ClassMethod>) {
      const decorator = getProviderDecorator(node.decorators);
      if (getDecoratorName(decorator) === 'Provides') {
        const objectPattern = types.objectPattern(
          node.params
            .filter((p) => types.isIdentifier(p))
            .map((p) => types.objectProperty(
              types.identifier((p as Identifier).name),
              types.identifier((p as Identifier).name),
            )),
        );
        node.params.fill(objectPattern);
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
