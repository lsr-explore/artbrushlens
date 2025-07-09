"use client";
import React from "react";
import Masonry from "react-masonry-css";

import "./media-layout.css";

const breakpointColsObj = {
	default: 4,
	1100: 3,
	700: 2,
	500: 1,
};

export type MediaLayoutProps<T> = {
	artworks: T[];
	renderItem: (item: T) => React.ReactNode;
	title?: string;
	subtitle?: string;
	emptyMessage?: string;
	layout?: "grid" | "masonry";
};

export const MediaLayout = <T,>({
	artworks,
	renderItem,
	title = "Media Collection",
	subtitle,
	emptyMessage = "No items found.",
}: MediaLayoutProps<T>) => {
	if (!artworks || artworks.length === 0) {
		return (
			<div className="text-center p-12">
				<div className="text-gray-400 text-6xl mb-4">🎨</div>
				<h3 className="text-lg font-medium text-gray-900 mb-2">
					{emptyMessage}
				</h3>
			</div>
		);
	}

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			{title && (
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
					{subtitle && <p className="text-gray-600">{subtitle}</p>}
				</div>
			)}

			<Masonry
				breakpointCols={breakpointColsObj}
				className="my-masonry-grid"
				columnClassName="my-masonry-grid_column"
			>
				{artworks.map(renderItem)}
			</Masonry>

			<div className="mt-12 text-center">
				<p className="text-gray-500 text-sm">
					Showing {artworks.length} {title?.toLowerCase() || "items"}
				</p>
			</div>
		</div>
	);
};
