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

declare module '*?inline' {
	const html: string;
	export default html;
}

declare module '*?raw' {
	const html: string;
	export default html;
}

declare module '*.png' {
	const url: string;
	export default url;
}

declare module '*.jpg' {
	const url: string;
	export default url;
}
