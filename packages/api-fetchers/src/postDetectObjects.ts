import { Artwork } from "@artbrushlens/shared-types";

export const postDetectObjects = async (artwork: Artwork) => {
	const res = await fetch("/api/ai/detect-objects", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(artwork),
	});

	const data = await res.json();
	if (!res.ok) throw new Error(data.error || "Failed to analyze artwork");

	return data.result;
};
