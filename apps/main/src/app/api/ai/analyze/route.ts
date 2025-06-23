import { NextRequest, NextResponse } from "next/server";
import { generateAIResponse } from "../../../../lib/ai/generate"; // ✅ relative import

export async function POST(req: NextRequest) {
	try {
		const artwork = await req.json();

		if (!artwork?.title) {
			return NextResponse.json(
				{ error: "Missing artwork.title" },
				{ status: 400 },
			);
		}

		const { result } = await generateAIResponse(artwork);
		return NextResponse.json({ result });
	} catch (err: any) {
		console.error("AI analysis failed:", err);
		return NextResponse.json(
			{ error: "AI processing failed", message: err.message },
			{ status: 500 },
		);
	}
}
