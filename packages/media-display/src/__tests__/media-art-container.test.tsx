import { render, screen } from "@testing-library/react";
import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import "@testing-library/jest-dom";
import type { Artwork } from "@artbrushlens/shared-types";
import { MediaArtContainer } from "../components/media-art-container";

// Mock the media source hook
const mockUseMediaSource = vi.fn();
vi.mock("../media-source-hook", () => ({
	useMediaSource: () => mockUseMediaSource(),
}));

// Mock the components
vi.mock("../components/artwork-panel", () => ({
	ArtworkPanel: ({ artwork }: { artwork: Artwork }) => (
		<div data-testid={`artwork-panel-${artwork.id}`}>
			<h3>{artwork.title}</h3>
			<p>{artwork.artist}</p>
		</div>
	),
}));

vi.mock("../components/photo-panel", () => ({
	PhotoPanel: ({ artwork }: { artwork: Artwork }) => (
		<div data-testid={`photo-panel-${artwork.id}`}>
			<h3>{artwork.title}</h3>
			<p>{artwork.artist}</p>
		</div>
	),
}));

vi.mock("../components/media-layout", () => ({
	MediaLayout: ({
		artworks,
		renderItem,
		title,
		subtitle,
	}: {
		artworks: Artwork[];
		renderItem: (artwork: Artwork) => React.ReactElement;
		title: string;
		subtitle: string;
	}) => (
		<div data-testid="media-layout">
			<h1>{title}</h1>
			<p>{subtitle}</p>
			<div data-testid="artworks-container">
				{artworks.map((artwork: Artwork) => renderItem(artwork))}
			</div>
		</div>
	),
}));

const mockArtworks: Artwork[] = [
	{
		id: "artwork-1",
		title: "Test Artwork 1",
		artist: "Test Artist 1",
		imageUrl: "https://example.com/artwork1.jpg",
		description: "Test description 1",
	},
	{
		id: "artwork-2",
		title: "Test Artwork 2",
		artist: "Test Artist 2",
		imageUrl: "https://example.com/artwork2.jpg",
		description: "Test description 2",
	},
];

describe("MediaArtContainer", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("should render loading state", () => {
		mockUseMediaSource.mockReturnValue({
			data: undefined,
			isLoading: true,
			error: undefined,
			source: "paintings",
		});

		render(<MediaArtContainer />);

		expect(screen.getByText("Loading...")).toBeInTheDocument();
	});

	it("should render error state", () => {
		const mockError = new Error("Test error message");
		mockUseMediaSource.mockReturnValue({
			data: undefined,
			isLoading: false,
			error: mockError,
			source: "paintings",
		});

		render(<MediaArtContainer />);

		expect(screen.getByText("Error: Test error message")).toBeInTheDocument();
		expect(screen.getByText("Error: Test error message")).toHaveClass(
			"p-6",
			"text-center",
			"text-red-600",
		);
	});

	it("should render no results state when data is undefined", () => {
		mockUseMediaSource.mockReturnValue({
			data: undefined,
			isLoading: false,
			error: undefined,
			source: "paintings",
		});

		render(<MediaArtContainer />);

		expect(screen.getByText("No results found.")).toBeInTheDocument();
	});

	it("should render no results state when artworks array is empty", () => {
		mockUseMediaSource.mockReturnValue({
			data: { artworks: [], total: 0 },
			isLoading: false,
			error: undefined,
			source: "paintings",
		});

		render(<MediaArtContainer />);

		expect(screen.getByText("No results found.")).toBeInTheDocument();
	});

	it("should render paintings with correct title and artwork panels", () => {
		mockUseMediaSource.mockReturnValue({
			data: { artworks: mockArtworks, total: 2 },
			isLoading: false,
			error: undefined,
			source: "paintings",
		});

		render(<MediaArtContainer />);

		expect(
			screen.getByText("Metropolitan Museum of Art Collection"),
		).toBeInTheDocument();
		expect(
			screen.getByText("Discover and analyze beautiful imagery with AI"),
		).toBeInTheDocument();
		expect(screen.getByTestId("artwork-panel-artwork-1")).toBeInTheDocument();
		expect(screen.getByTestId("artwork-panel-artwork-2")).toBeInTheDocument();
		expect(screen.getByText("Test Artwork 1")).toBeInTheDocument();
		expect(screen.getByText("Test Artist 1")).toBeInTheDocument();
	});

	it("should render photos with correct title and photo panels", () => {
		mockUseMediaSource.mockReturnValue({
			data: { artworks: mockArtworks, total: 2 },
			isLoading: false,
			error: undefined,
			source: "photos",
		});

		render(<MediaArtContainer />);

		expect(screen.getByText("Pexels Photo Collection")).toBeInTheDocument();
		expect(
			screen.getByText("Discover and analyze beautiful imagery with AI"),
		).toBeInTheDocument();
		expect(screen.getByTestId("photo-panel-artwork-1")).toBeInTheDocument();
		expect(screen.getByTestId("photo-panel-artwork-2")).toBeInTheDocument();
		expect(screen.getByText("Test Artwork 1")).toBeInTheDocument();
		expect(screen.getByText("Test Artist 1")).toBeInTheDocument();
	});

	it("should pass correct props to MediaLayout", () => {
		mockUseMediaSource.mockReturnValue({
			data: { artworks: mockArtworks, total: 2 },
			isLoading: false,
			error: undefined,
			source: "paintings",
		});

		render(<MediaArtContainer />);

		expect(screen.getByTestId("media-layout")).toBeInTheDocument();
		expect(screen.getByTestId("artworks-container")).toBeInTheDocument();
	});

	it("should handle artworks with missing optional fields", () => {
		const minimalArtworks: Artwork[] = [
			{
				id: "minimal-1",
				title: "Minimal Artwork",
			},
		];

		mockUseMediaSource.mockReturnValue({
			data: { artworks: minimalArtworks, total: 1 },
			isLoading: false,
			error: undefined,
			source: "paintings",
		});

		render(<MediaArtContainer />);

		expect(screen.getByText("Minimal Artwork")).toBeInTheDocument();
		expect(screen.getByTestId("artwork-panel-minimal-1")).toBeInTheDocument();
	});

	it("should handle multiple artworks correctly", () => {
		const multipleArtworks: Artwork[] = [
			...mockArtworks,
			{
				id: "artwork-3",
				title: "Test Artwork 3",
				artist: "Test Artist 3",
				imageUrl: "https://example.com/artwork3.jpg",
				description: "Test description 3",
			},
		];

		mockUseMediaSource.mockReturnValue({
			data: { artworks: multipleArtworks, total: 3 },
			isLoading: false,
			error: undefined,
			source: "paintings",
		});

		render(<MediaArtContainer />);

		expect(screen.getByTestId("artwork-panel-artwork-1")).toBeInTheDocument();
		expect(screen.getByTestId("artwork-panel-artwork-2")).toBeInTheDocument();
		expect(screen.getByTestId("artwork-panel-artwork-3")).toBeInTheDocument();
	});

	it("should have correct loading message styling", () => {
		mockUseMediaSource.mockReturnValue({
			data: undefined,
			isLoading: true,
			error: undefined,
			source: "paintings",
		});

		const { container } = render(<MediaArtContainer />);

		const loadingMessage = container.querySelector(".p-6.text-center");
		expect(loadingMessage).toBeInTheDocument();
	});

	it("should have correct no results message styling", () => {
		mockUseMediaSource.mockReturnValue({
			data: { artworks: [], total: 0 },
			isLoading: false,
			error: undefined,
			source: "paintings",
		});

		const { container } = render(<MediaArtContainer />);

		const noResultsMessage = container.querySelector(".p-6.text-center");
		expect(noResultsMessage).toBeInTheDocument();
	});

	it("should handle undefined source gracefully", () => {
		mockUseMediaSource.mockReturnValue({
			data: { artworks: mockArtworks, total: 2 },
			isLoading: false,
			error: undefined,
			source: undefined,
		});

		render(<MediaArtContainer />);

		// Should default to photos behavior when source is undefined
		expect(screen.getByText("Pexels Photo Collection")).toBeInTheDocument();
		expect(screen.getByTestId("photo-panel-artwork-1")).toBeInTheDocument();
	});

	it("should handle unknown source type gracefully", () => {
		mockUseMediaSource.mockReturnValue({
			data: { artworks: mockArtworks, total: 2 },
			isLoading: false,
			error: undefined,
			source: "unknown" as "paintings" | "photos",
		});

		render(<MediaArtContainer />);

		// Should default to photos behavior for unknown source
		expect(screen.getByText("Pexels Photo Collection")).toBeInTheDocument();
		expect(screen.getByTestId("photo-panel-artwork-1")).toBeInTheDocument();
	});
});
