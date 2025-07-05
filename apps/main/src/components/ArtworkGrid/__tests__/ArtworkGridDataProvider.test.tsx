import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { vi } from "vitest";
import React from "react";
import { ArtworkGridDataProvider } from "../ArtworkGridDataProvider";

// Mock Next.js components first
vi.mock("next/image", () => ({
	default: ({ src, alt, onError, ...props }: any) => {
		const handleError = () => {
			if (onError) {
				onError({ currentTarget: { src } });
			}
		};
		return (
			<img
				src={src}
				alt={alt}
				onError={handleError}
				data-testid="artwork-image"
				{...props}
			/>
		);
	},
}));

vi.mock("next/link", () => ({
	default: ({ href, children }: any) => (
		<a href={href} data-testid="artwork-link">
			{children}
		</a>
	),
}));

// Mock the data-providers module
vi.mock("data-providers", () => ({
	useMetSearch: vi.fn(),
}));

// Mock the components
vi.mock("@artbrushlens/palette-studio", () => ({
	LoadingSpinner: () => <div data-testid="loading-spinner">Loading...</div>,
}));

vi.mock("../../Errors", () => ({
	LoadingError: ({ error }: { error: Error }) => (
		<div data-testid="loading-error">Error: {error.message}</div>
	),
	NoArtworksFound: () => <div data-testid="no-artworks-found">No artworks found</div>,
}));

const mockArtworks = [
	{
		id: "1",
		title: "Sunflowers",
		artist: "Vincent van Gogh",
		imageUrl: "https://example.com/sunflowers.jpg",
		description: "A painting of sunflowers",
		metId: "123",
	},
	{
		id: "2",
		title: "Starry Night",
		artist: "Vincent van Gogh",
		imageUrl: "https://example.com/starry-night.jpg",
		description: "A painting of the night sky",
		metId: "456",
	},
];

const createTestQueryClient = () =>
	new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
			},
		},
	});

const renderWithQueryClient = (component: React.ReactNode) => {
	const queryClient = createTestQueryClient();
	return render(
		<QueryClientProvider client={queryClient}>{component}</QueryClientProvider>
	);
};

describe("ArtworkGridDataProvider", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("renders loading spinner when data is loading", async () => {
		const { useMetSearch } = await import("data-providers");
		vi.mocked(useMetSearch).mockReturnValue({
			data: null,
			isLoading: true,
			error: null,
		} as any);

		renderWithQueryClient(<ArtworkGridDataProvider />);

		expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
		expect(screen.getByText("Loading...")).toBeInTheDocument();
	});

	it("renders error component when there is an error", async () => {
		const { useMetSearch } = await import("data-providers");
		const mockError = new Error("Failed to fetch artworks");
		vi.mocked(useMetSearch).mockReturnValue({
			data: null,
			isLoading: false,
			error: mockError,
		} as any);

		renderWithQueryClient(<ArtworkGridDataProvider />);

		expect(screen.getByTestId("loading-error")).toBeInTheDocument();
		expect(screen.getByText("Error: Failed to fetch artworks")).toBeInTheDocument();
	});

	it("renders ArtworkGrid with artworks when data is loaded", async () => {
		const { useMetSearch } = await import("data-providers");
		vi.mocked(useMetSearch).mockReturnValue({
			data: { artworks: mockArtworks },
			isLoading: false,
			error: null,
		} as any);

		renderWithQueryClient(<ArtworkGridDataProvider />);

		// Since the ArtworkGrid mock isn't working properly, test the actual rendered content
		expect(screen.getByText("Art Collection")).toBeInTheDocument();
		expect(screen.getByText("Sunflowers")).toBeInTheDocument();
		expect(screen.getByText("Starry Night")).toBeInTheDocument();
		expect(screen.getAllByText("Vincent van Gogh")).toHaveLength(2);
	});

	it("calls useMetSearch with correct query", async () => {
		const { useMetSearch } = await import("data-providers");
		vi.mocked(useMetSearch).mockReturnValue({
			data: { artworks: [] },
			isLoading: false,
			error: null,
		} as any);

		renderWithQueryClient(<ArtworkGridDataProvider />);

		expect(useMetSearch).toHaveBeenCalledWith("sunflowers");
	});
});
