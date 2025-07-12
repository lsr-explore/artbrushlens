import type { Decorator, Preview } from "@storybook/react";
import "../src/components/media-layout.css";

// Optional: mock `next/image` to render as <img /> in Storybook
import * as NextImage from "next/image";
import React from "react";

// This mock helps avoid SSR/Image optimization issues in Storybook
Object.defineProperty(NextImage, "default", {
	configurable: true,
	value: (properties: any) => {
		return <img {...properties} alt={properties.alt || ""} />;
	},
});

export const decorators: Decorator[] = [
	(Story) => (
		// <QueryClientProvider client={queryClient}>
		<div className="p-4">
			<Story />
		</div>
		// </QueryClientProvider>
	),
];

// Optional: You can add global decorators here for layout or providers
// For example, if you use React Query or ThemeProvider

const preview: Preview = {
	decorators,
	parameters: {
		layout: "centered", // "padded" | "fullscreen" | "centered"
		backgrounds: {
			default: "light",
			values: [
				{ name: "light", value: "#ffffff" },
				{ name: "dark", value: "#1a1a1a" },
			],
		},
	},
};

export default preview;
