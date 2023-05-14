<svelte:head>
	<title>Julien Pradet</title>
</svelte:head>

<div class="cv-layout">
	<slot />
</div>

<style>
	/* latin */
	@font-face {
		font-family: 'Ovo';
		font-style: normal;
		font-weight: 400;
		font-display: swap;
		src: url(/ovo.woff2) format('woff2');
		unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC,
			U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
	}

	.cv-layout {
		--color-white: #fffdfd;
		--color-creme: #fff7f1;
		--color-highlight: #f6b27e;
		--color-accent: #fbd5b8;
		--color-dark: #181716;
		font-family: Ovo, serif;
		line-height: 1.5;
		background: var(--color-creme);
		color: var(--color-dark);
		margin: 0;
		padding: 1.5em;
		border: solid var(--color-highlight);
		border-width: 0.3em 0 0 0;
		margin: 0 auto;
	}
	@media screen and (min-width: 47em) {
		.cv-layout {
			padding: 2em;
			border: 0.8em solid var(--color-highlight);
		}
	}
	@media print {
		.cv-layout {
			border: none;
		}

		.screen-only {
			display: none;
		}
	}

	@media screen {
		.cv-layout :global(h1) {
			font-size: 2.2rem;
		}

		.cv-layout :global(h2) {
			font-size: 1.7rem;
		}

		.cv-layout :global(h3) {
			font-size: 1.4rem;
		}

		.cv-layout :global(h4) {
			font-size: 1.2rem;
		}
	}

	.cv-layout :global(a),
	.cv-layout :global(.link) {
		appearance: none;
		padding: 0;
		background: none;
		border: none;
		font: inherit;
		color: inherit;
		text-decoration: underline;
		text-decoration-thickness: 1px;
		text-underline-offset: 0.4em;
		text-decoration-color: var(--color-highlight);
		transition: opacity 0.1s ease-in-out, text-decoration-color 0.1s ease-in-out,
			text-decoration-thickness 0.1s ease-in-out, text-decoration-offset 0.1s ease-in-out;
	}

	.cv-layout :global(a strong),
	.cv-layout :global(.link strong) {
		text-decoration: underline;
		text-decoration-color: var(--color-highlight);
	}

	.cv-layout :global(a:hover),
	.cv-layout :global(a:focus),
	.cv-layout :global(.link:hover),
	.cv-layout :global(.link:focus) {
		opacity: 0.8;
		text-decoration-color: var(--color-highlight);
		text-decoration-thickness: 3px;
		text-underline-offset: calc(0.4em - 2px);
	}

	.cv-layout :global(strong) {
		position: relative;
		display: inline-block;
		font-weight: normal;
	}
	.cv-layout :global(strong > *) {
		position: relative;
	}
	.cv-layout :global(strong::before) {
		content: '';
		position: absolute;
		top: 0.2em;
		bottom: 0.2em;
		/* height: 0.5em; */
		left: -0.05em;
		right: -0.05em;
		background: var(--color-accent);
		transform: rotate(-2deg);
	}

	/**
    * Visually hide an element, but leave it available for screen readers
    * @link https://github.com/h5bp/html5-boilerplate/blob/49b7a124699d719b6bd5f0655225e7e8f471da3e/dist/css/style.css#L109
    * @link http://snook.ca/archives/html_and_css/hiding-content-for-accessibility
    */
	.cv-layout :global(.screen-reader) {
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
	.cv-layout :global(.screen-reader-focusable:active),
	.cv-layout :global(.screen-reader-focusable:focus) {
		clip: auto;
		height: auto;
		margin: 0;
		overflow: visible;
		position: static;
		white-space: normal;
		width: auto;
	}

	.cv-layout :global(.screen-reader:focus) {
		position: absolute;
		top: 0;
		left: 0;
	}

	.cv-layout :global(abbr[title]::after) {
		pointer-events: none;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		content: attr(title);
		margin-top: -2.5em;
		background: var(--color-white);
		border-top: 1px solid var(--color-highlight);
		padding: 2rem 1.5rem;
		text-align: center;
		opacity: 0;
		transform: translateY(50%);
		transition: transform 0.15s ease-in-out, opacity 0.15s ease-in-out;
	}

	.cv-layout :global(abbr[title]:focus::after) {
		transform: none;
		opacity: 1;
	}

	@media screen and (max-width: 400px) {
		.cv-layout {
			font-size: 1em;
		}

		.cv-layout :global(h1) {
			font-size: 2.074rem;
		}

		.cv-layout :global(h2) {
			font-size: 1.728rem;
		}

		.cv-layout :global(h3) {
			font-size: 1.44rem;
		}

		.cv-layout :global(h4) {
			font-size: 1.2rem;
		}
	}

	@media (min-width: 720px) {
		.cv-layout {
			font-size: 1.125em;
		}
		.cv-layout > :global(*) {
			max-width: 80rem;
			margin: 0 auto;
		}
	}

	@media print {
		.cv-layout {
			font-size: 11px;
			background: transparent;
			border: none;
			padding: 0;
		}

		.cv-layout :global(.screen-only) {
			display: none;
		}

		.cv-layout :global(h4),
		.cv-layout :global(.h4) {
			font-size: 1em;
		}
	}
</style>
