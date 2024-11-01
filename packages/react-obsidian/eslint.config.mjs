import stylistic from "@stylistic/eslint-plugin";
import eslintJest from "eslint-plugin-jest";
import obsidian from "eslint-plugin-obsidian";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import eslintTs from "typescript-eslint";
import eslintJs from "@eslint/js";


export default eslintTs.config(
  {
    ignores: ["**/*.d.ts", "**/*.js"],
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    name: "ReactObsidian",
    languageOptions: {
      globals: {
        ...globals.jest,
      },
      sourceType: "module",
      parser: tsParser,
      parserOptions: {
        project: "tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
      react: {
        version: "detect",
      },
    },
    extends: [
      eslintJs.configs.recommended,
      ...eslintTs.configs.recommendedTypeChecked,
      eslintJest.configs['flat/recommended'],
      stylistic.configs["recommended-flat"],
    ],
    plugins: {
      obsidian,
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unsafe-return": "off",
      "@typescript-eslint/no-unsafe-function-type": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/unbound-method": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          "args": "all",
          "argsIgnorePattern": "^_",
          "caughtErrors": "all",
          "caughtErrorsIgnorePattern": "^_",
          "destructuredArrayIgnorePattern": "^_",
          "varsIgnorePattern": "^_",
          "ignoreRestSiblings": true
        }
      ],
      "no-empty-function": ["error", {
        allow: ["constructors"],
      }],
      "no-multiple-empty-lines": ["error", {
        max: 1,
      }],
      "no-multi-spaces": "error",
      "@stylistic/brace-style": ["error", "1tbs", { allowSingleLine: true }],
      "@stylistic/jsx-one-expression-per-line": ["error", {
        "allow": "non-jsx"
      }],
      "@stylistic/max-len": ["error", {
        code: 115,
        comments: 200,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      }],
      "@stylistic/max-statements-per-line": ["error", { "max": 2 }],
      "@stylistic/no-extra-semi": "error",
      "@stylistic/operator-linebreak": ["error", "before", { "overrides": { "?": "after", ":": "after" } }],
      "@stylistic/lines-between-class-members": ["error", "always", {
        exceptAfterSingleLine: true,
      }],
      "lines-between-class-members": ["error", {
        enforce: [
          { blankLine: "always", prev: "method", next: "method" },
          { blankLine: "never", prev: "field", next: "field" },
        ]
      }],
      curly: ["error", "multi-line"],
      "@stylistic/semi": ["error", "always"],
      "@stylistic/comma-dangle": ["error", "always-multiline"],
      "@stylistic/function-call-argument-newline": ["error", "consistent"],
      "@stylistic/function-paren-newline": ["error", "multiline-arguments"],

      "@stylistic/object-curly-newline": ["error", {
        ObjectExpression: {
          multiline: true,
          consistent: true,
        },

        ObjectPattern: {
          multiline: true,
          consistent: true,
        },
      }],

      "@stylistic/no-whitespace-before-property": "error",
      "@stylistic/no-trailing-spaces": "error",
      "@stylistic/member-delimiter-style": ["error", {
        "multiline": {
          "delimiter": "semi",
          "requireLast": true
        },
        "singleline": {
          "delimiter": "semi",
          "requireLast": false
        },
        "multilineDetection": "brackets"
      }],
      "@stylistic/quotes": ["error", "single", {
        avoidEscape: true,
        allowTemplateLiterals: true,
      }],
      "@typescript-eslint/no-base-to-string": "off",
      "obsidian/unresolved-provider-dependencies": "error",
      "obsidian/no-circular-dependencies": "error",
      "obsidian/strongly-typed-inject-component": "error",
    },
  }
);
