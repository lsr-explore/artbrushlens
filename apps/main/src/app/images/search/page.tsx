"use client";
import {
	MediaArtContainer,
	MediaSourceProvider,
} from "@artbrushlens/media-display";
import { Providers } from "data-providers";
import React, { type SetStateAction, useState } from "react";

const Home = () => {
	const [selectedOption, setSelectedOption] = useState("photo");

	const handleChange = (event: {
		target: { value: SetStateAction<string> };
	}) => {
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
				<MediaSourceProvider>
					<MediaArtContainer />
				</MediaSourceProvider>
			</Providers>
		</main>
	);
};

export default Home;
