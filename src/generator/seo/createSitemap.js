const path = require('path')
const fs = require('../util/fs')
const log = require('../util/log')('SEO')
const getMetas = require('./getMetas')
const sitemap = require('sitemap')

const createRss = (paths) => () => {
  log('info', 'Creating sitemap')

  const url = 'https://www.julienpradet.fr/'

  return getMetas(paths)()
    .map((metas) => metas.sort((metaA, metaB) => {
      if (metaA.date < metaB.date) {
        return 1
      } else if (metaA.date > metaB.date) {
        return -1
      }
      return 0
    }))
    .map((metas) => {
      return sitemap.createSitemap({
        hostname: url,
        urls: [
          { url: '/', changefreq: 'weekly' },
          ...metas.map((meta) => ({
            url: meta.location + '/',
            lastmodISO: (new Date(meta.date)).toISOString()
          }))
        ]
      })
    })
    .map((sitemap) => sitemap.toString())
    .flatMap((sitemap) => (
      fs.writefile(
        path.join(paths.buildPath, 'sitemap.xml'),
        sitemap
      )
    ))
    .do((path) => log('success', `Sitemap created`))
}

module.exports = createRss
