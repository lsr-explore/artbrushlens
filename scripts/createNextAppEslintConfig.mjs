// Usage: import createNextAppEslintConfig from relative path
import { FlatCompat } from "@eslint/eslintrc";
import pkg from "@eslint/js";
import path from "path";
import { fileURLToPath } from "url";

const createNextAppEslintConfig = (importMetaUrl) => {
	const __filename = fileURLToPath(importMetaUrl);
	const __dirname = path.dirname(__filename);

	const compat = new FlatCompat({
		baseDirectory: __dirname,
		recommendedConfig: pkg.configs.recommended,
	});

	return [
		{
			ignores: ["node_modules/**", ".next/**", "dist/**"],
		},
		...compat.config({
			extends: [
				"next/core-web-vitals",
				"next/typescript",
				"plugin:@typescript-eslint/recommended",
				"plugin:react/recommended",
				"eslint:recommended",
			],
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
};

export default createNextAppEslintConfig;
