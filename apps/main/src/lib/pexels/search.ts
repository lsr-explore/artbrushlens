export async function fetchPhotoWorks(query: string) {
	const res = await fetch(`/api/pexels/search?q=${encodeURIComponent(query)}`);
	if (!res.ok) throw new Error("Failed to fetch artworks");
	const data = await res.json();
	return data;
}
