import type { Artwork } from "@artbrushlens/shared-types";
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { mockArtworks, mockPhotoArtworks } from "../__stories__/mock-data";
import { MediaArtContainer } from "./media-art-container";

const meta: Meta<typeof MediaArtContainer> = {
	title: "Components/MediaArtContainer",
	component: MediaArtContainer,
	parameters: {
		layout: "fullscreen",
	},
	tags: ["autodocs"],
	decorators: [
		(Story) => (
			<div className="min-h-screen bg-gray-50">
				<Story />
			</div>
		),
	],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const WithArtworks: Story = {
	args: {
		data: {
			total: mockArtworks.length,
			artworks: mockArtworks,
			mock: true,
		},
		source: "paintings",
		isLoading: false,
		error: null,
	},
};

export const WithPhotos: Story = {
	args: {
		data: {
			total: mockPhotoArtworks.length,
			artworks: mockPhotoArtworks,
			mock: true,
		},
		source: "photos",
		isLoading: false,
		error: null,
	},
};

export const Loading: Story = {
	args: {
		data: undefined,
		source: "paintings",
		isLoading: true,
		error: null,
	},
};

export const ErrorState: Story = {
	args: {
		data: undefined,
		source: "paintings",
		isLoading: false,
		error: new Error("Failed to load artworks"),
	},
};

export const Empty: Story = {
	args: {
		data: {
			total: 0,
			artworks: [],
			mock: true,
		},
		source: "paintings",
		isLoading: false,
		error: null,
	},
};
