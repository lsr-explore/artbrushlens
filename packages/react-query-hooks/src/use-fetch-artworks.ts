import { fetchArtworks } from "@artbrushlens/api-fetchers";
import { useQuery } from "@tanstack/react-query";

export const useFetchArtworks = (query: string, enabled = true) => {
	return useQuery({
		queryKey: ["met", "search", query],
		queryFn: () => fetchArtworks(query),
		enabled: enabled && !!query,
	});
};
