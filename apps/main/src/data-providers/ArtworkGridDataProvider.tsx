import { LoadingSpinner } from "@artbrushlens/palette-studio";
import { useMetSearch } from "data-providers";
import React from "react";
import { ArtworkGrid } from "../components/ArtworkGrid/ArtworkGrid";
import { LoadingError } from "../components/Errors";

export const ArtworkGridDataProvider = () => {
	const { data, isLoading, error } = useMetSearch("sunflowers");

	if (isLoading) return <LoadingSpinner />;

	if (error) return <LoadingError error={error} />;
	return <ArtworkGrid artworks={data.artworks} />;
};
