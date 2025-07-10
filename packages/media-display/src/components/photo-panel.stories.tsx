import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { mockPhotoArtworks } from "../__stories__/mock-data";
import { PhotoPanelStory } from "../__stories__/story-components";

const meta: Meta<typeof PhotoPanelStory> = {
	title: "Components/PhotoPanel",
	component: PhotoPanelStory,
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
		artwork: mockPhotoArtworks[0],
	},
};

export const WithLongTitle: Story = {
	args: {
		artwork: {
			...mockPhotoArtworks[0],
			title:
				"This is a very long photo title that should demonstrate how the component handles text overflow and wrapping in the UI",
		},
	},
};

export const WithLongDescription: Story = {
	args: {
		artwork: {
			...mockPhotoArtworks[0],
			description:
				"This is a very long description that should demonstrate how the component handles text overflow and wrapping in the UI. It should show the line-clamp functionality working properly.",
		},
	},
};

export const WithoutImage: Story = {
	args: {
		artwork: {
			...mockPhotoArtworks[0],
			imageUrl: undefined,
		},
	},
};

export const WithoutArtist: Story = {
	args: {
		artwork: {
			...mockPhotoArtworks[0],
			artist: undefined,
		},
	},
};

export const WithoutDescription: Story = {
	args: {
		artwork: {
			...mockPhotoArtworks[0],
			description: undefined,
		},
	},
};

export const MultiplePhotos: Story = {
	render: () => (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
			{mockPhotoArtworks.map((artwork) => (
				<PhotoPanelStory key={artwork.id} artwork={artwork} />
			))}
		</div>
	),
};
