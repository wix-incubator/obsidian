import type { TSESTree } from '@typescript-eslint/types';
import { Context } from '../../dto/context';
import { InjectComponentHandler } from './injectComponentHandler';
import { CallExpression } from '../../dto/callExpression';
import { ErrorReporter } from './result/errorReporter';
import { TypeValidator } from './typeValidator';
import type { Options } from '.';

export function create(context: Context, options: Options) {
  const injectComponentHandler = new InjectComponentHandler(
    new TypeValidator(options),
    new ErrorReporter(context),
  );

  return {
    CallExpression(node: TSESTree.CallExpression) {
      injectComponentHandler.handle(new CallExpression(node));
    },
  };
}
