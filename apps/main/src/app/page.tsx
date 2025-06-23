import { ArtworkGrid } from "../components/ArtworkGrid";
import { Providers } from "../components/Providers";

export default function Home() {
	return (
		<main className="container mx-auto px-4 py-8">
			<h1 className="text-4xl font-bold mb-8">ArtBrushLens</h1>
			<Providers>
				<ArtworkGrid />
			</Providers>
		</main>
	);
}
