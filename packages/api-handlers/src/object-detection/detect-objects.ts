import type { NextRequest } from "next/server";

export const detectObjects = async (req: NextRequest): Promise<Response> => {
	const { imageUrl, modelId } = await req.json();

	console.log("imageUrl", imageUrl);
	console.log("modelId", modelId);

	const response = await fetch(
		`https://api-inference.huggingface.co/models/${modelId}`,
		{
			method: "POST",
			headers: {
				Authorization: `Bearer ${process.env.HF_TOKEN}`,
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*",
			},
			body: JSON.stringify({ inputs: imageUrl }),
		},
	);

	const result = await response.json();
	console.log("result", result);
	return Response.json(result);
};
