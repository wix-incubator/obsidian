import { ESLintUtils } from '@typescript-eslint/utils';
import { RuleModule } from '@typescript-eslint/utils/ts-eslint';
import { create } from './createFunction';

const createRule = ESLintUtils.RuleCreator(
  (name) => `https://example.com/rule/${name}`,
);

export const undefinedDependencies: RuleModule<'undefinedDependency'> = createRule({
  create,
  name: 'undefined-dependency',
  meta: {
    docs: {
      description: 'The dependency must be defined',
      recommended: 'strict',
    },
    messages: {
      undefinedDependency: 'Dependency {{ dependencyName }} is undefined',
    },
    schema: [],
    type: 'problem',
  },
  defaultOptions: [] as [],
});

// export const definedDependencies = {
//   meta: {
//     docs: {
//       description: 'The dependency must be defined',
//       recommended: 'error',
//     },
//     messages: {
//       dependencyUndefined: 'Dependency {{ dependencyName }} is undefined',
//     },
//   },
//   create,
// };
