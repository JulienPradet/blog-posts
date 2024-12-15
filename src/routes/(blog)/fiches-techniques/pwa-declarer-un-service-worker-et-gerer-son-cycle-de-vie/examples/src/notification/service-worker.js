// fichier : /service-worker.js
console.log('SW: Téléchargement fini.');

self.addEventListener('install', (event) => {
	console.log('SW: Installation en cours.');

	// Un Service Worker a fini d'être
	// installé quand la promesse dans
	// `event.waitUntil` est résolue
	event.waitUntil(
		// Création d'une promesse
		// factice qui est résolue au
		// bout d'une seconde
		new Promise((resolve, reject) => {
			setTimeout(() => {
				console.log('SW: Installé.');
				resolve();
			}, 1000);
		})
	);
});

self.addEventListener('activate', (event) => {
	console.log('SW: Activation en cours.');

	// Un Service Worker a fini d'être
	// activé quand la promesse dans
	// `event.waitUntil` est résolue
	event.waitUntil(
		// Création d'une promesse
		// factice qui est résolue au
		// bout d'une seconde
		new Promise((resolve, reject) => {
			setTimeout(() => {
				console.log('SW: Activé.');
				resolve();
			}, 1000);
		})
	);
});
