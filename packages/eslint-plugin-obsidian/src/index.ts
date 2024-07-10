const { unresolvedProviderDependenciesGenerator } = require('./rules/unresolvedProviderDependencies');
const { noCircularDependenciesGenerator } = require('./rules/noCircularDependency');

module.exports = {
  rules: {
    'unresolved-provider-dependencies': unresolvedProviderDependenciesGenerator(),
    'no-circular-dependencies': noCircularDependenciesGenerator(),
  },
};
