import { useQuery } from "@tanstack/react-query";
import { fetchArtworks } from "@artanalysis/api-fetchers";

export const useSearchArtworks = (query: string, enabled = true) => {
	return useQuery({
		queryKey: ["met", "search", query],
		queryFn: () => fetchArtworks(query),
		enabled: enabled && !!query,
	});
};
