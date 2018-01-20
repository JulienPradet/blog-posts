import {
  offlineAssets,
  getOfflineAsset,
  getOfflineEntrypoint
} from "./util/cache-helpers";

const shouldDisplayOfflinePage = request => {
  return request.mode === "navigate";
};

const isOfflineAsset = request => {
  const url = new URL(request.url);
  return offlineAssets.indexOf(url.pathname) > -1;
};

self.addEventListener("fetch", event => {
  if (shouldDisplayOfflinePage(event.request)) {
    if (!navigator.onLine) {
      event.respondWith(getOfflineEntrypoint());
    } else {
      event.respondWith(
        fetch(event.request).catch(error => {
          return getOfflineEntrypoint();
        })
      );
    }
  } else if (isOfflineAsset(event.request)) {
    event.respondWith(getOfflineAsset(event.request));
  }
});
