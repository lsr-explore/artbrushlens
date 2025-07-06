import { FlatCompat } from "@eslint/eslintrc";
import pkg from "@eslint/js"; // ✅

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: pkg.configs.recommended, // ✅ ESLint v9+
});

// Shared config: plain TypeScript packages (no React, no Next.js)
export const basePackageConfig = [
	{
		ignores: ["dist/**", "node_modules/**"],
	},
	...compat.extends(
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
	),
];

// Shared config: React packages (shared components, react-query-hooks, etc.)
export const baseReactPackageConfig = [
	{
		ignores: ["dist/**", "node_modules/**"],
	},
	...compat.extends(
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:react/recommended",
		"plugin:react-hooks/recommended",
	),
	{
		settings: {
			react: {
				version: "detect",
			},
		},
	},
];

// Shared config: Next.js apps
export const baseAppConfig = [
	...compat.config({
		settings: {
			react: {
				version: "detect",
			},
		},
		env: {
			browser: true,
			node: true,
		},
		parser: "@typescript-eslint/parser",
		parserOptions: {
			ecmaVersion: 2020,
			sourceType: "module",
		},
		plugins: ["@typescript-eslint"],
	}),
];
