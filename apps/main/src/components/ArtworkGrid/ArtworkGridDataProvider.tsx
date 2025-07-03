import { LoadingSpinner } from "@artbrushlens/palette-studio";
import { useSearchArtworks } from "@artbrushlens/react-query-hooks";
import { LoadingError } from "../Errors";
import { ArtworkGrid } from "./ArtworkGrid";

export const ArtworkGridDataProvider = () => {
	const { data, isLoading, error } = useSearchArtworks("sunflowers");

	if (isLoading) return <LoadingSpinner />;

	if (error) return <LoadingError error={error} />;
	return <ArtworkGrid artworks={data.artworks} />;
};
