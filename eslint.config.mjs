import js from "@eslint/js";
import pluginNext from "@next/eslint-plugin-next";
import pluginCypress from "eslint-plugin-cypress";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import path from "path";
import tseslint from "typescript-eslint";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default [
	// Base JS config
	{
		files: ["**/*.{js,jsx,cjs,mjs}"],
		languageOptions: {
			ecmaVersion: 2022,
			sourceType: "module",
		},
		plugins: {
			react: pluginReact,
			"react-hooks": pluginReactHooks,
		},
		rules: {
			...js.configs.recommended.rules,
			...pluginReact.configs.recommended.rules,
			...pluginReactHooks.configs.recommended.rules,
		},
		settings: {
			react: {
				version: "detect",
			},
		},
	},

	// TypeScript config for packages and apps
	{
		files: ["apps/**/*.{ts,tsx}"],
		languageOptions: {
			parser: tseslint.parser,
			parserOptions: {
				project: path.resolve(__dirname, "tsconfig.apps.eslint.json"),
				tsconfigRootDir: __dirname,
			},
		},
		plugins: {
			"@typescript-eslint": tseslint.plugin,
			react: pluginReact,
			"react-hooks": pluginReactHooks,
		},
		rules: {
			...tseslint.configs.recommendedTypeChecked[1].rules,
			...pluginReact.configs.recommended.rules,
			...pluginReactHooks.configs.recommended.rules,
		},
		settings: {
			react: {
				version: "detect",
			},
		},
	},

	{
		files: ["packages/**/*.{ts,tsx}"],
		languageOptions: {
			parser: tseslint.parser,
			parserOptions: {
				project: path.resolve(__dirname, "tsconfig.packages.eslint.json"),
				tsconfigRootDir: __dirname,
			},
		},
		plugins: {
			"@typescript-eslint": tseslint.plugin,
			react: pluginReact,
			"react-hooks": pluginReactHooks,
		},
		rules: {
			...tseslint.configs.recommendedTypeChecked[1].rules,
			...pluginReact.configs.recommended.rules,
			...pluginReactHooks.configs.recommended.rules,
		},
		settings: {
			react: {
				version: "detect",
			},
		},
	},

	// Next.js config for apps
	{
		files: ["apps/**/*.{ts,tsx}"],
		plugins: {
			"@next/next": pluginNext,
		},
		rules: {
			...pluginNext.configs["core-web-vitals"].rules,
		},
	},

	// Cypress config
	{
		files: ["**/*.cy.{js,ts,jsx,tsx}", "cypress/**/*.{js,ts}"],
		plugins: {
			cypress: pluginCypress,
		},
		languageOptions: {
			globals: pluginCypress.configs.recommended.languageOptions.globals,
		},
		rules: {
			...pluginCypress.configs.recommended.rules,
		},
	},

	// Ignored folders
	{
		ignores: [
			"**/node_modules/**",
			"**/.next/**",
			"**/dist/**",
			"**/.turbo/**",
			"**/coverage/**",
			"**/*.d.ts",
			"**/*.js",
		],
	},
];
