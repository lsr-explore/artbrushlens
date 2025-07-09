import type { Artwork } from "@artbrushlens/shared-types";

export const postAnalyzeArt = async (artwork: Artwork) => {
	if (!artwork || !artwork.id || !artwork.title || !artwork.artist) {
		throw new Error("Invalid artwork data");
	}

	const response = await fetch("/api/ai/analyze", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(artwork),
	});

	const data = await response.json();
	if (!response.ok) throw new Error(data.error || "Failed to analyze artwork");

	return data;
};
