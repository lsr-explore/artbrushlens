// apps/main/src/app/api/analyze-image/route.ts
import { NextRequest, NextResponse } from "next/server";

export const POST = (req: NextRequest) => {
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

	console.log("response", response);

	const result = await response.json();
	console.log("result", result);
	return NextResponse.json(result);
}
