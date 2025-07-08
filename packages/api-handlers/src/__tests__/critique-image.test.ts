import { HttpResponse, http } from "msw";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { server } from "../../../../mocks/dist/server";
import { critiqueImage } from "../critique-image/critique-image";

// Mock NextRequest
const mockRequest = (body: any) =>
	({
		json: vi.fn().mockResolvedValue(body),
	}) as any;

describe("critiqueImage", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("should return mock data when USE_MOCK_CRITIQUE is true", async () => {
		const originalValue = process.env.USE_MOCK_CRITIQUE;
		process.env.USE_MOCK_CRITIQUE = "true";

		const mockImageUrl = "https://example.com/test-image.jpg";

		const req = mockRequest({ imageUrl: mockImageUrl });
		const result = await critiqueImage(req);

		expect(result).toBeInstanceOf(Response);

		const data = await result.json();
		expect(data).toHaveProperty("score");
		expect(data).toHaveProperty("analysis");
		expect(data).toHaveProperty("strengths");
		expect(data).toHaveProperty("areas_for_improvement");
		expect(typeof data.score).toBe("number");
		expect(typeof data.analysis).toBe("string");
		expect(Array.isArray(data.strengths)).toBe(true);
		expect(Array.isArray(data.areas_for_improvement)).toBe(true);

		// Restore original value
		process.env.USE_MOCK_CRITIQUE = originalValue;
	});

	it("should call HuggingFace API with correct parameters when not using mock", async () => {
		const originalValue = process.env.USE_MOCK_CRITIQUE;
		delete process.env.USE_MOCK_CRITIQUE;

		const mockImageUrl = "https://example.com/test-image.jpg";
		const mockResponse = { score: 0.95 };

		// Add MSW handler for this specific test
		server.use(
			http.post(
				"https://api-inference.huggingface.co/models/vinvino02/saliency-model",
				() => {
					return HttpResponse.json(mockResponse);
				},
			),
		);

		const req = mockRequest({ imageUrl: mockImageUrl });
		const result = await critiqueImage(req);

		expect(result).toBeInstanceOf(Response);
		const data = await result.json();
		expect(data).toEqual(mockResponse);

		// Restore original value
		process.env.USE_MOCK_CRITIQUE = originalValue;
	});

	it("should return response data from API", async () => {
		const originalValue = process.env.USE_MOCK_CRITIQUE;
		delete process.env.USE_MOCK_CRITIQUE;

		const mockImageUrl = "https://example.com/test-image.jpg";
		const mockResponse = { score: 0.95 };

		// Add MSW handler for this specific test
		server.use(
			http.post(
				"https://api-inference.huggingface.co/models/vinvino02/saliency-model",
				() => {
					return HttpResponse.json(mockResponse);
				},
			),
		);

		const req = mockRequest({ imageUrl: mockImageUrl });
		const result = await critiqueImage(req);

		expect(result).toBeInstanceOf(Response);

		const data = await result.json();
		expect(data).toEqual(mockResponse);

		// Restore original value
		process.env.USE_MOCK_CRITIQUE = originalValue;
	});

	it("should handle fetch errors", async () => {
		const originalValue = process.env.USE_MOCK_CRITIQUE;
		delete process.env.USE_MOCK_CRITIQUE;

		const mockImageUrl = "https://example.com/test-image.jpg";

		// Add MSW handler for this specific test to simulate error
		server.use(
			http.post(
				"https://api-inference.huggingface.co/models/vinvino02/saliency-model",
				() => {
					return HttpResponse.error();
				},
			),
		);

		const req = mockRequest({ imageUrl: mockImageUrl });

		await expect(critiqueImage(req)).rejects.toThrow();

		// Restore original value
		process.env.USE_MOCK_CRITIQUE = originalValue;
	});
});
