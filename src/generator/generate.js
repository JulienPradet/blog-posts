const createApp = require('./app/createApp')
const createBundles = require('./bundle/createBundles')
const createStaticHtml = require('./static/createStaticHtml')
const createPublic = require('./public/createPublic')
const createRss = require('./rss/createRss')

const generate = (paths) => {
  const app$ = createApp(paths)().share()
  const stats$ = createBundles(paths)(app$)
  const html$ = createStaticHtml(paths)(app$, stats$)
  return html$
    .flatMap(() => createPublic(paths)())
    .flatMap(() => createRss(paths)())
}

module.exports = generate
