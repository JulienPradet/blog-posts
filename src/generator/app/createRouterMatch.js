const path = require("path");

const transformUrl = url => {
  if (!url.startsWith("/")) {
    url = "/" + url;
  }
  if (url.endsWith(".js")) {
    url = url.substr(0, url.length - 3);
  }
  if (url.endsWith("/index")) {
    url = url.substr(0, url.length - 5);
  }
  if (!url.endsWith("/")) {
    url += "/";
  }

  return url;
};

const createRouterMatch = paths => pagePath => {
  const meta = require(pagePath.replace("index.js", "meta.js"));
  const layout = meta.layout;
  const url = transformUrl(path.relative(paths.contentPath, pagePath));

  return {
    createComponent: `
      if (!asyncPages[${JSON.stringify(layout)}]) {
        asyncPages[${JSON.stringify(layout)}] = {}
      }
      asyncPages[${JSON.stringify(layout)}][${JSON.stringify(url)}] = ({
        meta: require(${JSON.stringify(
          pagePath.replace("index.js", "meta.js")
        )}),
        Component: loadable(() => import(${JSON.stringify(pagePath)}), {
          LoadingComponent: (props) => {
            return <Loading />
          },
          ErrorComponent: ({error, props}) => {
            return <div>
              Oops! Il y a eu un problème lors de la récupération de l'article.<br />
              Peut-être des problèmes de connexion&nbsp;?
            </div>
          }
        })
      })
    `,
    path: pagePath
  };
};

module.exports = createRouterMatch;
