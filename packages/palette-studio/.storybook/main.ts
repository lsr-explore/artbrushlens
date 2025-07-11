import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
	stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
	framework: {
		name: "@storybook/nextjs",
		options: {},
	},
	addons: [
		"@storybook/addon-a11y",
		"storbybook-addon-performance",
		"storyboook-addon-pseudo-states",
	],
};
export default config;
