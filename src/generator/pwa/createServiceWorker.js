const path = require("path");
const fs = require("../util/fs");
const { Observable } = require("rxjs");
const getPathsFromChunks = require("../bundle/getPathsFromChunks");
const reduceObservable = require("../util/reduceObservable");

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

const getHomePreloadFiles = paths => () => {
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

const createServiceWorker = paths => stats$ => {
  return reduceObservable(
    (files, current) => [...files, ...current],
    [],
    Observable.merge(
      stats$.map(stats => {
        const homeChunks = getPathsFromChunks(paths)(
          stats.children[0],
          path.join(paths.buildPath, "index.html")
        );

        return ["/", "/css/page.css", "/css/prism-onedark.css", ...homeChunks];
      }),
      getHomePreloadFiles(paths)()
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
