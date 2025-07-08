export const fetchPhotoWorks = async (query: string) => {
	if (!query || query.trim() === '') {
		throw new Error("Query cannot be empty");
	}

	const res = await fetch(`/api/pexels/search?q=${encodeURIComponent(query)}`);
	if (!res.ok) throw new Error("Failed to fetch artworks");
	const data = await res.json();
	return data;
};
