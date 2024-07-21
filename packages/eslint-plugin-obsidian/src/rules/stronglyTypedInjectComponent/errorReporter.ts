import type { TSESTree } from '@typescript-eslint/types';
import type { Context } from '../../dto/context';

export class ErrorReporter {
  constructor(private context: Context) { }

  public report(types?: string[], node?: TSESTree.Node) {
    if (types && node) {
      this.context.reportError(
        node,
        'strongly-typed-inject-component',
        {
          expectation: `injectedComponent<${types?.join(', ')}>`,
        },
      );
    }
  }
}