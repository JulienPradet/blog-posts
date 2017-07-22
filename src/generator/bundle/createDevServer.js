const path = require("path");
const Observable = require("rxjs").Observable;
const createCompiler = require("./createCompiler");
const WebpackDevServer = require("webpack-dev-server");

const serve = paths => compiler$ => {
  return compiler$.flatMap(compiler =>
    Observable.create(observer => {
      const app = new WebpackDevServer(compiler, {
        compress: true,
        hot: true,
        contentBase: path.join(__dirname, "../../public"),
        quiet: true,
        historyApiFallback: {
          rewrites: [{ from: /.*/, to: "/index.html" }]
        },
        overlay: {
          errors: true
        }
      });

      var server = app.listen(3000, function() {
        console.log("Listening on port 3000!");
      });

      return () => server.close();
    })
  );
};

const createDevServer = paths => entry$ => {
  const compiler$ = createCompiler(
    Object.assign({}, paths, { buildPath: "/" })
  )(entry$);
  return serve(paths)(compiler$);
};

module.exports = createDevServer;
