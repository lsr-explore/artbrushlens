export const fetchArtworks = async (query: string) => {
	const res = await fetch(`/api/met/search?q=${encodeURIComponent(query)}`);
	if (!res.ok) throw new Error("Failed to fetch artworks");
	return res.json();
};
