const { unresolvedProviderDependenciesGenerator } = require('./rules/unresolvedProviderDependencies');

module.exports = {
  rules: {
    'unresolved-provider-dependencies': unresolvedProviderDependenciesGenerator(),
  },
};
