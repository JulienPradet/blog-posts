const path = require("path");
const fs = require("../util/fs");
const { Observable } = require("rxjs");
const getPathsFromChunks = require("../bundle/getPathsFromChunks");
const reduceObservable = require("../util/reduceObservable");

const serviceWorker = urlsToCacheOnFirstLoad => {
  const hash = Math.ceil(Math.random() * 1000000);

  return `
    const CACHE_NAME = 'julien-pradet-blog-${hash}'
    const urlsToPrefetch = ${JSON.stringify(urlsToCacheOnFirstLoad)}

    self.addEventListener("install", event => {
      event.waitUntil(
        caches
        .open(CACHE_NAME)
        .then(cache =>
          urlsToPrefetch
            .map(url => new Request(url))
            .map(request =>
              fetch(request).then(response => cache.put(request, response.clone()))
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
                keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
              )
            )
        ]).then(() => self.clients.claim())
      );
    })

    self.addEventListener("fetch", event => {
      if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') {
        return;
      }
      event.respondWith(
        caches.match(event.request).then(function(response) {
          if (response) {
            return response;
          } else {
            return fetch(event.request).then(response => {
              return caches
                .open(CACHE_NAME)
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
    });

    addEventListener("message", messageEvent => {
      if (messageEvent.data === "skipWaiting") {
        return self.skipWaiting();
      }
    });
  `;
};

const getHomeHelmetFiles = paths => () => {
  require("../bundle/date-polyfill");
  let renderPage;
  try {
    renderPage = require(path.join(__dirname, "../tmp/server.js")).renderPage;
  } catch (e) {
    throw new Error("Server file is invalid (tmp/server.js)");
  }

  return Observable.fromPromise(renderPage(paths)("/")).map(({ helmet }) => {
    return [
      ...helmet.link
        .toComponent()
        .filter(
          element =>
            ["stylesheet", "icon", "shortcut icon"].indexOf(element.props.rel) >
            -1
        )
        .map(element => element.props.href),
      ...helmet.script.toComponent().map(element => element.props.src)
    ];
  });
};

const getHomeWebpackFiles = paths => stats$ => {
  return stats$.map(stats => {
    const homeChunks = getPathsFromChunks(paths)(
      stats.children[0],
      path.join(paths.buildPath, "index.html")
    );

    return ["/", ...homeChunks];
  });
};

const createServiceWorker = paths => stats$ => {
  return reduceObservable(
    (files, current) => [...files, ...current],
    [],
    Observable.merge(
      Observable.of(["/"]),
      getHomeWebpackFiles(paths)(stats$),
      getHomeHelmetFiles(paths)()
    )
  )
    .map(urlsToCacheOnFirstLoad => [...new Set(urlsToCacheOnFirstLoad)])
    .flatMap(urlsToCacheOnFirstLoad => {
      return fs.writefile(
        path.join(paths.buildPath, "service-worker.js"),
        serviceWorker(urlsToCacheOnFirstLoad)
      );
    });
};

module.exports = createServiceWorker;
