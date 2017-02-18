const path = require('path')
const Observable = require('rxjs').Observable
const fs = require('../util/fs')
const reduceObservable = require('../util/reduceObservable')
const log = require('../util/log')('RSS')
const sitemap = require('sitemap')

const createRss = (paths) => () => {
  log('info', 'Creating sitemap')

  const url = 'https://www.julienpradet.fr/'

  const meta$ = fs.getRecursiveFiles(Observable.of(paths.contentPath))
    .filter(({filepath}) => filepath.endsWith('meta.js'))
    .map(({filepath}) => {
      let meta
      try { meta = require(filepath) } catch (e) { return }

      return Object.assign(
        {},
        {location: path.relative(paths.contentPath, path.dirname(filepath))},
        meta
      )
    })
    .filter((meta) => meta)
    .filter((meta) => meta.isListed)

  return reduceObservable(
    (acc, meta) => [...acc, meta],
    [],
    meta$
  )
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
          { url: '/' },
          ...metas.map((meta) => ({
            url: meta.location + '/'
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
