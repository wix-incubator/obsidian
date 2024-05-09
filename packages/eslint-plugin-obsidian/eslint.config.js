// @ts-check

const obsidianEslintPlugin = require('./eslint-plugin-obsidian.js');

module.exports = [
  {
    files: ['**/*.ts'],
    plugins: {
      'plugin:@obsidian/recommended': obsidianEslintPlugin,
    },
    rules: {
      "@obsidian/provider-unresolved-dependencies": "error",
    }
  }
]