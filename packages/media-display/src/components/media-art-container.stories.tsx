import type { Artwork } from "@artbrushlens/shared-types";
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { mockArtworks, mockPhotoArtworks } from "../__stories__/mock-data";
import { MediaSourceContext } from "../media-source-context";
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

const createMockContext = (data: {
	total: number;
	artworks: Artwork[];
	mock?: boolean;
}) => ({
	source: "paintings" as const,
	data,
	isLoading: false,
	error: null,
});

export const WithArtworks: Story = {
	decorators: [
		(Story) => (
			<MediaSourceContext.Provider
				value={createMockContext({
					total: mockArtworks.length,
					artworks: mockArtworks,
					mock: true,
				})}
			>
				<Story />
			</MediaSourceContext.Provider>
		),
	],
};

export const WithPhotos: Story = {
	decorators: [
		(Story) => (
			<MediaSourceContext.Provider
				value={createMockContext({
					total: mockPhotoArtworks.length,
					artworks: mockPhotoArtworks,
					mock: true,
				})}
			>
				<Story />
			</MediaSourceContext.Provider>
		),
	],
};

export const Loading: Story = {
	decorators: [
		(Story) => (
			<MediaSourceContext.Provider
				value={{
					source: "paintings" as const,
					data: undefined,
					isLoading: true,
					error: null,
				}}
			>
				<Story />
			</MediaSourceContext.Provider>
		),
	],
};

export const ErrorState: Story = {
	decorators: [
		(Story) => (
			<MediaSourceContext.Provider
				value={{
					source: "paintings" as const,
					data: undefined,
					isLoading: false,
					error: new Error("Failed to load artworks") as Error,
				}}
			>
				<Story />
			</MediaSourceContext.Provider>
		),
	],
};

export const Empty: Story = {
	decorators: [
		(Story) => (
			<MediaSourceContext.Provider
				value={createMockContext({
					total: 0,
					artworks: [],
					mock: true,
				})}
			>
				<Story />
			</MediaSourceContext.Provider>
		),
	],
};
