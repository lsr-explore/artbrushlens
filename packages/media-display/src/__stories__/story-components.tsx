import type { Artwork } from "@artbrushlens/shared-types";
import React from "react";
import { MediaLayout } from "../components/media-layout";
import { Image, Link } from "./mock-components";

// Story version of ArtworkPanel
export const ArtworkPanelStory = ({ artwork }: { artwork: Artwork }) => {
	return (
		<div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
			<div className="relative aspect-[4/3] h-48 bg-gray-200">
				{artwork.imageUrl ? (
					<Image
						width={600}
						height={0}
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						src={artwork.imageUrl}
						alt={artwork.title}
						className="w-full h-full object-cover"
						onError={(event: { currentTarget: { src: string } }) => {
							console.log("Image failed to load:", artwork.imageUrl);
							event.currentTarget.src =
								"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmaWxsPSIjOTk5Ij5JbWFnZSBOb3QgRm91bmQ8L3RleHQ+PC9zdmc+";
						}}
					/>
				) : (
					<div className="flex items-center justify-center h-full text-4xl text-gray-400">
						🎨
					</div>
				)}
			</div>

			<div className="p-4">
				<h3 className="font-semibold text-lg text-gray-900 mb-1 line-clamp-2">
					{artwork.title}
				</h3>
				<p className="text-gray-600 text-sm mb-2">{artwork.artist}</p>
				<p className="text-gray-500 text-xs mb-4 line-clamp-2">
					{artwork.description}
				</p>

				{/* Action Button */}
				<div className="flex justify-between items-center">
					<Link
						href={`/images/analyze/${artwork.id}?imageUrl=${encodeURIComponent(artwork.imageUrl || "")}&title=${encodeURIComponent(artwork.title)}&artist=${encodeURIComponent(artwork.artist || "")}&description=${encodeURIComponent(artwork.description || "")}&id=${artwork.id}`}
					>
						<button
							type="button"
							className="bg-indigo-500 text-white text-xs px-3 py-1 rounded hover:bg-indigo-600"
						>
							Analyze Image
						</button>
					</Link>

					<span className="text-xs text-gray-400">ID: {artwork.id}</span>
				</div>
			</div>
		</div>
	);
};

// Story version of PhotoPanel
export const PhotoPanelStory = ({ artwork }: { artwork: Artwork }) => {
	return (
		<div
			key={artwork.id}
			className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
			data-testid="artwork-card"
		>
			{/* Image Container */}
			<div className="bg-red-500 p-4">
				{artwork.imageUrl ? (
					<Image
						width={600}
						height={0}
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						src={artwork.imageUrl}
						alt={artwork.title}
						className="w-full h-full object-cover"
						onError={(event: { currentTarget: { src: string } }) => {
							console.log("Image failed to load:", artwork.imageUrl);
							event.currentTarget.src =
								"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmaWxsPSIjOTk5Ij5JbWFnZSBOb3QgRm91bmQ8L3RleHQ+PC9zdmc+";
						}}
					/>
				) : (
					<div className="w-full h-full flex items-center justify-center">
						<span className="text-gray-400 text-4xl">🎨</span>
					</div>
				)}
			</div>

			{/* Content */}
			<div className="p-4">
				<h3 className="font-semibold text-lg text-gray-900 mb-1 line-clamp-2">
					{artwork.title}
				</h3>
				<p className="text-gray-600 text-sm mb-2">{artwork.artist}</p>
				<p className="text-gray-500 text-xs mb-4 line-clamp-2">
					{artwork.description}
				</p>

				{/* Action Button */}
				<div className="flex justify-between items-center">
					<span className="text-xs text-gray-400">ID: {artwork.id}</span>
					<Link
						href={`/images/analyze/${artwork.id}?imageUrl=${encodeURIComponent(artwork.imageUrl || "")}&title=${encodeURIComponent(artwork.title)}&artist=${encodeURIComponent(artwork.artist || "")}&description=${encodeURIComponent(artwork.description || "")}&id=${artwork.id}`}
					>
						<button
							type="button"
							className="button-background text-white text-xs px-4 py-2 rounded hover:bg-indigo-600"
						>
							Analyze Image
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

// Story version of MediaArtContainer
export const MediaArtContainerStory = ({
	data,
	isLoading,
	error,
	source,
}: {
	data?: { total: number; artworks: Artwork[]; mock?: boolean };
	isLoading?: boolean;
	error?: Error | null;
	source?: "paintings" | "photos";
}) => {
	if (isLoading) return <p className="p-6 text-center">Loading...</p>;
	if (error)
		return (
			<p className="p-6 text-center text-red-600">Error: {error.message}</p>
		);
	if (!data || data.artworks.length === 0)
		return <p className="p-6 text-center">No results found.</p>;

	return (
		<MediaLayout
			artworks={data.artworks}
			renderItem={(item: Artwork) =>
				source === "paintings" ? (
					<ArtworkPanelStory key={item.id} artwork={item} />
				) : (
					<PhotoPanelStory key={item.id} artwork={item} />
				)
			}
			title={
				source === "paintings"
					? "Metropolitan Museum of Art Collection"
					: "Pexels Photo Collection"
			}
			subtitle="Discover and analyze beautiful imagery with AI"
		/>
	);
};
