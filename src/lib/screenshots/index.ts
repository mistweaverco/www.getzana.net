import fs from "fs";
import { globSync } from "glob";
import YAML from "yaml";
import { render } from "svelte/server";

import type { Component } from "svelte";

export interface TapeMarkdownDataMetadata {
	title: string;
	url: string;
	link?: string;
}

export interface TapeMarkdownData {
	path: string;
	metadata: TapeMarkdownDataMetadata;
	content: string;
}

interface TapeModule {
	default: {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-empty-object-type
		component: Component<any, {}, string>;
	};
	metadata: TapeMarkdownDataMetadata;
}

const ALL_TAPE_FILES = import.meta.glob<TapeModule>("/tapes/*/*/tape-data-*.md", {
	eager: false,
});

/**
 * Fetch all screenshots markdown definition files
 * @returns A promise that resolves to an array of ScreenshotMarkdownData
 */
export const getAllTapesByPathPrefix = async (pathPrefix: string): Promise<TapeMarkdownData[]> => {
	const iterableTapeFiles = Object.entries(ALL_TAPE_FILES);
	const allTapes = await Promise.all(
		iterableTapeFiles.map(async ([p, resolver]) => {
			const md = await resolver();
			const metadata = md.metadata;
			return {
				metadata,
				path: p,
				// @ts-expect-error - render function exists
				content: render(md.default, { props: {} }).body,
			};
		}),
	);

	return allTapes.filter((s) => s.path.startsWith(`/tapes/${pathPrefix}`));
};

const CategoryData = {
	cli: globSync("tapes/cli/*/index.yaml"),
};

export enum CategoryName {
	CLI = "CLI",
}

interface CategoryItemData {
	title: string;
	name: string;
	icon: string;
	url?: string;
	tapes: TapeMarkdownData[];
}

export const getCategoryData = async (category: CategoryName): Promise<CategoryItemData[]> => {
	let allData;
	let categoryType;
	switch (category) {
		case CategoryName.CLI:
			allData = CategoryData.cli;
			categoryType = "cli";
			break;
		default:
			allData = CategoryData.cli;
			categoryType = "cli";
			break;
	}
	return await Promise.all(
		allData.map(async (p) => {
			const file = fs.readFileSync(p, "utf8");
			const d = YAML.parse(file);
			d.tapes = await getAllTapesByPathPrefix(categoryType + "/" + d.name.toLowerCase());
			return d;
		}),
	);
};
