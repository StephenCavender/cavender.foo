import js from "@eslint/js";
import globals from "globals";
import eslintPluginAstro from "eslint-plugin-astro";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";

export default [
  // Plain JS: this config file plus scripts/*.js, all Node-side
  {
    files: ["**/*.js"],
    ignores: [".astro/**/*", "dist/**/*"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.node,
    },
    rules: js.configs.recommended.rules,
  },
  // TypeScript files configuration
  {
    files: ["**/*.ts", "**/*.tsx"],
    ignores: [".astro/**/*", "dist/**/*"],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: globals.node,
    },
    plugins: {
      "@typescript-eslint": tseslint,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      // More lenient rules for Astro projects
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-empty-object-type": "warn",
      "@typescript-eslint/triple-slash-reference": "off",
    },
  },
  // Astro configuration
  ...eslintPluginAstro.configs.recommended,
  // Accessibility rules for .astro templates (uses eslint-plugin-jsx-a11y under the hood)
  ...eslintPluginAstro.configs["jsx-a11y-recommended"],
  {
    files: ["**/*.astro"],
    languageOptions: {
      // Frontmatter runs on the server, <script> blocks run in the browser
      globals: { ...globals.node, ...globals.browser },
    },
    rules: {
      // override/add rules settings here, such as:
      // "astro/no-set-html-directive": "error"
    },
  },
  // Prettier last: disable stylistic rules that conflict, then report formatting
  // drift as a lint error so `bun run lint` and `bun run format:check` agree.
  prettierConfig,
  {
    // Only ts/js: prettier-plugin-astro (via `bun run format:check`) covers
    // .astro files. eslint-plugin-prettier's own parser can't handle TS
    // inside <script> blocks when mixed with the astro parser.
    files: ["**/*.ts", "**/*.tsx", "**/*.js"],
    ignores: [".astro/**/*", "dist/**/*", "**/*.astro/**"],
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      "prettier/prettier": "error",
    },
  },
];
