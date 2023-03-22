const eslintOptions = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    project: "./tsconfig.json",
  }
};
module.exports = { eslintOptions };
