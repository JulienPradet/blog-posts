/* eslint no-restricted-globals: 1 */
const makeServiceWorkerAssetsCaching = (cacheName, urlsToPrefetch) => {
  self.addEventListener("install", event => {
    event.waitUntil(
      caches
        .open(cacheName)
        .then(cache =>
          urlsToPrefetch
            .map(url => new Request(url))
            .map(request =>
              fetch(request).then(response =>
                cache.put(request, response.clone())
              )
            )
        )
        .catch(function(error) {
          console.error("Pre-fetching failed:", error);
        })
    );
  });

  self.addEventListener("activate", event => {
    event.waitUntil(
      Promise.all([
        caches
          .keys()
          .then(keys =>
            Promise.all(
              keys
                .filter(key => key !== cacheName)
                .map(key => caches.delete(key))
            )
          )
      ]).then(() => self.clients.claim())
    );
  });

  self.addEventListener("fetch", event => {
    if (event.request.method === "GET") {
      event.respondWith(
        caches.match(event.request).then(function(response) {
          if (response) {
            return response;
          } else {
            return fetch(event.request).then(response => {
              return caches
                .open(cacheName)
                .then(cache => {
                  cache.put(event.request, response.clone());
                })
                .then(() => {
                  return response;
                });
            });
          }
        })
      );
    }
  });

  self.addEventListener("message", messageEvent => {
    if (!messageEvent.data.type && messageEvent.data !== "skipWaiting") {
      console.warn("Invalid message event: should have a key 'type'");
    } else if (
      messageEvent.data === "skipWaiting" ||
      messageEvent.data.type === "skipWaiting"
    ) {
      return self.skipWaiting();
    }
  });
};

export default makeServiceWorkerAssetsCaching;
