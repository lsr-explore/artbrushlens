export const fetchArtworks = async (query: string) => {
	if (!query || query.trim() === "") {
		throw new Error("Query cannot be empty");
	}

	const response = await fetch(
		`/api/met/search?q=${encodeURIComponent(query)}`,
	);
	if (!response.ok) throw new Error("Failed to fetch artworks");
	return response.json();
};
