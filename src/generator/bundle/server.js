import path from "path";
import React, { Fragment } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import Helmet from "react-helmet";
import { getLoadableState } from "loadable-components/server";
import App from "../tmp/App";
import getPathsFromChunks from "./getPathsFromChunks";
import { stripIndent } from "common-tags";

export const renderPage = () => location => {
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

  return renderPage(paths)(location)
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
            {!/\/cv\//.test(htmlPath) ? (
              <Fragment>
                {getPathsFromChunks(paths)(stats.children[0], htmlPath).map(
                  (jsPath, key) => (
                    <script async src={jsPath} key={key} />
                  )
                )}
                {helmet.script.toComponent()}
                {helmet.noscript.toComponent()}
              </Fragment>
            ) : (
              <script
                dangerouslySetInnerHTML={{
                  __html: stripIndent`
                    if ("serviceWorker" in navigator) {
                      navigator.serviceWorker
                        .register("/service-worker.js")
                        .then(registration => {
                          // Registration was successful
                          registration.addEventListener("updatefound", () => {
                            const installingWorker = registration.installing;
                            const activeWorker = registration.active;
                  
                            installingWorker.addEventListener("statechange", () => {
                              if (installingWorker.state === "installed") {
                                if (navigator.serviceWorker.controller) {
                                  dispatchUpdateEvent();
                                }
                              }
                            });
                  
                            if (installingWorker && !activeWorker) {
                              navigator.serviceWorker.addEventListener("controllerchange", () => {
                                console.log("SW attached for the first time");
                              });
                            } else {
                              navigator.serviceWorker.addEventListener("controllerchange", () => {
                                window.location.reload();
                              });
                            }
                          });
                        })
                        .catch(err => {
                          // registration failed :(
                          console.log("ServiceWorker registration failed: ", err);
                        });
                    }`
                }}
              />
            )}
          </body>
        </html>
      );
    })
    .then(html => `<!doctype html>${html}`);
};

export default renderToHtml;
