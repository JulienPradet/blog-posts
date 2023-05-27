self.addEventListener('activate', (event) => {
	event.waitUntil(
		Promise.all([
			caches.keys().then((keys) => Promise.all(keys.map((key) => caches.delete(key))))
		]).then(() => self.clients.claim())
	);
});

addEventListener('message', (messageEvent) => {
	if (messageEvent.data === 'skipWaiting') {
		return self.skipWaiting();
	}
});
