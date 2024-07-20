import type { TSESTree } from '@typescript-eslint/types';
import type { Context } from '../../dto/context';

type Report = {
  types?: string[];
  node?: TSESTree.Node;
};

export class ErrorReporter {
  constructor(private context: Context) { }

  public report({ types, node }: Report) {
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