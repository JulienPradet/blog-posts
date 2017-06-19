const path = require("path");
const Observable = require("rxjs").Observable;
const createCompiler = require("./createCompiler");
const express = require("express");
const webpackDevMiddleware = require("webpack-dev-middleware");

const serve = paths => compiler$ => {
  return compiler$.flatMap(compiler =>
    Observable.create(observer => {
      var app = express();

      app.use(express.static(path.join(__dirname, "../../public")));

      app.use(
        webpackDevMiddleware(compiler, {
          publicPath: "/",
          quiet: true
        })
      );

      app.get("*", (req, res) => {
        const html = `
              <!DOCTYPE html>
              <html lang="fr">
                  <body>
                      <div id="root"></div>
                      <script type="text/javascript" src="app.js"></script>
                  </body>
              </html>
            `;
        res.send(html);
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
