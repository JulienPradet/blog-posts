const path = require('path')
const Observable = require('rxjs').Observable
const fs = require('../util/fs')
const reduceObservable = require('../util/reduceObservable')
const log = require('../util/log')('RSS')
const RSS = require('rss')

const createRss = (paths) => () => {
  log('info', 'Creating feed')

  const url = 'https://julienpradet.github.io/'
  const author = 'Julien Pradet'

  let rss = new RSS({
    title: 'Enchanté, Julien Pradet',
    description: 'Un blog qui parle surtout de développement web. Peut-être un peu de culture et de vie aussi. Sait-on jamais.',
    feed_url: url + 'feed.xml',
    language: 'fr',
    ttl: 60
  })

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
    .do((metas) => {
      metas.forEach((meta) => {
        rss.item({
          title: meta.title,
          url: url + meta.location + '/',
          description: meta.description,
          categories: meta.tags,
          author: meta.author || author,
          date: new Date(meta.date)
        })
      })
    })
    .map(() => rss.xml())
    .flatMap((feed) => (
      fs.writefile(
        path.join(paths.buildPath, 'feed.xml'),
        feed
      )
    ))
    .do((path) => log('success', `Feed created`))
}

module.exports = createRss
