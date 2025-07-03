// packages/react-query-hooks/src/useAnalyzeArtwork.ts

import { postAnalyzeArt } from "@artbrushlens/api-fetchers";
import type { Artwork } from "@artbrushlens/shared-types";
import { useMutation } from "@tanstack/react-query";

export const useAnalyzeArtwork = () => {
	return useMutation({
		mutationFn: (artwork: Artwork) => postAnalyzeArt(artwork),
	});
};
