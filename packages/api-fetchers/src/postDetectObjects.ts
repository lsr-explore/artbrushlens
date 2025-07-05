export const postDetectObjects = async (imageData: ArrayBuffer) => {
	if (!imageData || imageData.byteLength === 0) {
		throw new Error("Invalid image data");
	}

	const res = await fetch("/api/ai/detect-objects", {
		method: "POST",
		headers: { "Content-Type": "application/octet-stream" },
		body: imageData,
	});

	const data = await res.json();
	if (!res.ok) throw new Error(data.error || "Failed to detect objects");

	return data.objects;
};
