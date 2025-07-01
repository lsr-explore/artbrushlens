"use client";

import { useState } from "react";
import { ArtworkGrid } from "../components/ArtworkGrid";
import { Providers } from "../components/Providers";
import { PhotoGrid } from "../components/PhotoGrid";

export default function Home() {
	const [selectedOption, setSelectedOption] = useState("photo");

	const handleChange = (event) => {
		setSelectedOption(event.target.value);
	};

	return (
		<main className="container mx-auto px-4 py-8">
			<h1 className="text-4xl font-bold mb-8">ArtBrushLens</h1>
			<Providers>
				<select value={selectedOption} onChange={handleChange}>
					<option value="art">Museum Artwork</option>
					<option value="photo">Pexels Photography</option>
				</select>
				{selectedOption === "art" ? <ArtworkGrid /> : <PhotoGrid />}
			</Providers>
		</main>
	);
}
