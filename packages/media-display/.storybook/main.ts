import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";

const config: StorybookConfig = {
	stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
	framework: {
		name: "@storybook/nextjs",
		options: {},
	},
	docs: {
		autodocs: "tag",
	},
	addons: [
		"@storybook/addon-a11y",
		"storbybook-addon-performance",
		"storyboook-addon-pseudo-states",
	],
	viteFinal: async (config) => {
		return mergeConfig(config, {
			define: {
				"process.env": {},
				process: {
					env: {},
				},
			},
		});
	},
};

export default config;
