export const fetchAdminArtworks = async () => {
	const res = await fetch("/api/artworks");
	if (!res.ok) throw new Error("Failed to load artworks");
	return res.json();
};
