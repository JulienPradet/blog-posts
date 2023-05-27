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
	:global(*) {
		box-sizing: border-box;
		word-break: normal;
		overflow-wrap: anywhere;
	}

	:global(body) {
		margin: 0;
	}
</style>
