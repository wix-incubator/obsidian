const { unresolvedProviderDependenciesGenerator } = require('./rules/unresolvedProviderDependencies');
const { noCircularDependenciesGenerator } = require('./rules/noCircularDependency');
const { stronglyTypedInjectComponentGenerator } = require('./rules/stronglyTypedInjectComponent');

module.exports = {
  rules: {
    'unresolved-provider-dependencies': unresolvedProviderDependenciesGenerator(),
    'no-circular-dependencies': noCircularDependenciesGenerator(),
    'strongly-typed-inject-component': stronglyTypedInjectComponentGenerator(),
  },
};
