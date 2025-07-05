import { resolve } from "path";
import { defineConfig } from "vitest/config";

export const createVitestConfig = (packagePath: string) =>
	defineConfig({
		test: {
			environment: "jsdom",
			globals: true,
			setupFiles: [resolve(__dirname, "test-setup.ts")],
			coverage: {
				provider: "v8",
				reporter: ["text", "json", "html"],
				exclude: [
					"node_modules/",
					"dist/",
					"**/*.d.ts",
					"**/*.config.*",
					"**/test-setup.ts",
					"**/__mocks__/**",
					"**/__tests__/**",
					"**/index.ts",
					"**/mocks/**",
				],
			},
		},
		resolve: {
			alias: {
				"@": resolve(packagePath, "src"),
			},
		},
	});
