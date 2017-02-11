const path = require('path')
const fs = require('../util/fs')
const reduceObservable = require('../util/reduceObservable')
const readPages = require('./readPages')
const createRouterMatch = require('./createRouterMatch')
const log = require('../util/log')('APP')

const transformToMatches = (paths) => (pages$) => {
  return pages$
    .map((pagePath) => createRouterMatch(paths)(pagePath))
}

const makeMeta = () => {
  const packageInfo = require('../../../package.json')
  return {
    author: packageInfo.author,
    twitter: packageInfo.twitter,
    homepage: packageInfo.homepage,
    site_name: packageInfo.site_name
  }
}

const makePages = (paths) => (pages) => {
  return pages
    .map((pagePath) => {
      const location = '/' + path.relative(paths.contentPath, path.dirname(pagePath))
      const metaPath = path.join(path.dirname(pagePath), 'meta.js')

      let meta
      try { meta = require(metaPath) } catch (e) { return }

      return Object.assign({}, meta, {
        location: location
      })
    })
    .filter((page) => page)
    .filter((page) => page.isListed)
}

const makeEntry = (paths) => (matches$) => {
  return reduceObservable(
    (matches, match) => [...matches, match],
    [],
    matches$
  )
    .map((matches) => (
      `
        const React = require('react')
        const Route = require('react-router-dom').Route
        const createAsyncComponent = require('react-async-component').createAsyncComponent
        const SiteProvider = require('../../site/Site').default
        require('react-helmet')

        const asyncPages = {}

        ${matches
          .map(({createComponent}) => createComponent)
          .join('\n')}

        const App = () => (
          <SiteProvider meta={${JSON.stringify(makeMeta())}} pages={${JSON.stringify(makePages(paths)(matches.map(({path}) => path)))}}>
            <div>
              ${matches
                .map(({match}) => match)
                .join('\n')}
            </div>
          </SiteProvider>
        )

        module.exports = App
      `
    ))
}

const saveEntry = (paths) => (entry$) => {
  const savePath = path.join(__dirname, '../tmp/App.js')
  return fs.mkdirp(path.join(__dirname, '../tmp'))
    .combineLatest(entry$, (_, entry) => entry)
    .flatMap((entry) => fs.writefile(savePath, entry))
}

const createEntry = (paths) => () => {
  log('info', 'Reading pages')

  const pages$ = readPages(paths.contentPath)
    .do((page) => log('debug', '/' + path.relative(paths.contentPath, page)))
    .share()
  const matches$ = transformToMatches(paths)(pages$)
  const entry$ = makeEntry(paths)(matches$)
  const entryPath$ = saveEntry(paths)(entry$)

  return reduceObservable(
    (pages, page) => [...pages, page],
    [],
    pages$
  )
    .do((pages) => log('success', `Aggregated ${pages.length} pages`))
    .combineLatest(entryPath$, (pages, entryPath) => ({
      entryPath,
      pages
    }))
}

module.exports = createEntry
