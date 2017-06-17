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

const createRouterMatch = paths =>
  pagePath => {
    return {
      createComponent: `
      asyncPages[${JSON.stringify(pagePath)}] = asyncComponent({
        resolve: () => import(${JSON.stringify(pagePath)})
          .then((Content) => ({
            default: (props) => {
              return <Page page={require(${JSON.stringify(pagePath.replace("index.js", "meta.js"))})} path={props.match.path}>
                <Content.default />
              </Page>
            }
          })),
        LoadingComponent: (props) => {
          const meta = require(${JSON.stringify(pagePath.replace("index.js", "meta.js"))})
          return <Page page={meta} path={props.match.path}>
            <Loading />
          </Page>
        },
        ErrorComponent: (props) => {
          return <Page page={require(${JSON.stringify(pagePath.replace("index.js", "meta.js"))})} path={props.match.path}>
            Oops! Il y a eu un problème lors de la récupération de l'article.<br />
            Peut-être des problèmes de connexion&nbsp;?
          </Page>
        }
      })
    `,
      match: `
      <Route
        exact
        path={${JSON.stringify(transformUrl(path.relative(paths.contentPath, pagePath)))}}
        render={({match}) => {
          const Page = asyncPages[${JSON.stringify(pagePath)}]
          return <Page match={match} />
        }}
      />
    `,
      path: pagePath
    };
  };

module.exports = createRouterMatch;
