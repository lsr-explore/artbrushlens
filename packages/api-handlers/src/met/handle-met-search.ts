import type { NextRequest } from "next/server";
import { MOCK_ARTWORKS } from "./mock-response";

export const handleMetSearch = async (
	request: NextRequest,
): Promise<Response> => {
	const { searchParams } = new URL(request.url);
	const q = searchParams.get("q");

	if (!q) {
		return Response.json({ error: "Missing query param `q`" }, { status: 400 });
	}

	// 🔁 Check for mock mode
	if (process.env.USE_MOCK_MET_API === "true") {
		return Response.json({
			total: 1,
			artworks: MOCK_ARTWORKS,
			mock: true,
		});
	}

	try {
		// 🔍 Search for object IDs
		const searchResponse = await fetch(
			`${process.env.MET_API_BASE_URL}/search?q=${encodeURIComponent(q)}`,
		);
		const searchData = await searchResponse.json();

		if (!searchData.objectIDs || searchData.objectIDs.length === 0) {
			return Response.json({ artworks: [] });
		}

		const limitedIds = searchData.objectIDs.slice(0, 30); // limit results for performance

		// 🖼️ Fetch artwork details in parallel
		const detailPromises = limitedIds.map(async (id: number) => {
			const objectResponse = await fetch(
				`${process.env.MET_API_BASE_URL}/objects/${id}`,
			);
			const objectData = await objectResponse.json();

			return {
				id: String(objectData.objectID),
				title: objectData.title || "Untitled",
				artist: objectData.artistDisplayName || "Unknown Artist",
				imageUrl: objectData.primaryImageSmall || null,
				description: objectData.objectDate || "",
				aiAnalysis: null, // initially null
			};
		});

		const artworks = await Promise.all(detailPromises);

		const filteredArtworks = artworks.filter((artwork) => artwork.imageUrl);

		console.log("🔍 MET API response:", { artworks: filteredArtworks });

		return Response.json({
			total: filteredArtworks.length,
			artworks: filteredArtworks,
		});
	} catch (error: any) {
		console.error("❌ MET API error:", error);
		return Response.json({ error: error.message }, { status: 500 });
	}
};
