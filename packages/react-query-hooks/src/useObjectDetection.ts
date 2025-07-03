import { postDetectObjects } from "@artbrushlens/api-fetchers";
import { postAnalyzeArt } from "@artbrushlens/api-fetchers/postAnalyzeArt";
import type { Artwork } from "@artbrushlens/shared-types";
import { useMutation } from "@tanstack/react-query";

export const useDetectObjects = () => {
	return useMutation({
		mutationFn: (artwork: Artwork) => postDetectObjects(artwork),
	});
};
