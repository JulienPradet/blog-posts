const path = require("path");
const fs = require("../util/fs");
const { Observable } = require("rxjs");
const getPathsFromChunks = require("../bundle/getPathsFromChunks");
const reduceObservable = require("../util/reduceObservable");
const webpack = require("webpack");

const serviceWorker = urlsToCacheOnFirstLoad => {
  const hash = Math.ceil(Math.random() * 1000000);

  return fs
    .exists(path.join(__dirname, "../../site/service-worker.js"))
    .map(exists => {
      return `
        import makeServiceWorkerAssetsCaching from "../pwa/makeServiceWorkerAssetsCaching.js";

        const CACHE_NAME = 'julien-pradet-blog-${hash}'
        const urlsToPrefetch = ${JSON.stringify(urlsToCacheOnFirstLoad)}
        makeServiceWorkerAssetsCaching(CACHE_NAME, urlsToPrefetch)

        ${exists ? `require("../../site/service-worker.js");` : ""}
      `;
    });
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
    .flatMap(urlsToCacheOnFirstLoad => serviceWorker(urlsToCacheOnFirstLoad))
    .flatMap(serviceWorker =>
      fs.writefile(
        path.join(__dirname, "../tmp/service-worker.js"),
        serviceWorker
      )
    )
    .flatMap(data => {
      return new Promise((resolve, reject) => {
        const options = {
          entry: {
            "service-worker": "./src/generator/tmp/service-worker.js"
          },
          output: {
            path: paths.buildPath,
            filename: "service-worker.js",
            publicPath: "/"
          },
          devtool:
            process.env.NODE_ENV === "production"
              ? "source-map"
              : "cheap-module-source-map",
          module: {
            rules: [
              {
                enforce: "pre",
                test: /\.js$/,
                loader: "eslint-loader"
              },
              {
                test: /\.js$/,
                loader: "babel-loader",
                include: [/src|idb-keyval/],
                options: {
                  presets: ["react-app"]
                }
              }
            ]
          },
          plugins: [
            new webpack.DefinePlugin({
              "process.env": {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV || "production")
              }
            }),
            new webpack.optimize.UglifyJsPlugin({
              sourceMap: true,
              compress: { warnings: false }
            })
          ]
        };

        const compiler = webpack(options);

        compiler.run((err, stats) => {
          if (err) {
            console.log("error");
            reject(err);
          } else {
            console.log("success");
            resolve();
          }
        });
      });
    });
};

module.exports = createServiceWorker;
