/* eslint-disable @typescript-eslint/no-require-imports */
const { unresolvedProviderDependenciesGenerator } = require('./rules/unresolvedProviderDependencies') as typeof import('./rules/unresolvedProviderDependencies');
const { noCircularDependenciesGenerator } = require('./rules/noCircularDependency') as typeof import('./rules/noCircularDependency');
const { stronglyTypedInjectComponentGenerator } = require('./rules/stronglyTypedInjectComponent') as typeof import('./rules/stronglyTypedInjectComponent');

module.exports = {
  rules: {
    'unresolved-provider-dependencies': unresolvedProviderDependenciesGenerator(),
    'no-circular-dependencies': noCircularDependenciesGenerator(),
    'strongly-typed-inject-component': stronglyTypedInjectComponentGenerator(),
  },
};
