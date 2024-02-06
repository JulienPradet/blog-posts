<script>
	import Navigation from '../../layout/Navigation.svelte';
</script>

<div class="page">
	<header id="top" tabIndex="-1">
		<a href="#main" class="screen-reader screen-reader-focusable">Contenu principal</a>
		<Navigation />
	</header>

	<main id="main" class="main" tabIndex="-1">
		<slot />
	</main>

	<footer>
		<a href="#top">Revenir en haut</a>
		<a href="#main" class="screen-reader screen-reader-focusable">Contenu principal</a>
	</footer>
</div>

<style>
	.page {
		--global-margin: 1rem;
		--color-white: #fffdfd;
		--color-creme: #fff7f1;
		--color-border: rgb(24 23 22 / 15%);
		--color-dark: #181716;
		--color-dark-lighter: #18171690;
		--color-primary: rgb(207 58 0);
		padding: 1rem var(--global-margin);
		line-height: 1.55;
		background: var(--color-creme);
		color: var(--color-dark);
	}
	@media (min-width: 30rem) {
		.page {
			padding-top: 3rem;
		}
	}

	.page :global(h1),
	.page :global(.h1) {
		font-size: 2.488rem;
	}

	.page :global(h2),
	.page :global(.h2) {
		margin-top: 1.5em;
		margin-bottom: 0;
		font-size: 2.074rem;
		line-height: 1.3;
	}

	.page :global(h3),
	.page :global(.h3) {
		margin-top: 1.5em;
		margin-bottom: 0;
		font-size: 1.728rem;
		line-height: 1.3;
	}

	.page :global(h4),
	.page :global(.h4) {
		margin-top: 1.5em;
		margin-bottom: 0;
		font-size: 1.44rem;
		line-height: 1.4;
	}

	.page :global(h5) {
		margin-top: 1.5em;
		margin-bottom: 0;
		line-height: 1.5;
		font-size: 1.2rem;
	}

	.page :global(li > :first-child) {
		margin-top: 0;
	}
	.page :global(li > :last-child) {
		margin-bottom: 0;
	}

	.page :global(.small) {
		font-size: 0.9rem;
	}

	.page :global(a),
	.page :global(.link) {
		appearance: none;
		padding: 0;
		background: none;
		border: none;
		font: inherit;
		color: inherit;
		text-decoration: underline;
		text-decoration-thickness: 1px;
		text-underline-offset: 0.4em;
		text-decoration-color: rgb(118 114 110 / 50%);
		transition:
			opacity 0.15s ease-in-out,
			text-decoration-color 0.15s ease-in-out,
			text-decoration-thickness 0.15s ease-in-out,
			text-decoration-offset 0.15s ease-in-out;
		cursor: pointer;
	}

	.page :global(a:hover),
	.page :global(a:focus),
	.page :global(.link:hover),
	.page :global(.link:focus) {
		opacity: 0.8;
		text-decoration-color: rgb(118 114 110 / 100%);
		text-decoration-thickness: 2px;
		text-underline-offset: calc(0.4em - 2px);
		outline-offset: 0.25rem;
	}
	.main :global(a),
	.main :global(.link) {
		text-decoration-color: rgb(207 58 0 / 50%);
		color: rgb(207 58 0);
	}

	.main :global(a::selection),
	.main :global(.link::selection) {
		background: rgb(207 58 0 / 80%);
	}
	.main :global(a:hover),
	.main :global(a:focus),
	.main :global(.link:hover),
	.main :global(.link:focus) {
		text-decoration-color: rgb(207 58 0 / 100%);
	}

	.page :global(strong) {
		position: relative;
		display: inline;
		font-weight: var(--weight-bold);
	}

	.page :global(blockquote) {
		margin-left: 0;
		padding-left: 1rem;
		border-left: 3px solid var(--color-border);
	}

	.page :global(kbd) {
		background-color: #eee;
		border-radius: 3px;
		border: 1px solid #b4b4b4;
		box-shadow:
			0 1px 1px rgba(0, 0, 0, 0.2),
			0 2px 0 0 rgba(255, 255, 255, 0.7) inset;
		color: #333;
		display: inline-block;
		font-size: 0.85em;
		font-weight: var(--weight-black);
		line-height: 1.5;
		padding: 2px 4px 0;
		white-space: nowrap;
	}

	.page :global(table) {
		border-collapse: collapse;
		margin: 2rem auto;
	}
	.page :global(th),
	.page :global(td) {
		padding: 0.25rem 1rem;
		border: 1px solid var(--color-border);
	}
	.page :global(figure > table) {
		margin-bottom: 0;
	}

	.page :global(details + details) {
		margin-top: 1rem;
	}

	.page :global(details > *) {
		padding-left: 1.3rem;
	}

	.page :global(details > summary) {
		margin-left: -1.3rem;
	}

	.page :global(li > input[type='checkbox']:first-child) {
		margin-right: 0.5rem;
	}

	.page :global(:not(pre) > code),
	.page :global(a > code) {
		font-weight: var(--weight-bold);
		line-height: 1.17;
	}

	.page :global(li > :is(pre, p)),
	.page :global(li > :is(pre, p):first-child),
	.page :global(li > :is(pre, p):last-child) {
		margin-top: 1rem;
		margin-bottom: 1rem;
	}

	@media (max-width: 1090px) {
		.page :global(pre) {
			margin-left: calc(-1 * var(--global-margin));
			margin-right: calc(-1 * var(--global-margin));
			padding-left: var(--global-margin);
			padding-right: var(--global-margin);
		}
	}

	@media (max-width: 480px) {
		.page :global(pre) {
			font-size: 0.85rem;
		}
	}

	/**
    * Visually hide an element, but leave it available for screen readers
    * @link https://github.com/h5bp/html5-boilerplate/blob/49b7a124699d719b6bd5f0655225e7e8f471da3e/dist/css/style.css#L109
    * @link http://snook.ca/archives/html_and_css/hiding-content-for-accessibility
    */
	.page :global(.screen-reader) {
		appearance: none;
		border: 0;
		clip: rect(0 0 0 0);
		height: 1px;
		margin: -1px;
		overflow: hidden;
		padding: 0;
		position: absolute;
		white-space: nowrap;
		width: 1px;
	}
	/**
    * Extends the .screen-reader class to allow the element to be focusable when navigated to via the keyboard
    * @link https://github.com/h5bp/html5-boilerplate/blob/master/dist/css/main.css
    * @link https://www.drupal.org/node/897638
    */
	.page :global(.screen-reader-focusable:active),
	.page :global(.screen-reader-focusable:focus) {
		clip: auto;
		height: auto;
		margin: 0;
		overflow: visible;
		position: static;
		white-space: normal;
		width: auto;
	}

	.page :global(.screen-reader:focus) {
		position: absolute;
		top: 0;
		left: 0;
	}

	.page :global(h1:has(.header-anchor)),
	.page :global(h2:has(.header-anchor)),
	.page :global(h3:has(.header-anchor)),
	.page :global(h4:has(.header-anchor)),
	.page :global(h5:has(.header-anchor)) {
		position: relative;
		scroll-margin-top: 1em;
	}

	.page :global(.header-anchor) {
		text-decoration: none;
		opacity: 0.5;
		transition: opacity 0.15s ease-in-out;
	}

	.page :global(.header-anchor:hover),
	.page :global(.header-anchor:focus) {
		opacity: 1;
		transition: opacity 0.15s ease-in-out;
	}

	.page :global(abbr) {
		text-underline-offset: 3px;
	}

	footer {
		position: relative;
	}
	footer a.screen-reader:focus {
		top: auto;
		bottom: -100%;
		right: 0;
	}

	header {
		margin-bottom: 3rem;
		scroll-margin: 3rem;
	}

	main {
		outline: none;
	}

	footer {
		text-align: right;
		margin-top: 3rem;
	}

	.page :global(img),
	.page :global(video) {
		display: block;
		margin: 0 auto;
		max-width: 100%;
		height: auto;
	}

	.page :global(figure:focus img) {
		max-width: none;
	}

	.page :global(figure) {
		width: 100%;
		margin: 2em 0;
	}

	.page :global(figure > .SVGInline) {
		display: block;
		margin: 0 auto;
		text-align: center;
	}

	.page :global(figcaption) {
		margin-top: 0.5em;
		text-align: center;
		font-size: 0.8em;
		opacity: 0.8;
		transition: opacity 0.5s ease;
	}

	.page :global(figure:hover figcaption) {
		opacity: 1;
	}

	.page :global(summary) {
		cursor: pointer;
	}

	.main :global(ul) {
		padding-left: 1.5rem;
	}

	.main :global(hr) {
		margin-top: 2em;
		margin-bottom: 2em;
		border: none;
		border-top: 1px solid var(--color-border);
	}

	@media screen and (min-width: 480px) {
		.page {
			--global-margin: 1.5rem;
		}

		.main :global(ul) {
			padding-left: 2.5rem;
		}
	}

	@media screen and (min-width: 51em) {
		.page :global(figure) {
			margin-left: 40px;
			margin-right: 40px;
			width: calc(100% - 80px);
		}

		.page :global(figure:focus) {
			margin-left: 0;
			margin-right: 0;
			width: 100%;
		}
	}

	@media (max-width: 400px) {
		.page {
			font-size: 1em;
		}

		.page :global(h1),
		.page :global(.h1) {
			font-size: 2.074rem;
		}

		.page :global(h2),
		.page :global(.h2) {
			font-size: 1.728rem;
		}

		.page :global(h3),
		.page :global(.h3) {
			font-size: 1.44rem;
		}

		.page :global(h4),
		.page :global(.h4) {
			font-size: 1.2rem;
		}

		.page :global(h5),
		.page :global(.h5) {
			font-size: 1rem;
		}
	}

	@media (min-width: 720px) {
		.page {
			--global-margin: 6rem;
			padding: 4rem var(--global-margin);
			font-size: 1.125em;
		}

		header {
			margin-bottom: 3rem;
		}

		.page :global(.header-anchor) {
			position: absolute;
			left: 0;
			top: 0;
			transform: translateX(-200%);
		}
	}
</style>
