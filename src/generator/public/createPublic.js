const path = require("path");
const fs = require("../util/fs");
const reduceObservable = require("../util/reduceObservable");
const log = require("../util/log")("PUBLIC");

const createPublic = paths => () => {
  log("info", "Copying public files");
  const copyPublic$ = fs
    .copyfile(paths.publicPath, path.join(paths.buildPath), true)
    .do(publicPath =>
      log("debug", "/" + path.relative(paths.buildPath, publicPath))
    );

  return reduceObservable(
    (acc, path) => [...acc, path],
    [],
    copyPublic$
  ).do(compiledPublic =>
    log("success", `Copied ${compiledPublic.length} public files`)
  );
};

module.exports = createPublic;
