import { ESLintUtils, type TSESLint } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';
import { create } from './createRule';
import { PathResolver } from '../../framework/pathResolver';
import { FileReader } from '../../framework/fileReader';
import { Context } from '../../dto/context';

type Rule = TSESLint.RuleModule<'unresolved-provider-dependencies', []>;

const createRule = ESLintUtils.RuleCreator(
  name => `https://wix-incubator.github.io/obsidian/docs/documentation/meta/eslint#${name}`,
);

export const unresolvedProviderDependenciesGenerator = (
  pathResolver: PathResolver = new PathResolver(),
) => {
  return createRule({
    create: (context: RuleContext<'unresolved-provider-dependencies', []>) => {
      return create(new Context(context), new FileReader(pathResolver));
    },
    name: 'unresolved-provider-dependencies',
    meta: {
      docs: {
        description: 'Dependencies must be defined in the graph or its subgraphs.',
      },
      messages: {
        'unresolved-provider-dependencies': 'Dependency {{ dependencyName }} is unresolved.',
      },
      schema: [],
      type: 'problem',
    },
    defaultOptions: [],
  }) satisfies Rule;
};
