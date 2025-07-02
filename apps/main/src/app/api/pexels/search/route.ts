/* eslint-disable @typescript-eslint/no-explicit-any */
import { type NextRequest, NextResponse } from "next/server";
import { MOCK_ARTWORKS } from "./mockResponse";

export const GET = async (req: NextRequest) => {
	const { searchParams } = new URL(req.url);
	const q = searchParams.get("q");

	if (!q) {
		return NextResponse.json(
			{ error: "Missing query param `q`" },
			{ status: 400 },
		);
	}

	// 🔁 Check for mock mode
	if (process.env.USE_MOCK_PEXELS_API === "true") {
		return NextResponse.json({
			total: 1,
			artworks: MOCK_ARTWORKS,
			mock: true,
		});
	}

	try {
		// 🔍 Search for object IDs

		const searchRes = await fetch(
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
		const searchData = await searchRes.json();

		if (searchData.per_page === 0 || searchData.photos.length === 0) {
			return NextResponse.json({ artworks: [] });
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

		let filteredArtworks = artworks.filter((artwork) => artwork.imageUrl);

		if (filteredArtworks.length === 0) {
			return NextResponse.json({ artworks: [] });
		}

		if (filteredArtworks.length > 10) {
			filteredArtworks = filteredArtworks.slice(0, 10);
		}

		console.log("🔍 Found artworks:", filteredArtworks);

		return NextResponse.json({
			total: filteredArtworks.length,
			artworks: filteredArtworks,
		});
	} catch (err: any) {
		console.error("❌ Pexel API error:", err);
		return NextResponse.json({ error: err.message }, { status: 500 });
	}
};
