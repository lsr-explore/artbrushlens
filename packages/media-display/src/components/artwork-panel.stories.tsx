import { Artwork } from "@artbrushlens/shared-types";
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { mockArtworks } from "../__stories__/mock-data";
import { ArtworkPanel } from "./artwork-panel";

const ArtworkPanelStory = ({ artwork }: { artwork: Artwork }) => (
	<div style={{ maxWidth: 400 }}>
		<ArtworkPanel artwork={artwork} />
	</div>
);

const meta: Meta<typeof ArtworkPanel> = {
	title: "Components/ArtworkPanel",
	component: ArtworkPanel,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		artwork: {
			control: "object",
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		artwork: mockArtworks[0],
	},
};

export const WithLongTitle: Story = {
	args: {
		artwork: {
			...mockArtworks[0],
			title:
				"This is a very long artwork title that should demonstrate how the component handles text overflow and wrapping in the UI",
		},
	},
};

export const WithLongDescription: Story = {
	args: {
		artwork: {
			...mockArtworks[0],
			description:
				"This is a very long description that should demonstrate how the component handles text overflow and wrapping in the UI. It should show the line-clamp functionality working properly.",
		},
	},
};

export const WithoutImage: Story = {
	args: {
		artwork: {
			...mockArtworks[0],
			imageUrl: undefined,
		},
	},
};

export const WithoutArtist: Story = {
	args: {
		artwork: {
			...mockArtworks[0],
			artist: undefined,
		},
	},
};

export const WithoutDescription: Story = {
	args: {
		artwork: {
			...mockArtworks[0],
			description: undefined,
		},
	},
};

export const MultipleArtworks: Story = {
	render: () => (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
			{mockArtworks.slice(0, 3).map((artwork) => (
				<ArtworkPanelStory key={artwork.id} artwork={artwork} />
			))}
		</div>
	),
};
