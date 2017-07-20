const path = require("path");
const fs = require("../util/fs");
const reduceObservable = require("../util/reduceObservable");
const readPages = require("./readPages");
const createRouterMatch = require("./createRouterMatch");
const log = require("../util/log")("APP");

const transformToMatches = paths => pages$ => {
  return pages$.map(pagePath => createRouterMatch(paths)(pagePath));
};

const makeMeta = () => {
  const packageInfo = require("../../../package.json");
  return {
    author: packageInfo.author,
    twitter: packageInfo.twitter,
    homepage: packageInfo.homepage,
    site_name: packageInfo.site_name
  };
};

const ensureSlash = location => {
  if (!location.startsWith("/")) {
    location = "/" + location;
  }
  if (!location.endsWith("/")) {
    location = location + "/";
  }

  return location;
};

const makePages = paths => pages => {
  return pages
    .map(pagePath => {
      const location = ensureSlash(
        path.relative(paths.contentPath, path.dirname(pagePath))
      );
      const metaPath = path.join(path.dirname(pagePath), "meta.js");

      let meta;
      try {
        meta = require(metaPath);
      } catch (e) {
        return null;
      }

      return Object.assign({}, meta, {
        location: location,
        pagePath: pagePath
      });
    })
    .filter(page => page)
    .filter(page => page.isListed)
    .sort((metaA, metaB) => {
      if (metaA.date < metaB.date) {
        return 1;
      } else if (metaA.date > metaB.date) {
        return -1;
      }
      return 0;
    })
    .map(
      page => `
        {
          ...require(${JSON.stringify(
            path.join(path.dirname(page.pagePath), "meta.js")
          )}),
          location: ${JSON.stringify(page.location)}
        }
      `
    );
};

const makeEntry = paths => matches$ => {
  return reduceObservable(
    (matches, match) => [...matches, match],
    [],
    matches$
  ).map(
    matches =>
      `
        const React = require('react')
        const loadable = require('loadable-components').default;
        const SiteProvider = require('../../site/Site').default
        const AnimationContainer = require('../../site/components/Animation/Container').default
        const Loading = require('../../site/components/Loading').default
        const Routes = require('../../site/Routes').default

        const meta = ${JSON.stringify(makeMeta())}
        const pages = [
          ${makePages(paths)(matches.map(({ path }) => path)).join(",")}
        ].map(page => {
          return Object.assign({}, page, {
            date: page.date && new Date(page.date),
            isPage: typeof page.isPage === "undefined" ? true : page.isPage
          });
        });

        const asyncPages = {}
        ${matches.map(({ createComponent }) => createComponent).join("\n")}

        const App = () => (
          <SiteProvider meta={meta} pages={pages}>
            <AnimationContainer>
              <Routes routes={asyncPages} />
            </AnimationContainer>
          </SiteProvider>
        )

        module.exports = App
      `
  );
};

const saveEntry = paths => entry$ => {
  const savePath = path.join(__dirname, "../tmp/App.js");
  return fs
    .mkdirp(path.join(__dirname, "../tmp"))
    .combineLatest(entry$, (_, entry) => entry)
    .flatMap(entry => fs.writefile(savePath, entry));
};

const createEntry = paths => () => {
  log("info", "Reading pages");

  const pages$ = readPages(paths.contentPath)
    .do(page => log("debug", "/" + path.relative(paths.contentPath, page)))
    .share();

  const matches$ = transformToMatches(paths)(pages$);
  const entry$ = makeEntry(paths)(matches$);
  const entryPath$ = saveEntry(paths)(entry$);

  return reduceObservable((pages, page) => [...pages, page], [], pages$)
    .do(pages => log("success", `Aggregated ${pages.length} pages`))
    .combineLatest(entryPath$, (pages, entryPath) => ({
      entryPath,
      pages
    }));
};

module.exports = createEntry;
