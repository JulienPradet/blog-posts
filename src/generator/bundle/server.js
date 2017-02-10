import path from 'path'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import Helmet from 'react-helmet'
import App from '../tmp/App'
import { withAsyncComponents } from 'react-async-component'

const getPathsFromChunks = (paths) => (stats, htmlPath) => (
  stats.chunks
    .filter(({initial}) => initial)
    .map(({files}) => (
      files
        .filter((file) => !file.endsWith('.map'))
        .map((file) => (
          path.relative(path.dirname(htmlPath), path.join(paths.buildPath, file))
        ))
    ))
    .reduce((acc, arr) => [...acc, ...arr], [])
    .reverse()
)

const renderPageToHtml = (paths) => (jsPath, htmlPath, stats) => {
  let location = '/' + path.relative(
    paths.contentPath,
    path.dirname(jsPath)
  )
  if (!location.endsWith('/')) location += '/'

  const context = {}
  const server = (
    <StaticRouter
      location={location}
      context={context}
    >
      <App />
    </StaticRouter>
  )

  return withAsyncComponents(server)
    .then((result) => {
      const {
        appWithAsyncComponents,
        state,
        STATE_IDENTIFIER
      } = result

      const html = renderToString(appWithAsyncComponents)
      const head = Helmet.rewind()

      const topHead = Object.keys(head)
        .filter((key) => key !== 'script')
        .map((key) => head[key].toString())
        .join('')

      return renderToString(
        <html>
          <head dangerouslySetInnerHTML={{__html: topHead}} />
          <body>
            <div id='root' dangerouslySetInnerHTML={{__html: html}} />
            <script dangerouslySetInnerHTML={{__html: `${STATE_IDENTIFIER} = ${JSON.stringify(state)}`}} />
            {getPathsFromChunks(paths)(stats.children[0], htmlPath).map((jsPath, key) => (
              <script async src={jsPath} key={key} />
            ))}
          </body>
        </html>
      )
    })
}

const renderToHtml = (paths) => (jsPath, htmlPath, stats) => (
  renderPageToHtml(paths)(jsPath, htmlPath, stats)
    .then((html) => `<!doctype html>${html}`)
)

module.exports = renderToHtml
