"use client";

import React from "react";
import { useMediaSource } from "../media-source-hook";
import { ArtworkPanel } from "./artwork-panel";
import { MediaLayout } from "./media-layout";
import { PhotoPanel } from "./photo-panel";

export const MediaArtContainer = () => {
	const { data, isLoading, error, source } = useMediaSource();

	if (isLoading) return <p className="p-6 text-center">Loading...</p>;
	if (error)
		return (
			<p className="p-6 text-center text-red-600">Error: {error.message}</p>
		);
	if (!data || data.artworks.length === 0)
		return <p className="p-6 text-center">No results found.</p>;

	console.log("container....data =", data);
	console.log("container....typeof data =", typeof data);
	console.log("container....Object.keys(data) =", Object.keys(data));

	return (
		<MediaLayout
			artworks={data.artworks}
			renderItem={(item) =>
				source === "met" ? (
					<ArtworkPanel key={item.id} artwork={item} />
				) : (
					<PhotoPanel key={item.id} artwork={item} />
				)
			}
			title={
				source === "met" ? "Met Art Collection" : "Pexels Photo Collection"
			}
			subtitle="Discover and analyze beautiful imagery with AI"
		/>
	);
};
