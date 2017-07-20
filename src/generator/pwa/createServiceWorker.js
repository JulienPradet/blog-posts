const path = require("path");
const fs = require("../util/fs");
const getPathsFromChunks = require("../bundle/getPathsFromChunks");

const serviceWorker = urlsToCacheOnFirstLoad => {
  return `
    const CACHE_NAME = 'julien-pradet-blog'

    const urlsToPrefetch = ${JSON.stringify(urlsToCacheOnFirstLoad)}

    self.addEventListener('install', (event) => {
      event.waitUntil(
        caches.open(CACHE_NAME)
          .then((cache) => {
            cache.addAll(urlsToPrefetch.map((urlToPrefetch) => {
              return new Request(urlToPrefetch);
            }))
          })
          .catch(function(error) {
            console.error('Pre-fetching failed:', error);
          })
      );
    })

    self.addEventListener('fetch', (event) => {
      event.respondWith(
        fetch(event.request)
          .then((response) => {
            return caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, response.clone())
              })
              .then(() => {
                return response
              })
          })
          .catch(() => {
            return caches.match(event.request)
          })
      )
    })

  `;
};

const createServiceWorker = paths => stats$ => {
  return stats$
    .map(stats => {
      const homeChunks = getPathsFromChunks(paths)(
        stats.children[0],
        path.join(paths.buildPath, "index.html")
      );

      return ["/", "/css/page.css", "/css/prism-onedark.css", ...homeChunks];
    })
    .flatMap(urlsToCacheOnFirstLoad => {
      return fs.writefile(
        path.join(paths.buildPath, "service-worker.js"),
        serviceWorker(urlsToCacheOnFirstLoad)
      );
    });
};

module.exports = createServiceWorker;
