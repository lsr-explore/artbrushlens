import { HttpResponse, http } from "msw";
import { beforeEach, describe, expect, it, vi } from "vitest";
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

	it("should return mock data when USE_MOCK_DETECTION is true", async () => {
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
		const originalValue = process.env.USE_MOCK_DETECTION;
		delete process.env.USE_MOCK_DETECTION;

		const mockImageUrl = "https://example.com/test-image.jpg";
		const mockModelId = "facebook/detr-resnet-50";
		const mockResponse = [{ label: "person", score: 0.95 }];

		// Add MSW handler for this specific test
		server.use(
			http.post(
				`https://api-inference.huggingface.co/models/${mockModelId}`,
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
		const originalValue = process.env.USE_MOCK_DETECTION;
		delete process.env.USE_MOCK_DETECTION;

		const mockImageUrl = "https://example.com/test-image.jpg";
		const mockModelId = "facebook/detr-resnet-50";
		const mockResponse = [{ label: "person", score: 0.95 }];

		// Add MSW handler for this specific test
		server.use(
			http.post(
				`https://api-inference.huggingface.co/models/${mockModelId}`,
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

	it("should handle fetch errors", async () => {
		const originalValue = process.env.USE_MOCK_DETECTION;
		delete process.env.USE_MOCK_DETECTION;

		const mockImageUrl = "https://example.com/test-image.jpg";
		const mockModelId = "facebook/detr-resnet-50";

		// Add MSW handler for this specific test to simulate error
		server.use(
			http.post(
				`https://api-inference.huggingface.co/models/${mockModelId}`,
				() => {
					return HttpResponse.error();
				},
			),
		);

		const request = mockRequest({
			imageUrl: mockImageUrl,
			modelId: mockModelId,
		});

		await expect(detectObjects(request)).rejects.toThrow();

		// Restore original value
		process.env.USE_MOCK_DETECTION = originalValue;
	});
});
