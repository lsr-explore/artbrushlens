import { LoadingSpinner } from "@artbrushlens/palette-studio";
import { useFetchArtworks } from "@artbrushlens/react-query-hooks";
import { LoadingError } from "../Errors";
import { ArtworkGrid } from "./ArtworkGrid";

export const ArtworkGridDataProvider = () => {
	const { data, isLoading, error } = useFetchArtworks("sunflowers");

	if (isLoading) return <LoadingSpinner />;

	if (error) return <LoadingError error={error} />;
	return <ArtworkGrid artworks={data.artworks} />;
};
