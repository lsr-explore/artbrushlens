import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

// Re-export from react-query-hooks for convenience
export { useFetchArtworks as useMetSearch } from "@artbrushlens/react-query-hooks";
export { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Provider component for the app
export const Providers = ({ children }: { children: React.ReactNode }) => {
	const queryClient = new QueryClient();
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
};
