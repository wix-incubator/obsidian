import { ESLintUtils, type TSESLint } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';
import { create } from './createRule';
import {Context} from '../../dto/context';

type Rule = TSESLint.RuleModule<'circular-dependencies', []>;

const createRule = ESLintUtils.RuleCreator(
  (name) => `https://wix-incubator.github.io/obsidian/docs/documentation/meta/eslint#${name}`,
);

export const circularDependenciesGenerator = () => {
  return createRule({
    create: (context: RuleContext<'circular-dependencies', []>) => {
      return create(new Context(context));
    },
    name: 'circular-dependencies',
    meta: {
      docs: {
        description: 'Dependencies must be defined in the graph or its subgraphs.',
        recommended: 'strict',
      },
      messages: {
        'circular-dependencies': 'Circular dependency detected starting from {{firstDependency}}: {{path}}',
      },
      schema: [],
      type: 'problem',
    },
    defaultOptions: [],
  }) satisfies Rule;
};