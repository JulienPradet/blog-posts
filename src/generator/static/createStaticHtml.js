const path = require("path");
const { Observable } = require("rxjs");
const fs = require("../util/fs");
const reduceObservable = require("../util/reduceObservable");
const log = require("../util/log")("STATIC");

const toHtmlPath = path => {
  return path.replace("index.js", "index.html");
};

const createHtml = paths => (entry$, stats$) => {
  return entry$
    .combineLatest(stats$, ({ entryPath, pages }, stats) => ({
      stats,
      entryPath,
      pages
    }))
    .do(() => log("info", "Creating static HTML"))
    .flatMap(({ stats, entryPath, pages }) => {
      const pages$ = Observable.from(pages)
        .map(page => ({
          htmlPath: toHtmlPath(page),
          jsPath: page
        }))
        .flatMap(({ htmlPath, jsPath }) => {
          const pagePath =
            "/" +
            path
              .relative(paths.contentPath, htmlPath)
              .replace("index.html", "");

          log("debug", pagePath);

          const buildPath = path.join(
            paths.buildPath,
            path.relative(paths.contentPath, htmlPath)
          );

          require("../bundle/date-polyfill");
          let renderToHtml;
          try {
            renderToHtml = require(path.join(__dirname, "../tmp/server.js"))
              .default;
          } catch (e) {
            console.error(e);
            throw new Error("Server file is invalid (tmp/server.js)");
          }

          return Observable.fromPromise(
            renderToHtml(paths)(jsPath, buildPath, stats)
          )
            .do(
              () => {},
              e => {
                log("error", e.stack);
                log("error", pagePath);
              }
            )
            .flatMap(html =>
              fs
                .mkdirp(path.dirname(buildPath))
                .flatMap(() => fs.writefile(buildPath, html))
            );
        });

      return reduceObservable(
        (acc, filepath) => [...acc, filepath],
        [],
        pages$
      ).do(
        pages => log("success", `Built ${pages.length} pages`),
        e => log("error", e.stack)
      );
    });
};

module.exports = createHtml;
