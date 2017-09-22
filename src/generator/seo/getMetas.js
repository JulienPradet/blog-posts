const Observable = require("rxjs").Observable;
const path = require("path");
const fs = require("../util/fs");
const reduceObservable = require("../util/reduceObservable");

const getMetas = paths => () => {
  const meta$ = fs
    .getRecursiveFiles(Observable.of(paths.contentPath))
    .filter(({ filepath }) => filepath.endsWith("meta.js"))
    .map(({ filepath }) => {
      let meta;
      try {
        meta = require(filepath);
      } catch (e) {
        return null;
      }

      return Object.assign(
        {},
        {
          location: path.relative(paths.contentPath, path.dirname(filepath))
        },
        meta
      );
    })
    .filter(meta => meta);

  return reduceObservable((acc, meta) => [...acc, meta], [], meta$);
};

module.exports = getMetas;
