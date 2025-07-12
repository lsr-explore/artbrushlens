import type { Preview } from "@storybook/react";

// Import CSS from all packages
import "../packages/palette-studio/src/index.css";
import "../packages/media-display/src/components/media-layout.css";

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
};

export default preview;
