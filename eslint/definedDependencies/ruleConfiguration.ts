import { create } from './createFunction';

export const definedDependencies = {
  meta: {
    docs: {
      description: 'The dependency must be defined',
      recommended: 'error',
    },
    messages: {
      dependencyUndefined: 'Dependency {{ dependencyName }} is undefined',
    },
  },
  create,
};
