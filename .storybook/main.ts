import type { StorybookConfig } from "@storybook/react-vite";
import { resolve } from "path";

const config: StorybookConfig = {
	stories: [
		"../packages/palette-studio/src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
		"../packages/media-display/src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
		// Future: "../apps/main/src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
		// Future: "../apps/admin/src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
	],
	addons: [
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		"@storybook/addon-interactions",
	],
	framework: {
		name: "@storybook/react-vite",
		options: {},
	},
	docs: {
		autodocs: "tag",
	},
	typescript: {
		check: false,
		reactDocgen: "react-docgen-typescript",
	},
	viteFinal: async (config) => {
		// Add alias for package imports
		if (config.resolve) {
			config.resolve.alias = {
				...config.resolve.alias,
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
			};
		}
		return config;
	},
};

export default config;
