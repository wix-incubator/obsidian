import type { TSESTree } from '@typescript-eslint/types';
import { Clazz } from '../../dto/class';
import { Context } from '../../dto/context';
import { GraphHandler } from './graphHandler';
import { ClassAdapter } from '../../ts/adapters/classAdapter';

export function create(context: Context, classAdapter: ClassAdapter) {
  const graphHandler = new GraphHandler(context, classAdapter);

  return {
    ClassDeclaration(node: TSESTree.ClassDeclaration) {
      graphHandler.handle(new Clazz(node));
    },
  };
}
