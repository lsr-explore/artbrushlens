/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/**/*.{js,ts,jsx,tsx}",
		"../../packages/**/*.{js,ts,jsx,tsx}",
	],
	safelist: [
		"md:grid-cols-2", // 👈 manually force this to stay in build
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
		},
	},

	plugins: [],
};
