import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import turboPlugin from "eslint-plugin-turbo";
import tseslint from "typescript-eslint";
import perfectionist from "eslint-plugin-perfectionist";

/* @type {import("eslint").Linter.Config} */
export const config = tseslint.config(
  js.configs.recommended,
  tseslint.configs.recommended,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  eslintConfigPrettier,
  {
    plugins: {
      turbo: turboPlugin,
    },
    rules: {
      "turbo/no-undeclared-env-vars": "warn",
    },
  },
  perfectionist.configs["recommended-natural"],
  {
    ignores: ["dist/**", "eslint.config.{mjs,cjs}"],
  }
);
