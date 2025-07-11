import { HttpResponse, http } from "msw";
import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { server } from "../../../../mocks/dist/server";
import { detectObjects } from "../object-detection/detect-objects";

// Mock NextRequest
const mockRequest = (body: any) =>
	({
		json: vi.fn().mockResolvedValue(body),
	}) as any;

describe("detectObjects", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	beforeAll(() => {
		process.env.HF_TOKEN = "test-token";
	});

	it("should return mock data when USE_MOCK_DETECTION is true", async () => {
		console.log(
			".....it should return mock data when USE_MOCK_DETECTION is true",
		);
		const originalValue = process.env.USE_MOCK_DETECTION;
		process.env.USE_MOCK_DETECTION = "true";

		const mockImageUrl = "https://example.com/test-image.jpg";
		const mockModelId = "facebook/detr-resnet-50";

		const request = mockRequest({
			imageUrl: mockImageUrl,
			modelId: mockModelId,
		});
		const result = await detectObjects(request);

		expect(result).toBeInstanceOf(Response);

		const data = await result.json();
		expect(Array.isArray(data)).toBe(true);
		expect(data.length).toBeGreaterThan(0);
		expect(data[0]).toHaveProperty("label");
		expect(data[0]).toHaveProperty("score");
		expect(data[0]).toHaveProperty("box");

		// Restore original value
		process.env.USE_MOCK_DETECTION = originalValue;
	});

	it("should call HuggingFace API with correct parameters when not using mock", async () => {
		console.log(
			".....it should call HuggingFace API with correct parameters when not using mock",
		);
		const originalValue = process.env.USE_MOCK_DETECTION;
		delete process.env.USE_MOCK_DETECTION;

		const mockImageUrl = "https://example.com/test-image.jpg";
		const mockModelId = "facebook/detr-resnet-50";
		const mockResponse = [{ label: "person", score: 0.95 }];

		// Add MSW handler for this specific test
		server.use(
			http.post(
				`https://api-inference.huggingface.co/models/facebook/${mockModelId}`,
				() => {
					return HttpResponse.json(mockResponse);
				},
			),
		);

		const request = mockRequest({
			imageUrl: mockImageUrl,
			modelId: mockModelId,
		});
		const result = await detectObjects(request);

		expect(result).toBeInstanceOf(Response);
		const data = await result.json();
		expect(data).toEqual(mockResponse);

		// Restore original value
		process.env.USE_MOCK_DETECTION = originalValue;
	});

	it("should return response data from API", async () => {
		const mockImageUrl = "https://example.com/test-image.jpg";
		const mockModelId = "facebook/detr-resnet-50";

		const mockResponseData = [{ label: "person", score: 0.95 }];

		vi.stubGlobal(
			"fetch",
			vi.fn(() =>
				Promise.resolve(
					new Response(JSON.stringify(mockResponseData), {
						status: 200,
						headers: { "Content-Type": "application/json" },
					}),
				),
			),
		);

		const mockPostRequest = mockRequest({
			imageUrl: mockImageUrl,
			modelId: mockModelId,
		});

		const result = await detectObjects(mockPostRequest);

		expect(result.status).toBe(200);
		const data = await result.json();
		expect(data).toEqual(mockResponseData);

		vi.unstubAllGlobals(); // Cleanup
	});

	it("should handle fetch errors", async () => {
		console.log("fetch exists?", typeof fetch); // Should log 'function'

		const originalValue = process.env.USE_MOCK_DETECTION;
		delete process.env.USE_MOCK_DETECTION;

		const mockImageUrl = "https://example.com/test-image.jpg";
		const mockModelId = "facebook/detr-resnet-50";

		const request = mockRequest({
			imageUrl: mockImageUrl,
			modelId: mockModelId,
		});

		vi.stubGlobal(
			"fetch",
			vi.fn(() =>
				Promise.resolve(
					new Response(JSON.stringify({}), {
						status: 500,
						headers: { "Content-Type": "application/json" },
					}),
				),
			),
		);

		const result = await detectObjects(request);
		expect(result).toBeInstanceOf(Response);
		expect(result.status).toBe(500);
		// Restore original value
		process.env.USE_MOCK_DETECTION = originalValue;
	});
});
