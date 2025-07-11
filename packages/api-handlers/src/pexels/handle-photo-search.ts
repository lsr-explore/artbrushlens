/** biome-ignore-all lint/suspicious/noExplicitAny: <explanation> */
import type { NextRequest } from "next/server";
import { MOCK_ARTWORKS } from "./mock-response";

export const handlePhotoSearch = async (
	request: NextRequest,
): Promise<Response> => {
	const { searchParams } = new URL(request.url);
	const q = searchParams.get("q");

	console.log("🔍 q =", q);

	if (!q) {
		return Response.json({ error: "Missing query param `q`" }, { status: 400 });
	}

	// 🔁 Check for mock mode
	if (process.env.USE_MOCK_PEXELS_API === "true") {
		return Response.json({
			total: 1,
			artworks: MOCK_ARTWORKS,
			mock: true,
		});
	}

	try {
		// 🔍 Search for object IDs

		const searchResponse = await fetch(
			`${process.env.PEXELS_API_BASE_URL}/search?query=${encodeURIComponent(q)}`,
			{
				method: "GET",
				headers: {
					Authorization: `${process.env.PEXELS_API_KEY}`,
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*",
				},
			},
		);
		const searchData = await searchResponse.json();

		if (searchData.per_page === 0 || searchData.photos.length === 0) {
			return Response.json({ artworks: [] });
		}

		const artworks = searchData.photos.map((photo: any) => {
			return {
				id: photo.id,
				title: photo.alt,
				artist: photo.photographer,
				imageUrl: photo.src.medium,
				description: "",
				metId: "",
			};
		});

		let filteredArtworks = artworks.filter((artwork: any) => artwork.imageUrl);

		if (filteredArtworks.length === 0) {
			return Response.json({ artworks: [] });
		}

		if (filteredArtworks.length > 10) {
			filteredArtworks = filteredArtworks.slice(0, 10);
		}

		console.log("🔍 Found artworks:", filteredArtworks);

		return Response.json({
			total: filteredArtworks.length,
			artworks: filteredArtworks,
		});
	} catch (error: any) {
		console.error("❌ Pexel API error:", error);
		return Response.json({ error: error.message }, { status: 500 });
	}
};
