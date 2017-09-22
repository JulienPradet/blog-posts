const path = require("path");
const fs = require("../util/fs");
const log = require("../util/log")("SEO");
const getMetas = require("./getMetas");
const sitemap = require("sitemap");

const createRss = paths => () => {
  log("info", "Creating sitemap");

  const url = "https://www.julienpradet.fr/";

  return getMetas(paths)()
    .map(metas => {
      return sitemap.createSitemap({
        hostname: url,
        urls: [
          { url: "/", changefreq: "weekly" },
          ...metas
            .filter(meta => !meta.removeFromSitemap)
            .filter(meta => {
              if (!meta.date) {
                log(
                  "warn",
                  `Page removed from sitemap because there is no date in meta.js "/${meta.location}" `
                );
              }
              return meta.date;
            })
            .map(meta => ({
              url: meta.location,
              lastmodISO: new Date(meta.date).toISOString()
            }))
        ]
      });
    })
    .map(sitemap => sitemap.toString())
    .flatMap(sitemap =>
      fs.writefile(path.join(paths.buildPath, "sitemap.xml"), sitemap)
    )
    .do(path => log("success", `Sitemap created`));
};

module.exports = createRss;
