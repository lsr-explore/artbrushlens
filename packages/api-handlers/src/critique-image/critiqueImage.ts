import { type NextRequest } from "next/server";

export const critiqueImage = async (req: NextRequest): Promise<Response> => {
	const { imageUrl } = await req.json();

	const response = await fetch(
		"https://api-inference.huggingface.co/models/vinvino02/saliency-model",
		{
			method: "POST",
			headers: {
				Authorization: `Bearer ${process.env.HF_TOKEN}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ inputs: imageUrl }),
		},
	);

	const data = await response.json();
	return Response.json(data);
};
