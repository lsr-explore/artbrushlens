"use client";

import {
	useFetchArtworks,
	useFetchPhotoWorks,
} from "@artbrushlens/react-query-hooks";
import React, { type ReactNode, useMemo, useState } from "react";
import { MediaSourceContext } from "./media-source-context";

type SourceType = "met" | "pexels";

export const MediaSourceProvider = ({ children }: { children: ReactNode }) => {
	const [source, setSource] = useState<SourceType>("pexels");
	const [query, setQuery] = useState<string>("sunflowers");

	const {
		data: metData,
		isLoading: loadingMet,
		error: errorMet,
	} = useFetchArtworks(query, source === "met");

	const {
		data: pexelsData,
		isLoading: loadingPexels,
		error: errorPexels,
	} = useFetchPhotoWorks(query, source === "pexels");

	const data = source === "met" ? metData : pexelsData;
	const isLoading = source === "met" ? loadingMet : loadingPexels;
	const error = source === "met" ? errorMet : errorPexels;

	console.log("Provider....data = ", data);
	console.log("Provider....typeof data = ", typeof data);

	const value = useMemo(
		() => ({ source, query, data, isLoading, error, setSource, setQuery }),
		[source, query, data, isLoading, error],
	);

	return (
		<MediaSourceContext.Provider value={value}>
			{children}
		</MediaSourceContext.Provider>
	);
};
