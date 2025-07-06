import React from 'react';
import { LoadingSpinner } from "@artbrushlens/palette-studio";
import { useMetSearch } from "data-providers";
import { LoadingError } from "../Errors";
import { ArtworkGrid } from "./ArtworkGrid";

export const ArtworkGridDataProvider = () => {
	const { data, isLoading, error } = useMetSearch("sunflowers");

	if (isLoading) return <LoadingSpinner />;

	if (error) return <LoadingError error={error} />;
	return <ArtworkGrid artworks={data.artworks} />;
};
