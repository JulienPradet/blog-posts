if ('serviceWorker' in navigator) {
	// On essaye d'enregistrer le service
	// worker
	navigator.serviceWorker
		.register('service-worker.js')
		.then((registration) => {
			// Le Service Worker a fini d'être
			// téléchargé.
			console.log('App: Téléchargement fini.');

			registration.addEventListener('updatefound', () => {
				// On récupère le Service
				// Worker en cours
				// d'installation
				const newWorker = registration.installing;
				// `registration` a aussi
				// les clés `active` et
				// `waiting` qui permettent
				// de récupérer les Service
				// Workers correspondant

				newWorker.addEventListener('statechange', () => {
					// Le service worker a
					// changé d'état
					console.log('App: Nouvel état :', newWorker.state);
				});
			});
		})
		.catch((err) => {
			// Il y a eu un problème
			console.error('App: Crash de Service Worker', err);
		});
}
