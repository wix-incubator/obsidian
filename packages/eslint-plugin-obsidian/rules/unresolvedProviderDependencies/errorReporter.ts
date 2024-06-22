import type { TSESTree } from '@typescript-eslint/types';
import type { Context } from './types';

export function reportErrorIfDependencyIsUnresolved(
  context: Context,
  {error, param, node}: {error: boolean; param?: string; node?: TSESTree.Node},
) {
  if (error) {
    context.report({
      node: node!,
      // node: clazz.node,
      messageId: 'unresolved-provider-dependencies',
      data: {
        dependencyName: param,
      },
    });
  }
}