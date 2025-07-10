import type { Artwork } from "@artbrushlens/shared-types";
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { mockArtworks, mockPhotoArtworks } from "../__stories__/mock-data";
import {
	ArtworkPanelStory,
	PhotoPanelStory,
} from "../__stories__/story-components";
import { MediaLayout } from "./media-layout";

const meta: Meta<typeof MediaLayout> = {
	title: "Components/MediaLayout",
	component: MediaLayout,
	parameters: {
		layout: "fullscreen",
	},
	tags: ["autodocs"],
	argTypes: {
		artworks: {
			control: "object",
		},
		title: {
			control: "text",
		},
		subtitle: {
			control: "text",
		},
		emptyMessage: {
			control: "text",
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const WithArtworks: Story = {
	args: {
		artworks: mockArtworks,
		renderItem: (artwork: Artwork) => (
			<ArtworkPanelStory key={artwork.id} artwork={artwork} />
		),
		title: "Metropolitan Museum Collection",
		subtitle: "Discover and analyze beautiful artworks with AI",
	},
};

export const WithPhotos: Story = {
	args: {
		artworks: mockPhotoArtworks,
		renderItem: (artwork: Artwork) => (
			<PhotoPanelStory key={artwork.id} artwork={artwork} />
		),
		title: "Pexels Photo Collection",
		subtitle: "Explore stunning photography from around the world",
	},
};

export const EmptyState: Story = {
	args: {
		artworks: [],
		renderItem: () => <></>,
		title: "Empty Collection",
		subtitle: "No items to display",
		emptyMessage: "No artworks found. Try adjusting your search criteria.",
	},
};

export const WithCustomEmptyMessage: Story = {
	args: {
		artworks: [],
		renderItem: () => <></>,
		title: "Search Results",
		subtitle: "Your search returned no results",
		emptyMessage:
			"No items match your search criteria. Please try different keywords.",
	},
};

export const WithoutTitle: Story = {
	args: {
		artworks: mockArtworks.slice(0, 3),
		renderItem: (artwork: Artwork) => (
			<ArtworkPanelStory key={artwork.id} artwork={artwork} />
		),
	},
};

export const WithLongTitle: Story = {
	args: {
		artworks: mockArtworks,
		renderItem: (artwork: Artwork) => (
			<ArtworkPanelStory key={artwork.id} artwork={artwork} />
		),
		title:
			"This is a very long title that should demonstrate how the MediaLayout component handles long titles in the UI",
		subtitle:
			"This subtitle provides additional context about the collection and its purpose",
	},
};
