import type { StorybookConfig } from "@storybook/react-vite";
import { resolve } from "path";
import { mergeConfig } from "vite";

const config: StorybookConfig = {
	stories: [
		"../packages/palette-studio/src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
		"../packages/media-display/src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
	],
	framework: {
		name: "@storybook/nextjs",
		options: {},
	},
	docs: {
		autodocs: "tag",
	},
	typescript: {
		check: false,
		reactDocgen: "react-docgen-typescript",
	},
	addons: [
		"@storybook/addon-a11y",
		"storbybook-addon-performance",
		"storyboook-addon-pseudo-states",
	],
	viteFinal: async (config) => {
		return mergeConfig(config, {
			define: {
				process: {
					env: {
						NODE_ENV: JSON.stringify("development"),
					},
				},
			},
			resolve: {
				alias: {
					"@artbrushlens/palette-studio": resolve(
						__dirname,
						"../packages/palette-studio/src",
					),
					"@artbrushlens/media-display": resolve(
						__dirname,
						"../packages/media-display/src",
					),
					"@artbrushlens/shared-types": resolve(
						__dirname,
						"../packages/shared-types/src",
					),
					"@artbrushlens/api-fetchers": resolve(
						__dirname,
						"../packages/api-fetchers/src",
					),
					"@artbrushlens/api-handlers": resolve(
						__dirname,
						"../packages/api-handlers/src",
					),
					"@artbrushlens/react-query-hooks": resolve(
						__dirname,
						"../packages/react-query-hooks/src",
					),
				},
			},
		});
	},
};

export default config;
