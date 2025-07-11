import { HttpResponse, http } from "msw";
import {
	mockAnalysisResult,
	mockApiResponse,
	mockArtworks,
	mockDetectionResult,
	mockErrorResponse,
	mockMetMuseumResponse,
	mockObjectDetectionResponse,
	mockOpenAiResponse,
	mockPexelsResponse,
	mockPhotoWorks,
} from "./data";

export const handlers = [
	// Met Museum API
	http.get(
		"https://collectionapi.metmuseum.org/public/collection/v1/search",
		() => {
			return HttpResponse.json({
				total: mockArtworks.length,
				objectIDs: mockArtworks.map((art) => parseInt(art.id)),
			});
		},
	),

	http.get(
		"https://collectionapi.metmuseum.org/public/collection/v1/objects/:id",
		({ params }) => {
			const artwork = mockArtworks.find((art) => art.id === params.id);
			if (!artwork) {
				return HttpResponse.json(mockErrorResponse, { status: 404 });
			}
			return HttpResponse.json({
				objectID: artwork.id,
				title: artwork.title,
				artistDisplayName: artwork.artist,
				primaryImage: artwork.imageUrl,
				objectDate: "1889",
				medium: "Oil on canvas",
				dimensions: "73.7 cm × 92.1 cm",
				repository: "Museum of Modern Art, New York",
			});
		},
	),

	// Pexels API
	http.get("https://api.pexels.com/v1/search", () => {
		return HttpResponse.json({
			photos: mockPhotoWorks.map((photo) => ({
				id: photo.id,
				photographer: photo.photographer,
				src: { large: photo.url },
				alt: photo.description,
			})),
			total_results: mockPhotoWorks.length,
			page: 1,
			per_page: 20,
		});
	}),

	// OpenAI API
	http.post("https://api.openai.com/v1/chat/completions", () => {
		return HttpResponse.json({
			choices: [
				{
					message: {
						content: mockAnalysisResult.result,
					},
				},
			],
		});
	}),

	// Hugging Face API
	http.post("https://api-inference.huggingface.co/models/:model", () => {
		console.log(".........in the mock handler");
		return HttpResponse.json(mockDetectionResult.objects);
	}),

	http.post(
		"https://api-inference.huggingface.co/models/facebook/detr-resnet-50",
		({ request }) => {
			console.log("Headers:", request.headers.get("authorization")); // Should log actual token
			return HttpResponse.json({ error: "mocked error" }, { status: 500 });
		},
	),

	// Local API routes
	http.post("/api/ai/analyze", async ({ request }) => {
		const body = await request.text();
		if (!body) {
			return HttpResponse.json(mockErrorResponse, { status: 400 });
		}

		try {
			const artwork = JSON.parse(body);
			if (!artwork.id || !artwork.title || !artwork.artist) {
				return HttpResponse.json(mockErrorResponse, { status: 400 });
			}
		} catch {
			return HttpResponse.json(mockErrorResponse, { status: 400 });
		}

		return HttpResponse.json(mockAnalysisResult);
	}),

	http.post("/api/ai/detect-objects", async ({ request }) => {
		const body = await request.arrayBuffer();
		if (!body || body.byteLength === 0) {
			return HttpResponse.json(mockErrorResponse, { status: 400 });
		}

		return HttpResponse.json(mockDetectionResult);
	}),

	http.post("/api/critique", () => {
		return HttpResponse.json({
			critique:
				"This is a thoughtful analysis of the artwork's composition and technique.",
		});
	}),

	http.get("/api/met/search", ({ request }) => {
		const url = new URL(request.url);
		const query = url.searchParams.get("q");

		if (!query || query.trim() === "") {
			return HttpResponse.json(mockErrorResponse, { status: 400 });
		}

		return HttpResponse.json({ artworks: mockArtworks });
	}),

	http.get("/api/pexels/search", ({ request }) => {
		const url = new URL(request.url);
		const query = url.searchParams.get("q");

		if (!query || query.trim() === "") {
			return HttpResponse.json(mockErrorResponse, { status: 400 });
		}

		return HttpResponse.json({ artworks: mockPhotoWorks });
	}),

	// Error scenarios
	http.get("/api/error-test", () => {
		return HttpResponse.json(mockErrorResponse, { status: 500 });
	}),

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
