/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
	},
	images: {
		domains: ["images.metmuseum.org"],
	},
	env: {
		CUSTOM_KEY: process.env.CUSTOM_KEY,
	},
};

module.exports = nextConfig;
