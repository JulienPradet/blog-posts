import path from "path";

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
    .reverse();

export default getPathsFromChunks;
