const {create} = require('./dist/eslint/create-func')

module.exports = {
  'defined-dependencies': {
    meta: {
      docs: {
        description:
          'The dependency must be defined',
        recommended: 'error',
      },
      messages: {
        dependencyUndefined: 'Dependency {{ dependencyName }} is undefined',
      },
    },
    create
  },
};
