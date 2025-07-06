import React from 'react';
import { LoadingSpinner } from "@artbrushlens/palette-studio";
import { useFetchPhotoWorks } from "@artbrushlens/react-query-hooks";
import { LoadingError } from "../Errors";
import { PhotoGrid } from "./PhotoGrid";

export const PhotoGridDataProvider = () => {
	const { data, isLoading, error } = useFetchPhotoWorks("city street");

	if (isLoading) return <LoadingSpinner />;

	if (error) return <LoadingError error={error} />;
	return <PhotoGrid photos={data.artworks} />;
};
