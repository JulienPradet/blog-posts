const path = require("path");
const fs = require("../util/fs");
const log = require("../util/log")("SEO");
const getMetas = require("./getMetas");

const ensureSlash = location => {
  if (!location.startsWith("/")) {
    location = `/${location}`;
  }
  if (!location.endsWith("/")) {
    location = `${location}/`;
  }
  return location;
};

const removeTrailingSlash = location => {
  if (location === "/") {
    return "/";
  }
  if (location.endsWith("/")) {
    location = location.substr(0, location.length - 1);
  }
  return location;
};

const getRedirectsFromMeta = (url, meta) => {
  let redirects =
    url === "/" ? [] : [`${removeTrailingSlash(ensureSlash(url))}`];

  if (meta.redirect) {
    redirects = redirects.concat(
      meta.redirect
        .map(removeTrailingSlash)
        .map(url => [url, `${url}/`])
        .reduce((acc, curr) => [...acc, ...curr], [])
    );
  }

  return redirects;
};

const createRedirects = paths => () => {
  log("info", "Creating redirects");

  return getMetas(paths)()
    .map(metas =>
      metas
        .map(meta => {
          return Object.assign({}, meta, {
            redirect: getRedirectsFromMeta(meta.location, meta)
          });
        })
        .filter(meta => meta.redirect)
        .map(meta =>
          meta.redirect.map(
            redirect => `${redirect}    ${ensureSlash(meta.location)}   301`
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

createRedirects.getRedirectsFromMeta = getRedirectsFromMeta;

module.exports = createRedirects;
