import { cacheAllOfflineAssets, isOfflineCache } from "./util/cache-helpers";

// A l'installation, on met en cache toutes les urls
// nécessaires à l'affichage de la page hors ligne
self.addEventListener("install", event => {
  event.waitUntil(cacheAllOfflineAssets());
});

// A l'activation, on retire les anciens caches qui
// ne nous sont plus utile
self.addEventListener("activate", event => {
  caches.keys().then(cacheNames => {
    cacheNames
      .filter(cacheName => isOfflineCache(cacheName))
      .forEach(cacheName => {
        caches.delete(cacheName);
      });
  });
});
