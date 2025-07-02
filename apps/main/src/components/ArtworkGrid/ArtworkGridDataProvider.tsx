import { useSearchArtworks } from "@artanalysis/react-query-hooks";
import { ArtworkGrid } from "./ArtworkGrid";
import { LoadingSpinner } from "@artanalysis/palette-studio";
import { LoadingError } from "../Errors";

export const ArtworkGridDataProvider = () => {
	const { data, isLoading, error } = useSearchArtworks("sunflowers");

	if (isLoading) return <LoadingSpinner />;

	if (error) return <LoadingError error={error} />;
	return <ArtworkGrid artworks={data.artworks} />;
};
