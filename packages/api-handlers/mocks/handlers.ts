import { HttpResponse, http } from "msw";
import {
	mockApiResponse,
	mockMetMuseumResponse,
	mockObjectDetectionResponse,
	mockOpenAiResponse,
	mockPexelsResponse,
} from "./data";

export const handlers = [
	// OpenAI API
	http.post("https://api.openai.com/v1/chat/completions", () => {
		return HttpResponse.json(mockOpenAiResponse);
	}),

	// Met Museum API
	http.get(
		"https://collectionapi.metmuseum.org/public/collection/v1/search",
		() => {
			return HttpResponse.json(mockMetMuseumResponse);
		},
	),

	http.get(
		"https://collectionapi.metmuseum.org/public/collection/v1/objects/:id",
		() => {
			return HttpResponse.json(mockMetMuseumResponse.objects[0]);
		},
	),

	// Pexels API
	http.get("https://api.pexels.com/v1/search", () => {
		return HttpResponse.json(mockPexelsResponse);
	}),

	// HuggingFace API for object detection - return expected format
	http.post(
		"https://api-inference.huggingface.co/models/facebook/detr-resnet-50",
		() => {
			return HttpResponse.json([{ label: "person", score: 0.95 }]);
		},
	),

	// HuggingFace API for image critique - return expected format
	http.post(
		"https://api-inference.huggingface.co/models/vinvino02/saliency-model",
		() => {
			return HttpResponse.json({ score: 0.95 });
		},
	),

	// Object Detection API
	http.post("/api/detect-objects", () => {
		return HttpResponse.json(mockObjectDetectionResponse);
	}),

	// Image proxy
	http.get("/api/proxy-image", () => {
		return HttpResponse.arrayBuffer(new ArrayBuffer(1024));
	}),

	// Generic API response
	http.get("/api/test", () => {
		return HttpResponse.json(mockApiResponse);
	}),
];

import { setupServer } from "msw/node";
export const server = setupServer(...handlers);
