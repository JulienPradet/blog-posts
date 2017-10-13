const path = require("path");

const ensureSlash = location => {
  if (!location.startsWith("/")) {
    location = "/" + location;
  }
  return location;
};

const getPathsFromChunks = paths => (stats, htmlPath) =>
  stats.chunks
    .filter(({ initial }) => initial)
    .map(({ files }) =>
      files
        .filter(file => !file.endsWith(".map"))
        .map(file =>
          path.relative(
            path.dirname(htmlPath),
            path.join(paths.buildPath, file)
          )
        )
    )
    .reduce((acc, arr) => [...acc, ...arr], [])
    .reverse()
    .map(ensureSlash);

module.exports = getPathsFromChunks;
