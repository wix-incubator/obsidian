const { unresolvedProviderDependencies } = require('./unresolvedProviderDependencies');

module.exports = {
  rules: {
    'unresolved-provider-dependencies': unresolvedProviderDependencies,
  },
};
