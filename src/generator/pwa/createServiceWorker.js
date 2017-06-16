const path = require("path");
const fs = require("../util/fs");

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

const createServiceWorker = paths =>
  stats$ => {
    return stats$
      .map(stats => {
        const homeChunks = stats.children[0].chunks
          .filter(chunk => !chunk.entry)
          .reverse()
          .slice(0, 1)
          .map(chunk => {
            return chunk.files
              .filter(name => !name.endsWith(".map"))
              .map(name => "/" + name);
          })
          .reduce((acc, arr) => [...acc, ...arr], []);

        return [
          "/",
          "/app.js",
          "/css/main.css",
          "/css/prism-onedark.css",
          ...homeChunks
        ];
      })
      .flatMap(urlsToCacheOnFirstLoad => {
        return fs.writefile(
          path.join(paths.buildPath, "service-worker.js"),
          serviceWorker(urlsToCacheOnFirstLoad)
        );
      });
  };

module.exports = createServiceWorker;
