const { unresolvedProviderDependenciesGenerator } = require('./unresolvedProviderDependencies');

module.exports = {
  rules: {
    'unresolved-provider-dependencies': unresolvedProviderDependenciesGenerator(),
  },
};
