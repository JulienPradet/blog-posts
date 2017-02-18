const createManifest = require('./createManifest')
const log = require('../util/log')('PWA')

const createPwaFiles = (paths) => () => {
  log('info', 'Start generating PWA files')
  return createManifest(paths)()
    .do(() => log('debug', 'Manifest generated'))
    .do(() => log('success', 'PWA ready!'))
}

module.exports = createPwaFiles
