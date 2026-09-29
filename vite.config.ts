import adapter from "@sveltejs/adapter-node";
import { sveltekit } from "@sveltejs/kit/vite";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [
		sveltekit({
			adapter: adapter(),
			preprocess: vitePreprocess(),
			experimental: { explicitEnvironmentVariables: true },
		})
	],
	server: {
		proxy: {
			"/api": {
				target: "http://127.0.0.1:8080",
				rewrite: (path) => path.replace(/^\/api/, ""),
				ws: true,
			},
		},
	},
});
