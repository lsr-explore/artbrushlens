import { baseAppConfig } from '../../eslint.config.base.mjs';

const config = [
	...baseAppConfig,
	{
		files: ['**/*.config.js', 'jest.config.js'],
		rules: {
			'@typescript-eslint/no-require-imports': 'off',
		},
	},
];

export default config;
