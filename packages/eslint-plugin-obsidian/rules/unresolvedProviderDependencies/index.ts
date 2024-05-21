import { ESLintUtils, type TSESLint } from '@typescript-eslint/utils';
import { create } from './createFunction';

const createRule = ESLintUtils.RuleCreator(
  (name) => `https://wix-incubator.github.io/obsidian/docs/documentation/meta/eslint#${name}`,
);

type Rule = TSESLint.RuleModule<'unresolved-provider-dependencies', []>;


export const unresolvedProviderDependencies: Rule = createRule({
  create,
  name: 'unresolved-provider-dependencies',
  meta: {
    docs: {
      description: 'Dependencies must be defined in the graph or its subgraphs.',
      recommended: 'strict',
    },
    messages: {
      'unresolved-provider-dependencies': 'Dependency {{ dependencyName }} is unresolved.',
    },
    schema: [],
    type: 'problem',
  },
  defaultOptions: [],
});
