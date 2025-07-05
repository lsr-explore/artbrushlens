/* eslint-disable @typescript-eslint/no-explicit-any */
import { type NextRequest } from "next/server";
import { MOCK_ARTWORKS } from "./mockResponse";

export const handleMetSearch = async (req: NextRequest): Promise<Response> => {
	const { searchParams } = new URL(req.url);
	const q = searchParams.get("q");

	if (!q) {
		return Response.json(
			{ error: "Missing query param `q`" },
			{ status: 400 },
		);
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
		const searchRes = await fetch(
			`${process.env.MET_API_BASE_URL}/search?q=${encodeURIComponent(q)}`,
		);
		const searchData = await searchRes.json();

		if (!searchData.objectIDs || searchData.objectIDs.length === 0) {
			return Response.json({ artworks: [] });
		}

		const limitedIds = searchData.objectIDs.slice(0, 30); // limit results for performance

		// 🖼️ Fetch artwork details in parallel
		const detailPromises = limitedIds.map(async (id: number) => {
			const objRes = await fetch(
				`${process.env.MET_API_BASE_URL}/objects/${id}`,
			);
			const objData = await objRes.json();

			return {
				id: String(objData.objectID),
				title: objData.title || "Untitled",
				artist: objData.artistDisplayName || "Unknown Artist",
				imageUrl: objData.primaryImageSmall || null,
				description: objData.objectDate || "",
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
	} catch (err: any) {
		console.error("❌ MET API error:", err);
		return Response.json({ error: err.message }, { status: 500 });
	}
};
