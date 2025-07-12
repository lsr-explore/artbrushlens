import { fetchArtworks } from "@artbrushlens/api-fetchers";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { mockArtworks } from "../../../../mocks/dist/data";

// Get the mocked fetch function
const mockFetch = vi.mocked(fetch);

describe("fetchArtworks", () => {
	beforeEach(() => {
		// Clear all mocks before each test
		vi.clearAllMocks();
	});

	it("should fetch artworks successfully", async () => {
		// Mock successful response
		mockFetch.mockResolvedValueOnce({
			ok: true,
			json: vi.fn().mockResolvedValue({ artworks: mockArtworks }),
		} as unknown as Response);

		const result = await fetchArtworks("sunflowers");

		expect(result).toBeDefined();
		expect(result.artworks).toHaveLength(mockArtworks.length);
		expect(result.artworks[0]).toMatchObject({
			id: expect.any(String),
			title: expect.any(String),
			artist: expect.any(String),
		});
	});

	it("should handle empty search results", async () => {
		// Mock response with empty results
		mockFetch.mockResolvedValueOnce({
			ok: true,
			json: vi.fn().mockResolvedValue({ artworks: [] }),
		} as unknown as Response);

		const result = await fetchArtworks("nonexistentquery");

		expect(result).toBeDefined();
		expect(Array.isArray(result.artworks)).toBe(true);
	});

	it("should throw error for invalid queries", async () => {
		await expect(fetchArtworks("")).rejects.toThrow();
	});

	it("should include all required artwork properties", async () => {
		// Mock successful response
		mockFetch.mockResolvedValueOnce({
			ok: true,
			json: vi.fn().mockResolvedValue({ artworks: mockArtworks }),
		} as unknown as Response);

		const result = await fetchArtworks("test");

		if (result.artworks.length > 0) {
			const artwork = result.artworks[0];
			expect(artwork).toHaveProperty("id");
			expect(artwork).toHaveProperty("title");
			expect(artwork).toHaveProperty("artist");
		}
	});

	it("should throw error when fetch fails", async () => {
		// Mock failed response
		mockFetch.mockResolvedValueOnce({
			ok: false,
		} as Response);

		await expect(fetchArtworks("test")).rejects.toThrow(
			"Failed to fetch artworks",
		);
	});
});
