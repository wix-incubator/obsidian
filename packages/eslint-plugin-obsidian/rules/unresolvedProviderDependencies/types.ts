import type { TSESTree } from '@typescript-eslint/types';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

export type Context = RuleContext<'unresolved-provider-dependencies', []>;

export type ArrayExpressionElement = TSESTree.ArrayExpression['elements'][number];
