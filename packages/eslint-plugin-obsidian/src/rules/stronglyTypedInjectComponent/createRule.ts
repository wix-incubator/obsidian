import type { TSESTree } from '@typescript-eslint/types';
import { Context } from '../../dto/context';
import { InjectComponentHandler } from './injectComponentHandler';
import { CallExpression } from '../../dto/callExpression';
import { ErrorReporter } from './errorReporter';
import { TypeValidator } from './typeValidator';

export function create(context: Context) {
  const injectComponentHandler = new InjectComponentHandler(
    new ErrorReporter(context),
    new TypeValidator(),
  );

  return {
    CallExpression(node: TSESTree.CallExpression) {
      injectComponentHandler.handle(new CallExpression(node));
    },
  };
}
