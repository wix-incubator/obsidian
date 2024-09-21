import stylistic from "@stylistic/eslint-plugin";
import eslintTs from "typescript-eslint";
import eslintJs from "@eslint/js";
import eslintJest from "eslint-plugin-jest";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";

export default eslintTs.config(
  {
    ignores: ["**/*.d.ts", "**/*.js"],
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    name: "EslintPluginObsidian",
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
    },
    extends: [
      eslintJs.configs.recommended,
      ...eslintTs.configs.recommendedTypeChecked,
      eslintJest.configs['flat/recommended'],
      stylistic.configs["recommended-flat"],
    ],
    rules: {
      "no-console": "off",
      "no-empty-function": ["error", {
        allow: ["constructors"],
      }],

      "no-multi-spaces": "error",

      "no-multiple-empty-lines": ["error", {
        max: 1,
      }],

      "@stylistic/max-len": ["error", {
        code: 115,
        comments: 200,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      }],

      "@stylistic/no-extra-semi": "error",

      "@stylistic/lines-between-class-members": ["error", "always", {
        exceptAfterSingleLine: true,
      }],

      "import/extensions": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "no-useless-constructor": "off",
      "@stylistic/member-delimiter-style": "error",
      "import/no-unresolved": "off",
      "class-methods-use-this": "off",
      "no-use-before-define": "off",
      "@typescript-eslint/no-use-before-define": ["off"],
      "no-restricted-syntax": "off",
      "import/no-named-as-default": "off",
      "@typescript-eslint/ban-types": ["off"],

      // "import/no-extraneous-dependencies": ["error", {
      //   devDependencies: true,
      // }],

      "max-classes-per-file": ["off"],
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

      // "import-newlines/enforce": ["error", {
      //   items: 3,
      //   "max-len": 115,
      //   semi: false,
      // }],

      "no-plusplus": "off",
      "@stylistic/no-trailing-spaces": "error",
      "no-shadow": "off",

      "@typescript-eslint/no-shadow": ["error", {
        allow: ["Graph"],
      }],

      "arrow-body-style": ["off"],
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

      "@typescript-eslint/lines-between-class-members": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-require-imports": ["error", {
        allow: ["path"]
      }],
      "import/prefer-default-export": "off",
      "@typescript-eslint/no-unused-vars": "off",
      // "unused-imports/no-unused-imports": "error",

      // "unused-imports/no-unused-vars": ["error", {
      //   vars: "all",
      //   varsIgnorePattern: "^_",
      //   args: "after-used",
      //   argsIgnorePattern: "^_",
      // }],

      "@typescript-eslint/ban-ts-comment": "off",
    },
  }
);
