import type { TSESTree } from '@typescript-eslint/types';
import type { Context } from '../../dto/context';

type Report = {
  isError: boolean;
  path?: string[];
  node?: TSESTree.Node;
};

export class ErrorReporter {
  constructor(private context: Context) { }

  public report({ isError, path, node }: Report) {
    if (isError && path && node) {
      this.context.reportError(
        node,
        'no-circular-dependencies',
        {
          firstDependency: path[0],
          path: path.join(' -> '),
        },
      );
    }
  }
}
