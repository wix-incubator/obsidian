import type { TSESTree } from '@typescript-eslint/types';
import type { Context } from '../../dto/context';
import type { Type } from '../../dto/type';

export class ErrorReporter {
  constructor(private context: Context) { }

  public report(types?: Type, node?: TSESTree.Node) {
    if (types && node) {
      this.context.reportError(
        node,
        'strongly-typed-inject-component',
        {
          expectation: `injectComponent<${types.toString()}>`,
        },
      );
    }
  }
}