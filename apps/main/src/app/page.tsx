"use client";

import Image from "next/image";
import React, { useState } from "react";

const LandingPage = () => {
	const [paintingSearch, setPaintingSearch] = useState("");
	const [photoSearch, setPhotoSearch] = useState("");

	return (
		<div className="flex flex-col">
			{/* Hero Section */}
			<div className="flex flex-col items-center justify-center flex-grow px-4 py-12">
				<div className="text-center mb-12">
					<h1 className="text-4xl font-bold mb-4">Discover New Perspectives</h1>
					<p className="text-gray-600 max-w-xl mx-auto">
						ArtLoupe.ai blends human creativity with AI intelligence to uncover
						hidden patterns, aesthetic styles, and deeper meaning in paintings
						and photographs.
					</p>
				</div>

				{/* Search Panels */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
					{/* Painting Panel */}
					<div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
						<div className="relative h-[300px] w-full max-w-[600px] mx-auto">
							<Image
								src="/landing-page/winslow-homer.jpg"
								alt="A wall by the water with green shrub and red flowers and a sailboat in the distance"
								className="w-full h-64 object-cover rounded"
								fill
							/>
						</div>
						<figcaption className="text-xs text-gray-500 mt-2">
							<div className="flex flex-row">
								<div className="w-2/3 ">
									<em>A Wall, Nassau</em> by Winslow Homer, 1898. Courtesy of{" "}
									<a
										href="https://www.metmuseum.org/art/collection/search/11147"
										target="_blank"
										rel="noopener noreferrer"
										className="underline hover:text-blue-600"
									>
										The Metropolitan Museum of Art
									</a>
									.
								</div>
								<div className="flex w-1/3 justify-end">
									<span>
										<Image
											src="/open-access-logo.svg"
											alt=""
											width={16}
											height={16}
											className="inline-block align-middle"
										/>{" "}
										<span className="align-middle">
											<a
												href="https://creativecommons.org/public-domain/cc0/"
												target="_blank"
												rel="noopener noreferrer"
												className="underline hover:text-blue-600"
											>
												Public Domain
											</a>
										</span>
									</span>
								</div>
							</div>
						</figcaption>
						<div className="mt-4 w-full flex items-center gap-2">
							<input
								type="text"
								maxLength={25}
								placeholder="Filter by keyword..."
								value={paintingSearch}
								onChange={(e) => setPaintingSearch(e.target.value)}
								className="flex-grow border rounded px-3 py-2 text-sm"
							/>
							<button
								type="button"
								className="px-4 py-2 text-sm font-semibold bg-blue-600 text-white rounded hover:bg-blue-700"
							>
								Explore Art
							</button>
						</div>
					</div>

					{/* Photo Panel */}
					<div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
						<div className="relative h-[300px] w-full max-w-[600px] mx-auto">
							<Image
								src="/landing-page/pexels-jokassis-5881933.jpg"
								alt="Golden Gate Bridge"
								className="w-full h-64 object-cover rounded"
								fill
							/>
						</div>
						<figcaption className="text-xs text-gray-500 mt-2">
							<em>Golden Gate Bridge, San Francisco, California</em> by{" "}
							<a
								href="https://www.pexels.com/photo/golden-gate-bridge-san-francisco-california-5881933/"
								target="_blank"
								rel="noopener noreferrer"
								className="underline hover:text-blue-600"
							>
								Jo Kassis
							</a>
							. Used under{" "}
							<a
								href="https://creativecommons.org/licenses/by/4.0/"
								target="_blank"
								rel="noopener noreferrer"
								className="underline hover:text-blue-600"
							>
								CC BY 4.0
							</a>
							.{" "}
							<Image
								src="creative-commons-logo.svg"
								alt="CC BY"
								className="inline-block align-middle "
								width={16}
								height={16}
							/>
						</figcaption>
						<div className="mt-4 w-full flex items-center gap-2">
							<input
								type="text"
								maxLength={25}
								placeholder="Filter by keyword..."
								value={photoSearch}
								onChange={(e) => setPhotoSearch(e.target.value)}
								className="flex-grow border rounded px-3 py-2 text-sm"
							/>
							<button
								type="button"
								className="px-4 py-2 text-sm font-semibold bg-green-600 text-white rounded hover:bg-green-700"
							>
								Explore Photos
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LandingPage;
