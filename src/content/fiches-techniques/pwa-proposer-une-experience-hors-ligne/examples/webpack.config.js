const os = require("os");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  devtool: "cheap-module-source-map",
  context: __dirname,
  entry: {
    "script.js": "./src/online/script.js",
    "service-worker.js": "./src/service-worker/index.js",
    "offline/script.js": "./src/offline/script.js"
  },
  output: {
    path: path.join(__dirname, "./build"),
    filename: "[name]"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.join(__dirname, "./src"),
        loader: "babel-loader"
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "./build"),
    port: 8081,
    compress: true,
    before: require("./contact-api"),
    watchContentBase: true,
    open: true,
    overlay: {
      errors: true
    },
    stats: "errors-only"
  },
  parallelism: os.cpus().length,
  cache: true,
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "src/online/index.html",
      chunks: ["script.js"]
    }),
    new HtmlWebpackPlugin({
      filename: "offline/index.html",
      template: "src/offline/index.html",
      chunks: ["offline/script.js"]
    })
  ]
};
