import { FlatCompat } from '@eslint/eslintrc';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
});

// Base config for packages
export const basePackageConfig = [
	{
		ignores: ['dist/**', 'node_modules/**'],
	},
	...compat.extends('next/typescript'),
];

// Base config for Next.js apps
export const baseAppConfig = [
	{
		ignores: ['dist/**', 'node_modules/**', '.next/**'],
	},
	...compat.extends('next/core-web-vitals', 'next/typescript'),
];
