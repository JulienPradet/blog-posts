const ASSETS_CACHE_NAME = 'assets';

// En premier, deux méthodes d'aide
// pour faciliter la lecture de
// `getResponseFromCacheFirst`

const getResponseFromCache = (cacheName, request) => {
	// On ouvre le bon cache
	return caches.open(cacheName).then((cache) => {
		// Et on récupère la réponse
		// correspondant à la requête
		return cache.match(request);
	});
};

const setResponseCache = (cacheName, request, response) => {
	// On ouvre le bon cache
	return caches.open(cacheName).then((cache) => {
		// Et on stocke la nouvelle
		// réponse pour la requête donnée
		console.log('Mise à jour du cache');
		return cache
			.put(request, response.clone())
			.then((response) => {
				cache.keys().then((...args) => console.log(...args));
				return response;
			})
			.catch((error) => console.log(error));
	});
};

// Mise en place de la stratégie
// Cache First pour la requête
// donnée
const getResponseFromCacheFirst = (cacheName, request) => {
	// Cette méthode permet de récupérer la
	// réponse d'une requête. Si celle-ci est
	// déjà en cache, on répond avec le cache
	// en priorité. Sinon, on fait la requête,
	// on met en cache la réponse, puis on
	// renvoie la réponse.

	// Récupération depuis le cache
	const response = getResponseFromCache(cacheName, request).then((response) => {
		if (response) {
			// Si la requête est déjà en cache,
			// on renvoie la réponse trouvée
			console.log('Réponse déjà en cache.');
			return response;
		} else {
			// Sinon, on fait la vraie requête
			console.log('Réponse récupérée depuis le serveur.');
			return fetch(request).then((response) => {
				// Une fois qu'on a reçu la
				// réponse, on met en cache
				// pour la prochaine fois
				setResponseCache(cacheName, request, response.clone());

				// Et on retourne la réponse
				return response;
			});
		}
	});

	return response;
};

self.addEventListener('fetch', (event) => {
	const requestUrl = new URL(event.request.url);

	// Quand on intercepte une requête,
	// si c'est un asset, on applique la
	// stratégie Cache First
	if (requestUrl.pathname.endsWith('/toto.html')) {
		event.respondWith(getResponseFromCacheFirst(ASSETS_CACHE_NAME, event.request));
	}
});
