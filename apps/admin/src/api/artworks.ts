// apps/admin/src/lib/api/artworks.ts
export async function fetchAdminArtworks() {
  const res = await fetch("/api/artworks");
  if (!res.ok) throw new Error("Failed to load artworks");
  return res.json();
}
