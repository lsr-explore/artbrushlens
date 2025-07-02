// Vercel API route
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const { imageUrl } = req.body;

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
	res.status(200).json(data);
}
