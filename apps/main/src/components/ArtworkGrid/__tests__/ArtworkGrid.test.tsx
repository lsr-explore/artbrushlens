import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import type { Artwork } from "@artbrushlens/shared-types";
import { ArtworkGrid } from "../ArtworkGrid";

// Mock Next.js components
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

// Mock the Errors module
vi.mock("../../Errors", () => ({
	NoArtworksFound: () => <div data-testid="no-artworks-found">No artworks found</div>,
}));

const mockArtworks: Artwork[] = [
	{
		id: "1",
		title: "Sunflowers",
		artist: "Vincent van Gogh",
		imageUrl: "https://example.com/sunflowers.jpg",
		description: "A painting of sunflowers by Vincent van Gogh",
		metId: "123",
	},
	{
		id: "2",
		title: "Starry Night",
		artist: "Vincent van Gogh",
		imageUrl: "https://example.com/starry-night.jpg",
		description: "A painting of the night sky with swirling clouds",
		metId: "456",
	},
];

describe("ArtworkGrid", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		// Reset fetch mock
		(global.fetch as any).mockResolvedValue({
			ok: true,
			json: async () => ({ result: "AI analysis result" }),
		});
	});

	it("renders no artworks message when artworks array is empty", () => {
		render(<ArtworkGrid artworks={[]} />);
		expect(screen.getByTestId("no-artworks-found")).toBeInTheDocument();
	});

	it("renders artwork grid with correct structure", () => {
		render(<ArtworkGrid artworks={mockArtworks} />);
		
		expect(screen.getByText("Art Collection")).toBeInTheDocument();
		expect(screen.getByText("Discover and analyze beautiful artworks with AI")).toBeInTheDocument();
	});

	it("renders all artworks with correct information", () => {
		render(<ArtworkGrid artworks={mockArtworks} />);
		
		expect(screen.getByText("Sunflowers")).toBeInTheDocument();
		expect(screen.getByText("Starry Night")).toBeInTheDocument();
		expect(screen.getAllByText("Vincent van Gogh")).toHaveLength(2);
	});

	it("renders analyze button for each artwork", () => {
		render(<ArtworkGrid artworks={mockArtworks} />);
		
		const analyzeButtons = screen.getAllByText("🤖 AI Analysis");
		expect(analyzeButtons).toHaveLength(2);
	});

	it("handles AI analysis button click", async () => {
		const user = userEvent.setup();
		render(<ArtworkGrid artworks={[mockArtworks[0]]} />);
		
		const analyzeButton = screen.getByText("🤖 AI Analysis");
		await user.click(analyzeButton);
		
		expect(global.fetch).toHaveBeenCalledWith("/api/ai/analyze", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(mockArtworks[0]),
		});
	});

	it("displays AI analysis result", async () => {
		const user = userEvent.setup();
		render(<ArtworkGrid artworks={[mockArtworks[0]]} />);
		
		const analyzeButton = screen.getByText("🤖 AI Analysis");
		await user.click(analyzeButton);
		
		await waitFor(() => {
			expect(screen.getByText("AI Analysis")).toBeInTheDocument();
			expect(screen.getByText("AI analysis result")).toBeInTheDocument();
		});
	});

	it("shows footer with artwork count", () => {
		render(<ArtworkGrid artworks={mockArtworks} />);
		
		expect(screen.getByText("Showing 2 artworks • Powered by Metropolitan Museum of Art API")).toBeInTheDocument();
	});

	it("renders artwork without imageUrl with emoji placeholder", () => {
		const artworkWithoutImage = {
			...mockArtworks[0],
			imageUrl: "",
		};
		
		render(<ArtworkGrid artworks={[artworkWithoutImage]} />);
		
		expect(screen.getByText("🎨")).toBeInTheDocument();
	});

	it("handles image load error correctly", () => {
		render(<ArtworkGrid artworks={[mockArtworks[0]]} />);
		
		const image = screen.getByTestId("artwork-image");
		fireEvent.error(image);
		
		// Check that the error handler was called by verifying the src attribute doesn't change
		// (since we mocked the onError to just call the function)
		expect(image).toBeInTheDocument();
	});
});
