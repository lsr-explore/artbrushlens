export const fetchPhotoWorks = async (query: string) => {
	if (!query || query.trim() === "") {
		throw new Error("Query cannot be empty");
	}

	const response = await fetch(
		`/api/pexels/search?q=${encodeURIComponent(query)}`,
	);
	if (!response.ok) throw new Error("Failed to fetch artworks");
	const data = await response.json();
	return data;
};
