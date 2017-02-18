
const path = require('path')
const {Observable} = require('rxjs')
const fs = require('../util/fs')
const reduceObservable = require('../util/reduceObservable')
const log = require('../util/log')('STATIC')

const toHtmlPath = (path) => {
  return path.replace('index.js', 'index.html')
}

const createHtml = (paths) => (entry$, stats$) => {
  return entry$
    .combineLatest(stats$, ({entryPath, pages}, stats) => ({stats, entryPath, pages}))
    .do(() => log('info', 'Creating static HTML'))
    .flatMap(({stats, entryPath, pages}) => {
      const pages$ = Observable.from(pages)
        .map((page) => ({
          htmlPath: toHtmlPath(page),
          jsPath: page
        }))
        .flatMap(({htmlPath, jsPath}) => {
          const buildPath = path.join(
            paths.buildPath,
            path.relative(paths.contentPath, htmlPath)
          )

          require('../bundle/date-polyfill')
          const renderToHtml = require(path.join(__dirname, '../tmp/server.js'))

          log('debug', '/' + path.relative(paths.contentPath, htmlPath).replace('index.html', ''))

          return Observable.fromPromise(
            renderToHtml(paths)(jsPath, buildPath, stats)
          )
            .flatMap((html) => (
              fs.mkdirp(path.dirname(buildPath))
                .flatMap(() => fs.writefile(
                  buildPath,
                  html
                ))
            ))
        })

      return reduceObservable(
        (acc, filepath) => [...acc, filepath],
        [],
        pages$
      )
        .do((pages) => log('success', `Built ${pages.length} pages`))
    })
}

module.exports = createHtml
