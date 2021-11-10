/* eslint-disable no-console */
import { ClassExpression, ClassMethod, Decorator } from '@babel/types';
import { get } from 'lodash';
import { NodePath, PluginObj } from '@babel/core';

const providerArgumentsTransformer = (): PluginObj => ({
  visitor: {
    Function(path: NodePath<any>) {
      // console.log(path);
      findDecorator(path, 2);
    },
    // ClassExpression(path: NodePath<ClassExpression>) {
    //   console.log(path.node.decorators);
    // },
    ClassMethod({ node, parent }: NodePath<ClassMethod>) {
      console.log(parent.type);
      console.log(node.type);
      const { decorators } = node;
      console.log(decorators);
      const decorator = getProviderDecorator(decorators);
      if (getDecoratorName(decorator) === 'Provides') {
        console.log('Success');
      }
    },
  },
});

function findDecorator(obj: any, depth) {
  if (obj.decorator) {
    console.log(obj);
  } else {
    Object.keys(obj).forEach((key) => {
      findDecorator(obj[key]);
    });
  }
}

function getProviderDecorator(decorators: Array<Decorator>): Decorator | undefined {
  return decorators?.find((decorator) => get(decorator, 'expression.callee.name') === 'Provides');
}

function getDecoratorName(decorator: Decorator): string | undefined {
  return get(decorator, 'expression.callee.name');
}

export default providerArgumentsTransformer;
