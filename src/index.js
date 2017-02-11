const path = require('path')
const generate = require('./generator/generate')
const log = require('./generator/util/log')('GENERATOR')

process.env.SERVER = true

log('info', 'Starting static site building')

generate({
  sitePath: path.join(__dirname, './site'),
  contentPath: path.join(__dirname, './content'),
  publicPath: path.join(__dirname, './public'),
  buildPath: path.join(__dirname, '../build')
}).subscribe(
  () => log('success', 'Compiled.'),
  (error) => {
    log('error', error)
    process.exit(1)
  }
)
