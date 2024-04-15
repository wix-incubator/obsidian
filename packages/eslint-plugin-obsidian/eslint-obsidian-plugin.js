const {unresolvedDependencies} = require('./unresolvedDependencies/ruleConfiguration.ts');

const plugin = {
  rules: {
    '@obsidian/unresolved-dependencies': unresolvedDependencies,
  },
};
module.exports = plugin;
