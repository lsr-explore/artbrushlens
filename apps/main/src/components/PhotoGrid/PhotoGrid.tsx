"use client";
import React from 'react';

import type { Artwork } from "@artbrushlens/shared-types";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Masonry from "react-masonry-css";

const breakpointColsObj = {
	default: 4,
	1100: 3,
	700: 2,
	500: 1,
};

export const PhotoGrid = ({ photos }: { photos: Artwork[] }) => {
	const [analyzingId, setAnalyzingId] = useState<string | null>(null);
	const [analyzeResults, setAnalyzeResults] = useState<string | null>(null);

	const analyzeArtwork = async (artwork: Artwork) => {
		setAnalyzingId(artwork.id);
		setAnalyzeResults(null);

		const res = await fetch("/api/ai/analyze", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(artwork),
		});

		const data = await res.json();

		if (!res.ok) {
			setAnalyzingId(null);
			throw new Error(data.error || "Failed to analyze artwork");
		}

		console.log("AI Analysis Result:", data.result);
		setAnalyzeResults(data.result);

		// You may also want to update the artwork's local state to include the AI result (optional)
		return data.result;
	};

	if (!photos || photos.length === 0) {
		return (
			<div className="text-center p-12">
				<div className="text-gray-400 text-6xl mb-4">🎨</div>
				<h3 className="text-lg font-medium text-gray-900 mb-2">
					No artworks found
				</h3>
				<p className="text-gray-500">
					Check your server connection and try again.
				</p>
			</div>
		);
	}

	return (
		<div
			className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
			data-testid="photo-grid"
		>
			<div className="mb-8">
				<h1 className="text-3xl font-bold text-gray-900 mb-2">
					Photo Collection
				</h1>
				<p className="text-gray-600">
					Discover and analyze beautiful photos with AI
				</p>
			</div>

			<Masonry
				breakpointCols={breakpointColsObj}
				className="my-masonry-grid"
				columnClassName="my-masonry-grid_column"
			>
				{photos.map((artwork: Artwork) => (
					<div
						key={artwork.id}
						className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
						data-testid="artwork-card"
					>
						{/* Image Container */}
						<div className="bg-gray-200">
							{artwork.imageUrl ? (
								<Image
									width={600}
									height={0}
									sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
									src={artwork.imageUrl}
									alt={artwork.title}
									className="w-full h-full object-cover"
									onError={(e: { currentTarget: { src: string } }) => {
										console.log("Image failed to load:", artwork.imageUrl);
										e.currentTarget.src =
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

							{/* AI Analysis Section */}
							{analyzeResults && analyzingId === artwork.id && (
								<div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
									<h4 className="text-sm font-medium text-blue-900 mb-2 flex items-center">
										<span className="mr-1">🤖</span>
										AI Analysis
									</h4>
									<p className="text-blue-800 text-xs leading-relaxed">
										{analyzeResults}
									</p>
								</div>
							)}

							{/* Action Button */}
							<div className="flex justify-between items-center">
								<button
									type="button"
									onClick={() => analyzeArtwork(artwork)}
									disabled={analyzingId === artwork.id || !!artwork.aiAnalysis}
									className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
										artwork.aiAnalysis
											? "bg-green-100 text-green-700 cursor-not-allowed"
											: analyzingId === artwork.id
												? "bg-gray-100 text-gray-500 cursor-not-allowed"
												: "bg-blue-600 text-white hover:bg-blue-700"
									}`}
								>
									{analyzingId === artwork.id && !analyzeResults ? (
										<span className="flex items-center">
											<svg
												className="animate-spin -ml-1 mr-2 h-3 w-3 text-gray-500"
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
											>
												<title>Analyzing...</title>
												<circle
													className="opacity-25"
													cx="12"
													cy="12"
													r="10"
													stroke="currentColor"
													strokeWidth="4"
												></circle>
												<path
													className="opacity-75"
													fill="currentColor"
													d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
												></path>
											</svg>
											Analyzing...
										</span>
									) : analyzeResults && analyzingId === artwork.id ? (
										"✓ Analyzed"
									) : (
										"🤖 AI Analysis"
									)}
								</button>

								<Link
									href={`/images/analyze/${artwork.id}?imageUrl=${encodeURIComponent(artwork.imageUrl || "")}&title=${encodeURIComponent(artwork.title)}&artist=${encodeURIComponent(artwork.artist || "")}&description=${encodeURIComponent(artwork.description || "")}&id=${artwork.id} || ""}`}
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
				))}{" "}
			</Masonry>

			{/* Footer */}
			<div className="mt-12 text-center">
				<p className="text-gray-500 text-sm">
					Showing {photos.length} artworks • Powered by Pexel&apos;s API.
				</p>
			</div>
		</div>
	);
};
