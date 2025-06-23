// apps/main/src/lib/met/search.ts
export async function fetchArtworks(query: string) {
	const res = await fetch(`/api/met/search?q=${encodeURIComponent(query)}`);
	if (!res.ok) throw new Error("Failed to fetch artworks");
	const data = await res.json();
	return data;
}
