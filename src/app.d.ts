// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
}

declare module '*.md' {
	// "unknown" would be more detailed depends on how you structure frontmatter
	const attributes: Record<string, unknown>;

	// When "Mode.TOC" is requested
	const toc: { level: string; content: string }[];

	// When "Mode.HTML" is requested
	const html: string;

	// Modify below per your usage
	export { attributes, toc, html };
}

export {};
