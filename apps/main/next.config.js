/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
	},
	images: {
		domains: [
			"images.metmuseum.org",
			"upload.wikimedia.org",
			"uploads7.wikiart.org",
		],
	},
	env: {
		CUSTOM_KEY: process.env.CUSTOM_KEY,
	},
	// Override the default webpack configuration
	webpack: (config) => {
		// See https://webpack.js.org/configuration/resolve/#resolvealias
		config.resolve.alias = {
			...config.resolve.alias,
			sharp$: false,
			"onnxruntime-node$": false,
		};
		return config;
	},
};

module.exports = nextConfig;
