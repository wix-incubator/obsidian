import { ESLintUtils } from '@typescript-eslint/utils';
import { RuleModule } from '@typescript-eslint/utils/ts-eslint';
import { create } from './createFunction';

const createRule = ESLintUtils.RuleCreator(
  (name) => `https://wix-incubator.github.io/obsidian/docs/documentation/meta/eslint#${name}`,
);

export const unresolvedDependencies: RuleModule<'@obsidian/provider-unresolved-dependencies'> = createRule({
  create,
  name: '@obsidian/provider-unresolved-dependencies',
  meta: {
    docs: {
      description: 'Dependencies must be defined in the graph or its subgraphs.',
      recommended: 'strict',
    },
    messages: {
      '@obsidian/provider-unresolved-dependencies': 'Dependency {{ dependencyName }} is unresolved.',
    },
    schema: [],
    type: 'problem',
  },
  defaultOptions: [] as [],
});
