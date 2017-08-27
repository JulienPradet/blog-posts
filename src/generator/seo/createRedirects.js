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
        .filter(meta => meta.redirect)
        .map(meta =>
          meta.redirect.map(
            redirect =>
              `${ensureSlash(redirect)}    ${ensureSlash(meta.location)}   301`
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
