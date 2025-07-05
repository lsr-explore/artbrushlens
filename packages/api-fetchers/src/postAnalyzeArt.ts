import type { Artwork } from "@artbrushlens/shared-types";

export const postAnalyzeArt = async (artwork: Artwork) => {
	if (!artwork || !artwork.id || !artwork.title || !artwork.artist) {
		throw new Error("Invalid artwork data");
	}

	const res = await fetch("/api/ai/analyze", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(artwork),
	});

	const data = await res.json();
	if (!res.ok) throw new Error(data.error || "Failed to analyze artwork");

	return data;
};
