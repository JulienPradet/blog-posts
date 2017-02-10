const path = require('path')
const fs = require('../util/fs')
const reduceObservable = require('../util/reduceObservable')
const log = require('../util/log')('CSS')

const createCss = (paths) => () => {
  log('info', 'Copying CSS files')
  const copyCss$ = fs.copyfile(paths.stylePath, path.join(paths.buildPath, 'css'), true)
    .do((cssPath) => log('debug', '/' + path.relative(paths.buildPath, cssPath)))

  return reduceObservable(
    (acc, path) => [...acc, path],
    [],
    copyCss$
  )
    .do((compiledCss) => log('success', `Copied ${compiledCss.length} css files`))
}

module.exports = createCss
