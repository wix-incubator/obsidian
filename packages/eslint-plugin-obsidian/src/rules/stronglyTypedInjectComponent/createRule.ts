import type { TSESTree } from '@typescript-eslint/types';
import { Context } from '../../dto/context';
import { InjectComponentHandler } from './injectComponentHandler';

export function create(context: Context) {
  const injectComponentHandler = new InjectComponentHandler(context);

  return {
    CallExpression(node: TSESTree.CallExpression) {
      injectComponentHandler.handle(node);
    },
  };
}
