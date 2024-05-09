import { unresolvedProviderDependencies } from './unresolvedProviderDependencies';

const plugin = {
  rules: {
    '@obsidian/unresolved-provider-dependencies': unresolvedProviderDependencies,
  },
};

export = plugin;