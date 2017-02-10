const createApp = require('./app/createApp')
const createBundles = require('./bundle/createBundles')
const createStaticHtml = require('./static/createStaticHtml')
const createCss = require('./css/createCss')
const Observable = require('rxjs').Observable

const generate = (paths) => {
  const app$ = createApp(paths)().share()
  const stats$ = createBundles(paths)(app$)
  const html$ = createStaticHtml(paths)(app$, stats$)
  return html$.flatMap(() => createCss(paths)())
}

module.exports = generate
