import { HttpResponse, http } from "msw";
import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
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
	beforeAll(() => {
		process.env.HF_TOKEN = "test-token";
	});

	it("should return mock data when USE_MOCK_CRITIQUE is true", async () => {
		const originalValue = process.env.USE_MOCK_CRITIQUE;
		process.env.USE_MOCK_CRITIQUE = "true";

		const mockImageUrl = "https://example.com/test-image.jpg";

		const request = mockRequest({ imageUrl: mockImageUrl });
		const result = await critiqueImage(request);

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

		const request = mockRequest({ imageUrl: mockImageUrl });
		const result = await critiqueImage(request);

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

		const request = mockRequest({ imageUrl: mockImageUrl });
		const result = await critiqueImage(request);

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

		server.use(
			http.post(
				"https://api-inference.huggingface.co/models/vinvino02/saliency-model",
				({ request }) => {
					const token = request.headers.get("authorization");
					console.log(".....token in the test", token);

					if (!token || !token.includes("test-token")) {
						return HttpResponse.json(
							{ error: "unauthorized" },
							{ status: 401 },
						);
					}

					return HttpResponse.json({ error: "mocked error" }, { status: 500 });
				},
			),
		);

		const request = mockRequest({ imageUrl: mockImageUrl });
		const result = await critiqueImage(request);
		expect(result).toBeInstanceOf(Response);
		expect(result.status).toBe(500);
		// Restore original value
		process.env.USE_MOCK_CRITIQUE = originalValue;
	});
});
