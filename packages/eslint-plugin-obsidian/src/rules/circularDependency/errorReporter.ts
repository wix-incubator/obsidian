import type { TSESTree } from '@typescript-eslint/types';
import type { Context } from '../../dto/context';

export class ErrorReporter {
  constructor(private context: Context) { }

  public report(
    { error, path, node }: { error: boolean; path?: string[]; node?: TSESTree.Node },
  ) {
    if (error && node && path) {
      this.context.reportError(
        node,
        'circular-dependencies',
        {
          firstDependency: path[0],
          path: path.join(' -> '),
        },
      );
    }
  }
}