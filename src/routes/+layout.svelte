<script lang="ts">
	import { page } from '$app/stores';

	if (typeof navigator !== 'undefined' && 'serviceWorker' in window.navigator) {
		window.navigator.serviceWorker.getRegistrations().then((registrations) => {
			registrations.forEach((registration) => {
				registration.unregister();
			});
		});
	}

	var _paq = [];
	if (typeof window !== 'undefined') {
		window._paq = _paq;
		/* tracker methods like "setCustomDimension" should be called before "trackPageView" */
		(function () {
			var u = 'https://analytics.julienpradet.fr/';
			_paq.push(['setTrackerUrl', u + 'matomo.php']);
			_paq.push(['setSiteId', '1']);
			var d = document,
				g = d.createElement('script'),
				s = d.getElementsByTagName('script')[0];
			g.async = true;
			g.src = u + 'matomo.js';
			s.parentNode.insertBefore(g, s);
		})();
	}

	$: {
		if ($page && typeof window !== 'undefined') {
			_paq.push(['setCustomUrl', window.location.pathname]);
			_paq.push(['setDocumentTitle', document.title]);
			_paq.push(['trackPageView']);
			_paq.push(['enableLinkTracking']);
		}
	}
</script>

<slot />

<style>
	@font-face {
		font-family: 'Assistant-fallback-linux';
		size-adjust: 81.9%;
		ascent-override: 114%;
		src: local('DejaVu Sans');
		unicode-range: U+20-5F, U+61-7A, U+7C, U+A0, U+A7, U+A9, U+AB, U+B2-B3, U+BB, U+C0, U+C2,
			U+C6-CB, U+CE-CF, U+D4, U+D9, U+DB-DC, U+E0, U+E2, U+E6-EB, U+EE-EF, U+F4, U+F9, U+FB-FC, U+FF,
			U+152-153, U+178, U+2B3, U+2E2, U+1D48-1D49, U+2010-2011, U+2013-2014, U+2019, U+201C-201D,
			U+2020-2021, U+2026, U+202F-2030, U+20AC, U+2212;
	}

	@font-face {
		font-family: 'Assistant-fallback-linux';
		font-weight: 700;
		size-adjust: 79%;
		ascent-override: 106%;
		src: local('DejaVu Sans Bold');
		unicode-range: U+20-5F, U+61-7A, U+7C, U+A0, U+A7, U+A9, U+AB, U+B2-B3, U+BB, U+C0, U+C2,
			U+C6-CB, U+CE-CF, U+D4, U+D9, U+DB-DC, U+E0, U+E2, U+E6-EB, U+EE-EF, U+F4, U+F9, U+FB-FC, U+FF,
			U+152-153, U+178, U+2B3, U+2E2, U+1D48-1D49, U+2010-2011, U+2013-2014, U+2019, U+201C-201D,
			U+2020-2021, U+2026, U+202F-2030, U+20AC, U+2212;
	}

	@font-face {
		font-family: 'Assistant-fallback';
		size-adjust: 92.94%;
		ascent-override: 110%;
		src: local('Arial');
		unicode-range: U+20-5F, U+61-7A, U+7C, U+A0, U+A7, U+A9, U+AB, U+B2-B3, U+BB, U+C0, U+C2,
			U+C6-CB, U+CE-CF, U+D4, U+D9, U+DB-DC, U+E0, U+E2, U+E6-EB, U+EE-EF, U+F4, U+F9, U+FB-FC, U+FF,
			U+152-153, U+178, U+2B3, U+2E2, U+1D48-1D49, U+2010-2011, U+2013-2014, U+2019, U+201C-201D,
			U+2020-2021, U+2026, U+202F-2030, U+20AC, U+2212;
	}

	@font-face {
		font-family: 'Assistant-fallback';
		font-weight: 700;
		size-adjust: 80.4%;
		ascent-override: 124%;
		src: local('Arial Black');
		unicode-range: U+20-5F, U+61-7A, U+7C, U+A0, U+A7, U+A9, U+AB, U+B2-B3, U+BB, U+C0, U+C2,
			U+C6-CB, U+CE-CF, U+D4, U+D9, U+DB-DC, U+E0, U+E2, U+E6-EB, U+EE-EF, U+F4, U+F9, U+FB-FC, U+FF,
			U+152-153, U+178, U+2B3, U+2E2, U+1D48-1D49, U+2010-2011, U+2013-2014, U+2019, U+201C-201D,
			U+2020-2021, U+2026, U+202F-2030, U+20AC, U+2212;
	}

	@font-face {
		font-family: 'Assistant';
		font-weight: 200 800;
		font-display: swap;
		src: url(/fonts/Assistant.woff2) format('woff2');
		unicode-range: U+20-5F, U+61-7A, U+7C, U+A0, U+A7, U+A9, U+AB, U+B2-B3, U+BB, U+C0, U+C2,
			U+C6-CB, U+CE-CF, U+D4, U+D9, U+DB-DC, U+E0, U+E2, U+E6-EB, U+EE-EF, U+F4, U+F9, U+FB-FC, U+FF,
			U+152-153, U+178, U+2B3, U+2E2, U+1D48-1D49, U+2010-2011, U+2013-2014, U+2019, U+201C-201D,
			U+2020-2021, U+2026, U+202F-2030, U+20AC, U+2212;
	}

	:root {
		--weight-normal: 400;
		--weight-bold: 700;
		--weight-black: 800;
	}

	:global(body) {
		font-family: Assistant, Assistant-fallback, Assistant-fallback-linux, system-ui, sans-serif;
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

	@media (prefers-reduced-motion: reduce) {
		:global(*) {
			view-transition-name: unset !important;
		}
	}
</style>
