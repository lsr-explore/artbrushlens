import { waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { mockDetectionResult } from "../../../../mocks/dist/data";
import { useDetectObjects } from "../use-object-detection";
import { renderHookWithQueryClient } from "./test-utilities";

describe("useObjectDetection", () => {
	it("should detect objects successfully", async () => {
		const { result } = renderHookWithQueryClient(() => useDetectObjects());

		const mockImageData = new ArrayBuffer(8);

		result.current.mutate(mockImageData);

		await waitFor(() => {
			expect(result.current.isSuccess).toBe(true);
		});

		expect(result.current.data).toEqual(mockDetectionResult.objects);
		expect(result.current.error).toBe(null);
	});

	it("should handle detection errors", async () => {
		const { result } = renderHookWithQueryClient(() => useDetectObjects());

		const emptyData = new ArrayBuffer(0);

		result.current.mutate(emptyData);

		await waitFor(() => {
			expect(result.current.isError).toBe(true);
		});

		expect(result.current.error).toBeDefined();
	});

	it("should return valid detection results", async () => {
		const { result } = renderHookWithQueryClient(() => useDetectObjects());

		const mockImageData = new ArrayBuffer(8);

		result.current.mutate(mockImageData);

		await waitFor(() => {
			expect(result.current.isSuccess).toBe(true);
		});

		const detections = result.current.data;
		expect(Array.isArray(detections)).toBe(true);

		if (detections && detections.length > 0) {
			const detection = detections[0];
			expect(detection).toHaveProperty("label");
			expect(detection).toHaveProperty("score");
			expect(detection).toHaveProperty("box");
			expect(typeof detection.score).toBe("number");
			expect(detection.score).toBeGreaterThanOrEqual(0);
			expect(detection.score).toBeLessThanOrEqual(1);
		}
	});

	it("should support multiple detections", async () => {
		const { result } = renderHookWithQueryClient(() => useDetectObjects());

		const mockImageData = new ArrayBuffer(8);

		const mutatePromise = result.current.mutateAsync(mockImageData);

		await expect(mutatePromise).resolves.toEqual(mockDetectionResult.objects);
	});

	it("should reset mutation state", async () => {
		const { result } = renderHookWithQueryClient(() => useDetectObjects());

		const mockImageData = new ArrayBuffer(8);

		result.current.mutate(mockImageData);

		await waitFor(() => {
			expect(result.current.isSuccess).toBe(true);
		});

		result.current.reset();

		await waitFor(() => {
			expect(result.current.isSuccess).toBe(false);
		});
		expect(result.current.data).toBeUndefined();
		expect(result.current.error).toBe(null);
	});
});
