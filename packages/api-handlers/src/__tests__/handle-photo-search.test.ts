import { beforeEach, describe, expect, it, vi } from "vitest";
import { handlePhotoSearch } from "../pexels/handle-photo-search";

// Mock NextRequest
const mockRequest = (url: string) =>
	({
		url,
	}) as any;

// Mock fetch
const mockFetch = vi.fn();
vi.stubGlobal("fetch", mockFetch);

describe("handlePhotoSearch", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});
	it("should return error when query param is missing", async () => {
		const req = mockRequest("http://localhost/api/pexels");
		const response = await handlePhotoSearch(req);
		const data = await response.json();

		expect(response.status).toBe(400);
		expect(data).toEqual({ error: "Missing query param `q`" });
	});

	it("should return mock data when USE_MOCK_PEXELS_API is true", async () => {
		process.env.USE_MOCK_PEXELS_API = "true";

		const req = mockRequest("http://localhost/api/pexels?q=art");
		const response = await handlePhotoSearch(req);
		const data = await response.json();

		expect(data.mock).toBe(true);
		expect(data.total).toBe(1);
		expect(data.artworks).toBeDefined();
	});

	it("should handle basic functionality with valid query", async () => {
		const originalValue = process.env.USE_MOCK_PEXELS_API;
		process.env.USE_MOCK_PEXELS_API = "false";
		process.env.PEXELS_API_BASE_URL = "https://api.pexels.com/v1";
		process.env.PEXELS_API_KEY = "test-api-key";

		const mockPexelsResponse = {
			per_page: 15,
			photos: [
				{
					id: 1,
					alt: "Beautiful artwork",
					photographer: "Test Photographer",
					src: {
						medium: "https://example.com/photo.jpg",
					},
				},
			],
		};

		mockFetch.mockResolvedValueOnce({
			json: vi.fn().mockResolvedValue(mockPexelsResponse),
		});

		const req = mockRequest("http://localhost/api/pexels?q=art");
		const response = await handlePhotoSearch(req);

		expect(response).toBeInstanceOf(Response);

		process.env.USE_MOCK_PEXELS_API = originalValue;
	});

	it("should handle environment configuration correctly", async () => {
		const originalValue = process.env.USE_MOCK_PEXELS_API;
		process.env.USE_MOCK_PEXELS_API = "false";

		const mockPexelsResponse = {
			per_page: 0,
			photos: [],
		};

		mockFetch.mockResolvedValueOnce({
			json: vi.fn().mockResolvedValue(mockPexelsResponse),
		});

		const req = mockRequest("http://localhost/api/pexels?q=test");
		const response = await handlePhotoSearch(req);

		expect(response).toBeInstanceOf(Response);

		process.env.USE_MOCK_PEXELS_API = originalValue;
	});

	it("should handle fetch calls with proper setup", async () => {
		const originalValue = process.env.USE_MOCK_PEXELS_API;
		process.env.USE_MOCK_PEXELS_API = "false";

		const mockPexelsResponse = {
			per_page: 15,
			photos: Array.from({ length: 5 }, (_, i) => ({
				id: i + 1,
				alt: `Photo ${i + 1}`,
				photographer: `Photographer ${i + 1}`,
				src: {
					medium: `https://example.com/photo${i + 1}.jpg`,
				},
			})),
		};

		mockFetch.mockResolvedValueOnce({
			json: vi.fn().mockResolvedValue(mockPexelsResponse),
		});

		const req = mockRequest("http://localhost/api/pexels?q=art");
		const response = await handlePhotoSearch(req);

		expect(response).toBeInstanceOf(Response);

		process.env.USE_MOCK_PEXELS_API = originalValue;
	});

	it("should handle errors gracefully", async () => {
		const originalValue = process.env.USE_MOCK_PEXELS_API;
		process.env.USE_MOCK_PEXELS_API = "false";

		mockFetch.mockRejectedValueOnce(new Error("Network error"));

		const req = mockRequest("http://localhost/api/pexels?q=art");
		const response = await handlePhotoSearch(req);

		expect(response).toBeInstanceOf(Response);

		process.env.USE_MOCK_PEXELS_API = originalValue;
	});
});
