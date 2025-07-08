import { fetchPhotoWorks } from "@artbrushlens/api-fetchers";
import { useQuery } from "@tanstack/react-query";

export const useFetchPhotoWorks = (query: string, enabled = true) => {
	return useQuery({
		queryKey: ["pexels", "search", query],
		queryFn: () => fetchPhotoWorks(query),
		enabled: enabled && !!query,
	});
};
