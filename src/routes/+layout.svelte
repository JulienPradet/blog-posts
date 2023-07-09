<script lang="ts">
	if (typeof navigator !== 'undefined' && 'serviceWorker' in window.navigator) {
		window.navigator.serviceWorker.getRegistrations().then((registrations) => {
			registrations.forEach((registration) => {
				registration.unregister();
			});
		});
	}
</script>

<slot />

<style>
	@font-face {
		font-family: 'Assistant-fallback-linux';
		size-adjust: 81.9%;
		ascent-override: 114%;
		src: local('DejaVu Sans');
	}

	@font-face {
		font-family: 'Assistant-fallback-linux';
		font-weight: 700;
		size-adjust: 80%;
		ascent-override: 106%;
		src: local('DejaVu Sans Bold');
	}

	@font-face {
		font-family: 'Assistant-fallback';
		size-adjust: 92.94%;
		ascent-override: 110%;
		src: local('Arial');
	}

	@font-face {
		font-family: 'Assistant-fallback';
		font-weight: 700;
		size-adjust: 80.4%;
		ascent-override: 124%;
		src: local('Arial Black');
	}

	@font-face {
		font-family: 'Assistant';
		font-style: normal;
		font-weight: 200 800;
		font-display: fallback;
		src: url(/assistant.woff2) format('woff2');
		unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304,
			U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF,
			U+FFFD;
	}

	:root {
		--weight-normal: 450;
		--weight-bold: 700;
		--weight-black: 800;
	}

	:global(body) {
		font-family: Assistant, Assistant-fallback, Assistant-fallback-linux, serif;
		font-weight: var(--weight-normal);
	}

	:global(*) {
		box-sizing: border-box;
		word-break: normal;
		overflow-wrap: anywhere;
	}

	:global(::selection) {
		background: rgb(207 58 0 / 100%);
		color: white;
	}

	:global(body) {
		margin: 0;
	}

	:global(h1, h2, h3, h4, h5, .h1, .h2, .h3, .h4, .h5) {
		font-weight: var(--weight-black);
	}
	:global(strong) {
		font-weight: var(--weight-bold);
	}
</style>
