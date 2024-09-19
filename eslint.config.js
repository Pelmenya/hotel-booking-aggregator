// eslint.config.js
const { FlatCompat } = require('@eslint/eslintrc');
const tsParser = require("@typescript-eslint/parser");
const tsPlugin = require("@typescript-eslint/eslint-plugin");
const prettier = require("eslint-config-prettier");

const compat = new FlatCompat();

module.exports = [
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "tsconfig.json",
        tsconfigRootDir: __dirname,
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      "@typescript-eslint/interface-name-prefix": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "max-len": ["error", { code: 120, comments: 120 }],
      "quotes": ["error", "single"],
      "no-plusplus": ["error", { allowForLoopAfterthoughts: true }],
    },
  },
  {
    ignores: [".eslintrc.js"],
  },
  ...compat.extends("plugin:@typescript-eslint/recommended"),
  ...compat.extends("plugin:prettier/recommended"),
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
];
