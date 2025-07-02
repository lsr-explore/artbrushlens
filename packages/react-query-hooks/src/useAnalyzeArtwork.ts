// packages/react-query-hooks/src/useAnalyzeArtwork.ts

import { postAnalyze } from "@artanalysis/api-fetchers/postAnalyze";
import type { Artwork } from "@artanalysis/shared-types";
import { useMutation } from "@tanstack/react-query";

export const useAnalyzeArtwork = () => {
	return useMutation({
		mutationFn: (artwork: Artwork) => postAnalyze(artwork),
	});
};
