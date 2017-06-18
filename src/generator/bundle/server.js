import path from "path";
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import Helmet from "react-helmet";
import App from "../tmp/App";
import {
  createAsyncContext,
  AsyncComponentProvider
} from "react-async-component";
import asyncBootstrapper from "react-async-bootstrapper";
import serialize from "serialize-javascript";

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

const renderPageToHtml = paths => (jsPath, htmlPath, stats) => {
  let location = "/" + path.relative(paths.contentPath, path.dirname(jsPath));
  if (!location.endsWith("/")) location += "/";

  const asyncContext = createAsyncContext();
  const context = {};
  const server = (
    <AsyncComponentProvider asyncContext={asyncContext}>
      <StaticRouter location={location} context={context}>
        <App />
      </StaticRouter>
    </AsyncComponentProvider>
  );

  return asyncBootstrapper(server).then(() => {
    Helmet.rewind();
    const html = renderToString(server);
    const helmet = Helmet.renderStatic();

    const asyncState = asyncContext.getState();

    return renderToString(
      <html lang="fr">
        <head>
          {helmet.title.toComponent()}
          {helmet.meta.toComponent()}
          {helmet.link.toComponent()}
          {helmet.style.toComponent()}
        </head>
        <body>
          <div id="root" dangerouslySetInnerHTML={{ __html: html }} />
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
                  window.ASYNC_COMPONENTS_STATE = ${serialize(asyncState)};
                `
            }}
          />
          {getPathsFromChunks(paths)(
            stats.children[0],
            htmlPath
          ).map((jsPath, key) => <script async src={jsPath} key={key} />)}
          {helmet.noscript.toComponent()}
        </body>
      </html>
    );
  });
};

const renderToHtml = paths => (jsPath, htmlPath, stats) =>
  renderPageToHtml(paths)(jsPath, htmlPath, stats).then(
    html => `<!doctype html>${html}`
  );

export default renderToHtml;
