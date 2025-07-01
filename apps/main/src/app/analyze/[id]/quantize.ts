export interface ColorCount {
	color: string; // hex format
	count: number;
	percentage: number;
}

const hexToRgb = (hex) => {
	let alpha = false,
		h = hex.slice(hex.startsWith("#") ? 1 : 0);

	if (h.length === 3) h = [...h].map((x) => x + x).join("");
	else if (h.length === 8) alpha = true;

	h = parseInt(h, 16);

	return [
		h >>> (alpha ? 24 : 16),
		(h & (alpha ? 0x00ff0000 : 0x00ff00)) >>> (alpha ? 16 : 8),
		(h & (alpha ? 0x0000ff00 : 0x0000ff)) >>> (alpha ? 8 : 0),
		alpha ? h & 0x000000ff : 0,
	];
};

// You can tune colorPrecision to group similar shades:

// 256 = no quantization (every RGB value kept as-is)

// 32 = reduces to ~30,000 distinct colors

// 8 or 4 = buckets similar tones

// This isn't as sophisticated as median cut or [k-means clustering], but it's fast and works well in browsers.
export function quantizeImageData(
	imageData: ImageData,
	maxColors = 20,
	colorPrecision = 32, // bits per channel to keep (256 means no quantization, lower = more rounding)
): ColorCount[] {
	const { data, width, height } = imageData;
	const totalPixels = width * height;
	const colorMap = new Map<string, number>();

	const quantize = (value: number, precision: number) => {
		const step = 256 / precision;
		return Math.floor(value / step) * step;
	};

	for (let i = 0; i < data.length; i += 4) {
		const r = data[i];
		const g = data[i + 1];
		const b = data[i + 2];
		const a = data[i + 3];
		if (a < 128) continue; // Skip transparent pixels

		// Apply quantization
		const qr = quantize(r, colorPrecision);
		const qg = quantize(g, colorPrecision);
		const qb = quantize(b, colorPrecision);

		const hex = rgbToHex(qr, qg, qb);
		colorMap.set(hex, (colorMap.get(hex) || 0) + 1);
	}

	const entries: ColorCount[] = Array.from(colorMap.entries())
		.map(([color, count]) => ({
			color,
			rgb: hexToRgb(color),
			count,
			percentage: +((count / totalPixels) * 100).toFixed(2),
		}))
		.sort((a, b) => b.count - a.count)
		.slice(0, maxColors);

	return entries;
}

function rgbToHex(r: number, g: number, b: number): string {
	return `#${[r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("")}`;
}
