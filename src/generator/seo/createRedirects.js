const path = require("path");
const fs = require("../util/fs");
const log = require("../util/log")("SEO");
const getMetas = require("./getMetas");

const ensureSlash = location => {
  if (!location.startsWith("/")) {
    location = `/${location}`;
  }
  return location;
};

const createRss = paths => () => {
  log("info", "Creating redirects");

  return getMetas(paths)()
    .map(metas =>
      metas
        .map(meta => {
          let redirects = [`${ensureSlash(meta.location)}`];

          if (meta.redirect) {
            redirects = redirects.concat(
              meta.redirect
                .map(url => {
                  if (url.endsWith("/")) {
                    return [url, url.substring(0, -1)];
                  } else {
                    return [url, `${url}/`];
                  }
                })
                .reduce((acc, curr) => [...acc, ...curr], [])
            );
          }

          return Object.assign({}, meta, {
            redirect: redirects
          });
        })
        .filter(meta => meta.redirect)
        .map(meta =>
          meta.redirect.map(
            redirect =>
              `${ensureSlash(redirect)}    ${ensureSlash(meta.location)}/   301`
          )
        )
        .reduce((acc, redirects) => acc.concat(redirects), [])
        .join("\n")
    )
    .flatMap(sitemap =>
      fs.writefile(path.join(paths.buildPath, "_redirects"), sitemap)
    )
    .do(metas => log("success", "redirects created"));
};

module.exports = createRss;
