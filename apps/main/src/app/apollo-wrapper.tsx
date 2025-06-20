"use client";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
	uri: process.env.NEXT_PUBLIC_GRAPHQL_URL || "http://localhost:4000/graphql",
	cache: new InMemoryCache(),
	defaultOptions: {
		watchQuery: {
			errorPolicy: "all",
		},
		query: {
			errorPolicy: "all",
		},
	},
});

console.log("🔍 Apollo Client configured with URI:", client.link);

export function ApolloWrapper({ children }: { children: React.ReactNode }) {
	return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
