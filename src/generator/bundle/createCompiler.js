const path = require("path");
const webpack = require("webpack");
const log = require("../util/log")("BUNDLE");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const baseConfig = paths => (pages, entryPath) => {
  return {
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
          exclude: [/node_modules/],
          options: {
            presets: ["react-app"]
          }
        },
        {
          test: /\.md$/,
          loader:
            "./" +
            path.relative(
              process.cwd(),
              "src/generator/bundle/markdown-loader.js"
            )
        },
        {
          test: /\.code$/,
          loader:
            "./" +
            path.relative(process.cwd(), "src/generator/bundle/code-loader.js")
        },
        {
          test: /\.svg$/,
          loader: "raw-loader"
        },
        {
          test: /\.s?css$/,
          use: [
            { loader: "file-loader", options: { name: "css/[hash].css" } },
            {
              loader: "postcss-loader",
              options: {
                plugins: () =>
                  process.env.NODE_ENV === "production"
                    ? [require("cssnano")()]
                    : []
              }
            },
            { loader: "sass-loader" }
          ]
        }
      ]
    },
    plugins: [
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        options: {
          context: path.join(process.cwd(), "src")
        }
      }),
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV || "production")
        }
      })
    ].concat(
      process.env.NODE_ENV === "production"
        ? [
            new webpack.optimize.UglifyJsPlugin({
              sourceMap: true,
              compress: { warnings: false }
            })
          ]
        : [
            new HtmlWebpackPlugin({
              template: path.join(__dirname, "dev-template.html")
            }),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NamedModulesPlugin()
          ]
    )
  };
};

const webpackConfig = paths => (pages, entryPath) => {
  const browserEntry = Object.assign({}, baseConfig(paths)(pages, entryPath), {
    entry: {
      app:
        process.env.NODE_ENV === "production"
          ? "./src/generator/bundle/browser.js"
          : [
              "webpack-dev-server/client?http://localhost:3000",
              "webpack/hot/dev-server",
              "./src/generator/bundle/browser.js"
            ]
    }
  });
  browserEntry.output = {
    path: paths.buildPath,
    filename: "[hash].js",
    chunkFilename: "[chunkhash].js",
    publicPath: "/"
  };
  const browserBabelOptions = browserEntry.module.rules.find(
    ({ loader }) => loader === "babel-loader"
  );
  browserBabelOptions.options.plugins = ["babel-plugin-syntax-dynamic-import"];

  const serverEntry = Object.assign({}, baseConfig(paths)(pages, entryPath), {
    entry: {
      server: "./src/generator/bundle/server.js"
    },
    target: "node"
  });
  serverEntry.externals = /^[\w-\d]$/;
  serverEntry.output = {
    path: path.join(__dirname, "../tmp"),
    filename: "[name].js",
    chunkFilename: "[name].js",
    publicPath: "/",
    libraryTarget: "commonjs2"
  };
  const serverBabelOptions = serverEntry.module.rules.find(
    ({ loader }) => loader === "babel-loader"
  );
  serverBabelOptions.options.plugins = ["babel-plugin-dynamic-import-node"];

  return [browserEntry, serverEntry];
};

const makeWebpackConfig = paths => entry$ => {
  return entry$.map(({ pages, entryPath }) =>
    webpackConfig(paths)(pages, entryPath)
  );
};

const makeCompiler = paths => config$ => {
  return config$.map(config => webpack(config)).do(compiler => {
    log("info", "Compiling");

    compiler.plugin("invalid", function() {
      log("info", "Compiling");
    });

    compiler.plugin("done", function(stats) {
      const messages = stats.toJson({}, true);
      if (messages.errors.length > 0 || messages.warnings.length > 0) {
        if (messages.errors.length > 0) {
          messages.errors.forEach(message => log("error", message));
        }

        if (messages.warnings.length > 0) {
          messages.warnings.forEach(message => log("warn", message));
        }
      } else {
        log("success", "Bundles created");
      }
    });
  });
};

const createCompiler = paths => entry$ => {
  const webpackConfig$ = makeWebpackConfig(paths)(entry$);
  return makeCompiler(paths)(webpackConfig$);
};

module.exports = createCompiler;
