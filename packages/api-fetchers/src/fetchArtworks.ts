export const fetchArtworks = async (query: string) => {
	if (!query || query.trim() === '') {
		throw new Error("Query cannot be empty");
	}

	const res = await fetch(`/api/met/search?q=${encodeURIComponent(query)}`);
	if (!res.ok) throw new Error("Failed to fetch artworks");
	return res.json();
};
