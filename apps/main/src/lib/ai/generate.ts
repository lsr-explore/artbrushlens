// apps/main/src/lib/ai/generate.ts
type AIResponse = { result: string };

interface Artwork {
	id: string;
	title: string;
	artist?: string;
	description?: string;
}

const MOCK_AI_ANALYSES = [
	"This artwork demonstrates masterful use of color and composition, with swirling brushstrokes that create a sense of movement and energy. The contrast between warm and cool tones adds depth and emotional resonance.",
	"The piece showcases exceptional technical skill in its realistic portrayal while maintaining an air of mystery. The lighting and shadows create a dramatic effect that draws the viewer's attention.",
	"A remarkable example of the artist's unique style, combining traditional techniques with innovative approaches. The symbolism and metaphorical elements invite deeper contemplation.",
	"The composition demonstrates perfect balance and harmony, with each element carefully placed to guide the viewer's eye through the narrative of the piece.",
	"This work represents a significant moment in art history, showcasing the evolution of artistic expression and the artist's mastery of their chosen medium.",
];

export async function generateAIResponse(
	artwork: Artwork,
): Promise<AIResponse> {
	if (process.env.USE_LOCAL_AI === "true") {
		console.log(`🤖 Generating mock AI analysis for: ${artwork.title}`);

		// Simulate API delay
		await new Promise((resolve) => setTimeout(resolve, 1000));

		// Return a random mock analysis
		const randomIndex = Math.floor(Math.random() * MOCK_AI_ANALYSES.length);
		console.log(
			`randomIndex: ${randomIndex} | length: ${MOCK_AI_ANALYSES.length}`,
		);
		return {
			result: `AI Analysis of "${artwork.title}" by ${artwork.artist}: ${MOCK_AI_ANALYSES[randomIndex]}`,
		};
	}

	const prompt = `please provide an analysis of ${artwork.title} by ${artwork.artist}, including its historical context, artistic style, and any notable features.`;

	const res = await fetch("https://api.openai.com/v1/chat/completions", {
		method: "POST",
		headers: {
			Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			model: "gpt-3.5-turbo",
			messages: [{ role: "user", content: prompt }],
		}),
	});

	const data = await res.json();
	return { result: data.choices?.[0]?.message?.content || "No response" };
}
