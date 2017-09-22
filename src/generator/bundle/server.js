import path from "path";
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import Helmet from "react-helmet";
import { getLoadableState } from "loadable-components/server";
import App from "../tmp/App";
import getPathsFromChunks from "./getPathsFromChunks";

export const renderPage = paths => location => {
  const context = {};
  const server = (
    <StaticRouter location={location} context={context}>
      <App />
    </StaticRouter>
  );

  return getLoadableState(server).then(loadableState => {
    Helmet.rewind();
    const html = renderToString(server);
    const helmet = Helmet.renderStatic();

    return {
      html,
      helmet,
      loadableState
    };
  });
};

const renderToHtml = paths => (jsPath, htmlPath, stats) => {
  let location = "/" + path.relative(paths.contentPath, path.dirname(jsPath));
  if (!location.endsWith("/")) location += "/";

  return renderPage(paths)(jsPath)
    .then(({ html, helmet, loadableState }) => {
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
            {loadableState.getScriptElement()}
            {getPathsFromChunks(paths)(
              stats.children[0],
              htmlPath
            ).map((jsPath, key) => <script async src={jsPath} key={key} />)}
            {helmet.script.toComponent()}
            {helmet.noscript.toComponent()}
          </body>
        </html>
      );
    })
    .then(html => `<!doctype html>${html}`);
};

export default renderToHtml;
