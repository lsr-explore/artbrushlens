// packages/react-query-hooks/src/useAnalyzeArt.ts

import { postAnalyzeArt } from "@artbrushlens/api-fetchers";
import type { Artwork } from "@artbrushlens/shared-types";
import { useMutation } from "@tanstack/react-query";

export const useAnalyzeArt = () => {
	return useMutation({
		mutationFn: (artwork: Artwork) => postAnalyzeArt(artwork),
	});
};
