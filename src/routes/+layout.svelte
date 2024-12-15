<script module lang="ts">
	declare global {
		interface Window {
			_paq: string[][];
		}
	}
</script>

<script lang="ts">
	import { page } from '$app/stores';
	import '../global.css';

	if (
		typeof window !== 'undefined' &&
		typeof navigator !== 'undefined' &&
		'serviceWorker' in window.navigator
	) {
		window.navigator.serviceWorker.getRegistrations().then((registrations) => {
			registrations.forEach((registration) => {
				registration.unregister();
			});
		});
	}

	var _paq: string[][] = [];
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
			s.parentNode?.insertBefore(g, s);
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
