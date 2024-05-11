import { unresolvedProviderDependencies } from './unresolvedProviderDependencies';

const plugin: any = {
  rules: {
    '@obsidian/unresolved-provider-dependencies': unresolvedProviderDependencies,
  },
};

export = plugin;