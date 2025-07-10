"use client";

import type { Artwork } from "@artbrushlens/shared-types";
import { createContext } from "react";

type SourceType = "paintings" | "photos";

type MediaSourceContextType = {
	source: SourceType;
	// query: string;
	data: { total: number; artworks: Artwork[]; mock?: boolean } | undefined;
	isLoading: boolean;
	error: Error | null;
	// setSource: (src: SourceType) => void;
	// setQuery: (q: string) => void;
};

export const MediaSourceContext = createContext<
	MediaSourceContextType | undefined
>(undefined);
