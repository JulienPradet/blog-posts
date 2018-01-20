// On utilise un nom de cache pour faciliter
// le nettoyage du vieux cache
const OFFLINE_CACHE_NAME = "offline-v2";

// On répertorie tout ce dont on a besoin
// pour afficher la page hors ligne
const offlineEntrypoint = "/offline/";
const offlineAssets = [offlineEntrypoint].concat([
  "/offline/style.css",
  "/offline/script.js",
  "/offline/logo.png"
]);

const openOfflineCache = () => {
  return caches.open(OFFLINE_CACHE_NAME);
};

const isOfflineCache = cacheName => {
  return cacheName !== OFFLINE_CACHE_NAME;
};

const cacheOfflineAsset = url => {
  return Promise.all([
    openOfflineCache(),
    fetch(url)
  ]).then(([cache, response]) => {
    return cache.put(new Request(url), response.clone());
  });
};

const cacheAllOfflineAssets = () => {
  return Promise.all(offlineAssets.map(url => cacheOfflineAsset(url)));
};

const getOfflineEntrypoint = () => {
  return openOfflineCache().then(cache => {
    return cache.match(offlineEntrypoint);
  });
};

const getOfflineAsset = request => {
  return openOfflineCache().then(cache => {
    return cache.match(request);
  });
};

export {
  offlineAssets,
  openOfflineCache,
  isOfflineCache,
  cacheOfflineAsset,
  cacheAllOfflineAssets,
  getOfflineAsset,
  getOfflineEntrypoint
};
