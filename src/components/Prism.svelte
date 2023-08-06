<script lang="ts">
	import Prism from 'prismjs';
	import 'prismjs/components/prism-jsx';
	import 'prismjs/components/prism-css';
	import 'prismjs/components/prism-diff';
	import 'prismjs/components/prism-markup-templating';
	import 'prismjs/components/prism-twig';
	import { afterUpdate } from 'svelte';

	let container: HTMLDivElement;

	afterUpdate(() => {
		Prism.highlightAllUnder(container, false);
	});
</script>

<div bind:this={container}>
	<slot />
</div>

<style>
	div {
		display: contents;
	}
	div > :global(:first-child) {
		margin-top: 0;
	}

	/**
    * prism.js default theme for JavaScript, CSS and HTML
    * Based on dabblet (http://dabblet.com)
    * @author Lea Verou
    *
    * https://github.com/AGMStudio/prism-theme-one-dark
    */
	:global(pre) {
		font-size: 1rem;
		padding: 1em;
		margin: 0.5em 0;
		color: #abb2bf;
		background: #282c34;
		overflow: auto;
	}
	:global(code[class*='language-'], pre[class*='language-']) {
		color: #abb2bf;
		background: none;
		font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
		text-align: left;
		white-space: pre;
		word-spacing: normal;
		word-break: normal;
		word-wrap: normal;
		line-height: 1.5;
		-moz-tab-size: 4;
		-o-tab-size: 4;
		tab-size: 4;
		-webkit-hyphens: none;
		-moz-hyphens: none;
		-ms-hyphens: none;
		hyphens: none;
	}

	:global(
			pre[class*='language-']::-moz-selection,
			pre[class*='language-'] ::-moz-selection,
			code[class*='language-']::-moz-selection,
			code[class*='language-'] ::-moz-selection
		) {
		text-shadow: none;
		background: #383e49;
	}

	:global(
			pre[class*='language-']::selection,
			pre[class*='language-'] ::selection,
			code[class*='language-']::selection,
			code[class*='language-'] ::selection
		) {
		text-shadow: none;
		background: #383e49;
	}

	@media print {
		:global(code[class*='language-'], pre[class*='language-']) {
			text-shadow: none;
		}
	}
	/* Code blocks */
	:global(pre[class*='language-']) {
		padding: 1em;
		margin: 1em 0;
		overflow: auto;
	}

	:global(:not(pre) > code[class*='language-'], pre[class*='language-']) {
		background: #282c34;
	}

	:global(code[class*='language-']) {
		tab-size: 2;
	}

	/* Inline code */
	:global(:not(pre) > code[class*='language-']) {
		padding: 0.1em;
		border-radius: 0.3em;
		white-space: normal;
	}

	:global(.token.comment, .token.prolog, .token.doctype, .token.cdata) {
		color: #7e8694;
	}

	:global(.token.punctuation) {
		color: #abb2bf;
	}

	:global(.token.selector, .token.tag) {
		color: #e06c75;
	}

	:global(
			.token.property,
			.token.boolean,
			.token.number,
			.token.constant,
			.token.symbol,
			.token.attr-name,
			.token.deleted
		) {
		color: #d19a66;
	}

	:global(.token.string, .token.char, .token.attr-value, .token.builtin, .token.inserted) {
		color: #98c379;
	}

	:global(
			.token.operator,
			.token.entity,
			.token.url,
			.language-css .token.string,
			.style .token.string
		) {
		color: #56b6c2;
	}

	:global(.token.atrule, .token.keyword) {
		color: #c678dd;
	}

	:global(.token.function) {
		color: #61afef;
	}

	:global(.token.regex, .token.important, .token.variable) {
		color: #c678dd;
	}

	:global(.token.important, .token.bold) {
		font-weight: bold;
	}

	:global(.token.italic) {
		font-style: italic;
	}

	:global(.token.entity) {
		cursor: help;
	}

	:global(pre.line-numbers) {
		position: relative;
		padding-left: 6.8em;
		counter-reset: linenumber;
	}

	:global(pre.line-numbers > code) {
		position: relative;
	}

	:global(.line-numbers .line-numbers-rows) {
		position: absolute;
		pointer-events: none;
		top: -0.2em;
		font-size: 1em;
		left: -3rem;
		width: 2rem; /* works for line-numbers below 1000 lines */
		letter-spacing: -1px;

		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;

		border-right: 1px solid #383e47;
	}

	:global(.line-numbers-rows > span) {
		pointer-events: none;
		display: block;
		counter-increment: linenumber;
	}

	:global(.line-numbers-rows > span:before) {
		content: counter(linenumber);
		color: #5c6370;
		display: block;
		text-align: center;
	}

	@media screen and (min-width: 52em) {
		:global(.line-numbers .line-numbers-rows) {
			left: -6rem;
			width: 3rem; /* works for line-numbers below 1000 lines */
		}

		:global(code[class*='language-']) {
			tab-size: 4;
		}
	}
</style>
