import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import stylistic from "@stylistic/eslint-plugin";
import react from "eslint-plugin-react";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import importNewlines from "eslint-plugin-import-newlines";
import unusedImports from "eslint-plugin-unused-imports";
import importPlugin from 'eslint-plugin-import';
import jestFormatting from "eslint-plugin-jest-formatting";
import obsidian from "eslint-plugin-obsidian";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import eslintTs from "typescript-eslint";
import eslintJs from "@eslint/js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default eslintTs.config(
  eslintJs.configs.recommended,
  ...eslintTs.configs.recommendedTypeChecked,
  ...compat.extends("plugin:import/typescript"),
  {
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
    plugins: {
      "@stylistic": fixupPluginRules(stylistic),
      react: fixupPluginRules(react),
      "@typescript-eslint": typescriptEslint,
      "import-newlines": importNewlines,
      // "import": fixupPluginRules(importPlugin),
      "unused-imports": unusedImports,
      "jest-formatting": fixupPluginRules(jestFormatting),
      obsidian,
    },
    rules: {
      "no-console": "off",
      "no-multi-spaces": "error",
      "obsidian/unresolved-provider-dependencies": "error",
      "obsidian/no-circular-dependencies": "warn",

      "obsidian/strongly-typed-inject-component": ["error", {
        injectedPropsPattern: "/\\b(Injected|InjectedProps)\\b/",
      }],

      "@stylistic/max-len": ["error", {
        code: 115,
        comments: 200,
        ignoreRegExpLiterals: true,
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

      "react/jsx-filename-extension": ["error", {
        extensions: [".js", ".ts", ".jsx", ".tsx"],
      }],

      "react/jsx-props-no-spreading": "off",
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

      "import-newlines/enforce": ["error", {
        items: 3,
        "max-len": 115,
        semi: false,
      }],

      "react/display-name": "off",
      "no-plusplus": "off",
      "@stylistic/no-trailing-spaces": "error",
      "no-shadow": "off",

      "@typescript-eslint/no-shadow": ["error", {
        allow: ["Graph"],
      }],

      "react/button-has-type": "off",
      "react/jsx-one-expression-per-line": ["off"],
      "arrow-body-style": ["off"],

      "@stylistic/quotes": ["error", "single", {
        avoidEscape: true,
        allowTemplateLiterals: true,
      }],

      "@typescript-eslint/lines-between-class-members": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "import/prefer-default-export": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error",

      "unused-imports/no-unused-vars": ["error", {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      }],

      "@typescript-eslint/ban-ts-comment": "off",
    }
  }
)

// [
//   {
//     name: "React Obsidian",
//     ignores: ["**/dist/*,", "**/wallaby.js"],
//     files: [
//       "src/**/*.ts",
//       "src/**/*.tsx",
//       "transformers/**/*.ts",
//       "test/**/*.ts",
//       "test/**/*.tsx"
//     ],
//   }, ...fixupConfigRules(compat.extends(
//     "plugin:react/recommended",
//     // "plugin:import/typescript",
//     "plugin:import/recommended",
//     "plugin:@stylistic/disable-legacy",
//     "plugin:jest-formatting/recommended",
//   )), {
//     plugins: {
//       "@stylistic": fixupPluginRules(stylistic),
//       react: fixupPluginRules(react),
//       "@typescript-eslint": typescriptEslint,
//       "import-newlines": importNewlines,
//       "unused-imports": unusedImports,
//       "jest-formatting": fixupPluginRules(jestFormatting),
//       obsidian,
//     },

//     languageOptions: {
//       globals: {
//         ...globals.jest,
//       },
//       parser: tsParser,
//       ecmaVersion: 5,
//       sourceType: "module",
//       parserOptions: {
//         project: "tsconfig.json",
//       },
//     },

//     settings: {
//       "import/resolver": {
//         node: {
//           extensions: [".js", ".jsx", ".ts", ".tsx"],
//         },
//       },
//       react: {
//         version: "detect",
//       },
//     },

//     rules: {
//       "no-console": "off",
//       "obsidian/unresolved-provider-dependencies": "error",
//       "obsidian/no-circular-dependencies": "warn",

//       "obsidian/strongly-typed-inject-component": ["error", {
//         injectedPropsPattern: "/\\b(Injected|InjectedProps)\\b/",
//       }],

//       "@stylistic/max-len": ["error", {
//         code: 115,
//         comments: 200,
//         ignoreRegExpLiterals: true,
//       }],

//       "@stylistic/no-extra-semi": "error",

//       "@stylistic/lines-between-class-members": ["error", "always", {
//         exceptAfterSingleLine: true,
//       }],

//       "import/extensions": "off",
//       "@typescript-eslint/no-non-null-assertion": "off",
//       "no-useless-constructor": "off",
//       "@stylistic/member-delimiter-style": "error",
//       "import/no-unresolved": "off",
//       "class-methods-use-this": "off",

//       "react/jsx-filename-extension": ["error", {
//         extensions: [".js", ".ts", ".jsx", ".tsx"],
//       }],

//       "react/jsx-props-no-spreading": "off",
//       "no-use-before-define": "off",
//       "@typescript-eslint/no-use-before-define": ["off"],
//       "no-restricted-syntax": "off",
//       "import/no-named-as-default": "off",
//       "@typescript-eslint/ban-types": ["off"],

//       "import/no-extraneous-dependencies": ["error", {
//         devDependencies: true,
//       }],

//       "max-classes-per-file": ["off"],
//       curly: ["error", "multi-line"],
//       "@stylistic/semi": ["error", "always"],
//       "@stylistic/comma-dangle": ["error", "always-multiline"],
//       "@stylistic/function-call-argument-newline": ["error", "consistent"],
//       "@stylistic/function-paren-newline": ["error", "multiline-arguments"],

//       "@stylistic/object-curly-newline": ["error", {
//         ObjectExpression: {
//           multiline: true,
//           consistent: true,
//         },

//         ObjectPattern: {
//           multiline: true,
//           consistent: true,
//         },
//       }],

//       "@stylistic/no-whitespace-before-property": "error",

//       "import-newlines/enforce": ["error", {
//         items: 3,
//         "max-len": 115,
//         semi: false,
//       }],

//       "react/display-name": "off",
//       "no-plusplus": "off",
//       "@stylistic/no-trailing-spaces": "error",
//       "no-shadow": "off",

//       "@typescript-eslint/no-shadow": ["error", {
//         allow: ["Graph"],
//       }],

//       "react/button-has-type": "off",
//       "react/jsx-one-expression-per-line": ["off"],
//       "arrow-body-style": ["off"],

//       "@stylistic/quotes": ["error", "single", {
//         avoidEscape: true,
//         allowTemplateLiterals: true,
//       }],

//       "@typescript-eslint/lines-between-class-members": "off",
//       "@typescript-eslint/no-explicit-any": "off",
//       "import/prefer-default-export": "off",
//       "@typescript-eslint/no-unused-vars": "off",
//       "unused-imports/no-unused-imports": "error",

//       "unused-imports/no-unused-vars": ["error", {
//         vars: "all",
//         varsIgnorePattern: "^_",
//         args: "after-used",
//         argsIgnorePattern: "^_",
//       }],

//       "@typescript-eslint/ban-ts-comment": "off",
//     },
//   }
// ];
