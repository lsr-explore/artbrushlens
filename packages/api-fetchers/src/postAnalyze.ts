import { Artwork } from "@/types";

export const postAnalyze = async (artwork: Artwork) => {
	const res = await fetch("/api/ai/analyze", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(artwork),
	});

	const data = await res.json();
	if (!res.ok) throw new Error(data.error || "Failed to analyze artwork");

	return data.result;
};
