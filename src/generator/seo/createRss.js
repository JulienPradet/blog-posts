const path = require("path");
const fs = require("../util/fs");
const log = require("../util/log")("SEO");
const getMetas = require("./getMetas");
const RSS = require("rss");

const createRss = paths => () => {
  log("info", "Creating feed");

  const url = "https://www.julienpradet.fr/";
  const author = "Julien Pradet";

  let rss = new RSS({
    title: "Enchanté, commit42",
    description:
      "Un blog qui parle surtout de développement web. Peut-être un peu de culture et de vie aussi. Sait-on jamais.",
    feed_url: url + "feed.xml",
    language: "fr",
    ttl: 60
  });

  return getMetas(paths)()
    .do(metas => {
      metas
        .filter(meta => meta.isListed)
        .sort((metaA, metaB) => {
          if (metaA.date < metaB.date) {
            return 1;
          } else if (metaA.date > metaB.date) {
            return -1;
          }
          return 0;
        })
        .forEach(meta => {
          rss.item({
            title: meta.title,
            url: url + meta.location + "/",
            description: meta.description,
            categories: meta.tags,
            author: meta.author || author,
            date: new Date(meta.date)
          });
        });
    })
    .map(() => rss.xml())
    .flatMap(feed => fs.writefile(path.join(paths.buildPath, "feed.xml"), feed))
    .do(path => log("success", `Feed created`));
};

module.exports = createRss;
