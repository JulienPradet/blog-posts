const { Observable } = require("rxjs");
const createManifest = require("./createManifest");
const createServiceWorker = require("./createServiceWorker");
const log = require("../util/log")("PWA");

const createPwaFiles = paths => stats$ => {
  log("info", "Start generating PWA files");
  return Observable.merge(
    createManifest(paths)().do(() => log("debug", "Manifest generated")),
    createServiceWorker(paths)(stats$).do(() =>
      log("debug", "Service worker generated")
    )
  ).do(() => log("success", "PWA ready!"));
};

module.exports = createPwaFiles;
