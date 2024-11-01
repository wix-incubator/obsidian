import type { TSESTree } from '@typescript-eslint/types';
import type { Context } from '../../dto/context';

export function reportErrorIfDependencyIsUnresolved(
  context: Context,
  { error, param, node }: { error: boolean; param?: string; node?: TSESTree.Node },
) {
  if (error && node) {
    context.reportError(node, 'unresolved-provider-dependencies', { dependencyName: param });
  }
}
