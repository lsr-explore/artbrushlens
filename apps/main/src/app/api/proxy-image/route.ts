// apps/main/src/app/api/proxy-image/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	const url = req.nextUrl.searchParams.get("url");

	if (!url) {
		return NextResponse.json({ error: "Missing image URL" }, { status: 400 });
	}

	try {
		const res = await fetch(url);
		const contentType = res.headers.get("content-type") || "image/jpeg";
		const buffer = await res.arrayBuffer();

		return new NextResponse(buffer, {
			headers: {
				"Content-Type": contentType,
				"Access-Control-Allow-Origin": "*", // 👈 now you can use ColorThief
			},
		});
	} catch (e) {
		return NextResponse.json(
			{ error: "Failed to proxy image" },
			{ status: 500 },
		);
	}
}
