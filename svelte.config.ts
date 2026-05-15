import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import tailwindcss from "@tailwindcss/vite";
import type { Config } from "@sveltejs/kit";
import adapter from "@sveltejs/adapter-static";
import { mdsvex } from "mdsvex";
import { getMdsvexShikiHighlighter } from "@mistweaverco/mdsvex-shiki";
import type { PreprocessorGroup } from "svelte/compiler";

const mdsvexConfig = mdsvex({
	extension: ".md",
	highlight: {
		highlighter: await getMdsvexShikiHighlighter({
			displayLanguage: true,
			displayPath: true,
		}),
	},
}) as PreprocessorGroup;

const config: Config = {
	kit: {
		prerender: {
			handleMissingId: "ignore",
		},
		adapter: adapter({
			pages: "build",
			assets: "build",
			precompress: true,
			fallback: "404",
			strict: true,
		}),
		alias: {
			$lib: "./src/lib",
		},
		paths: {
			relative: false,
		},
	},
	extensions: [".svelte", ".md"],
	plugins: [tailwindcss()],
	preprocess: [vitePreprocess(), mdsvexConfig],
};

export default config;
