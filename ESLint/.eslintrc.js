// "use strict";

// module.exports = {
//   root: true,
//   extends: [
//     "eslint:recommended",
//     "plugin:eslint-plugin/recommended",
//     "plugin:node/recommended",
//   ],
//   env: {
//     node: true,
//   },
//   overrides: [
//     {
//       files: ["tests/**/*.js"],
//       env: { mocha: true },
//     },
//   ],
// };

module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
    ecmaVersion: 'es2019',
  },
  plugins: ["@typescript-eslint", "dependency-checker"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  rules: {
    "dependency-checker/decoratorCheck": "error"
  }
};
