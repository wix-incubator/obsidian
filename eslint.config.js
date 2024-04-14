"use strict";

const obsidianEslintPlugin = require('./eslint/obsidian-eslint-plugin');

module.exports = [
  {
    files: ['**/*.ts'],
    plugins: {
      'plugin:@obsidian/recommended': obsidianEslintPlugin,
      rules: {
        "@obsidian/eslint-plugin-unresolved-dependencies": "error",
      }
    }
  }
]