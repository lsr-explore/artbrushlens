 
/** biome-ignore-all lint/suspicious/noExplicitAny: <explanation> */
import { type NextRequest } from "next/server";

export const proxyImage = async (req: NextRequest): Promise<Response> => {
	const url = req.nextUrl.searchParams.get("url");

	if (!url) {
		return Response.json({ error: "Missing image URL" }, { status: 400 });
	}

	try {
		const res = await fetch(url);
		const contentType = res.headers.get("content-type") || "image/jpeg";
		const buffer = await res.arrayBuffer();

		return new Response(buffer, {
			headers: {
				"Content-Type": contentType,
				"Access-Control-Allow-Origin": "*", // 👈 now you can use ColorThief
			},
		});
	} catch (e: any) {
		return Response.json(
			{ error: `Failed to proxy image: ${e.message}` },
			{ status: 500 },
		);
	}
};
