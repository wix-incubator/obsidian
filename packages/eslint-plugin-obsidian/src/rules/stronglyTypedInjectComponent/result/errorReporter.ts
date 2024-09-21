import type { TSESTree } from '@typescript-eslint/types';
import type { Context } from '../../../dto/context';
import type { Result } from './result';

export class ErrorReporter {
  constructor(private context: Context) { }

  public report(result: Result, node: TSESTree.Node) {
    if (result.isError) {
      this.context.reportError(
        node,
        'strongly-typed-inject-component',
        {
          message: result.getMessage(),
        },
      );
    }
  }
}
