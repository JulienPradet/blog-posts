const path = require('path')
const webpack = require('webpack')
const Observable = require('rxjs').Observable
const log = require('../util/log')('BUNDLE')

const baseConfig = (paths) => (pages, entryPath) => {
  return {
    devtool: process.env.NODE_ENV === 'production' ? 'source-map' : 'cheap-module-source-map',
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.js$/,
          loader: 'eslint-loader'
        },
        {
          test: /\.js$/,
          exclude: [
            /(node_modules|bower_components)/
          ],
          loader: 'babel-loader',
          options: {
            presets: [
              'react-app'
            ]
          }
        },
        {
          test: /\.md$/,
          loader: './' + path.relative(process.cwd(), 'src/generator/bundle/markdown-loader.js')
        },
        {
          test: /\.code$/,
          loader: 'raw-loader'
        },
        {
          test: /\.svg$/,
          loader: 'raw-loader'
        }
      ]
    },
    plugins: [
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        options: {
          context: path.join(process.cwd(), 'src')
        }
      }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production')
        }
      })
    ].concat(
      process.env.NODE_ENV === 'production'
        ? [
          new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: { warnings: false }
          })
        ]
        : []
    )
  }
}

const webpackConfig = (paths) => (pages, entryPath) => {
  const browserEntry = Object.assign(
    {},
    baseConfig(paths)(pages, entryPath),
    {
      entry: {
        app: './src/generator/bundle/browser.js'
      }
    }
  )
  browserEntry.output = {
    path: paths.buildPath,
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: '/'
  }

  const serverEntry = Object.assign(
    {},
    baseConfig(paths)(pages, entryPath),
    {
      entry: {
        server: './src/generator/bundle/server.js'
      },
      target: 'node'
    }
  )
  serverEntry.externals = /^[\w-\d]$/
  serverEntry.output = {
    path: path.join(__dirname, '../tmp'),
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: '/',
    libraryTarget: 'commonjs2'
  }

  return [
    browserEntry,
    serverEntry
  ]
}

const makeWebpackConfig = (paths) => (entry$) => {
  return entry$.map(({pages, entryPath}) => (
    webpackConfig(paths)(pages, entryPath)
  ))
}

const makeCompiler = (paths) => (config$) => {
  return config$.map((config) => webpack(config))
}

const compile = (paths) => (compiler$) => {
  return compiler$
    .do(() => log('info', 'Compiling'))
    .flatMap((compiler) => (
      Observable.create((observer) => {
        compiler.plugin('invalid', function () {
          log('info', 'Compiling')
        })

        compiler.plugin('done', function (stats) {
          const messages = stats.toJson({}, true)
          if (messages.errors.length > 0 || messages.warnings.length > 0) {
            if (messages.errors.length > 0) {
              messages.errors.forEach((message) => (
                log('error', message)
              ))
            }

            if (messages.warnings.length > 0) {
              messages.warnings.forEach((message) => (
                log('warn', message)
              ))
            }
          } else {
            log('success', 'Bundles created')
          }
        })

        compiler.run(function (err, stats) {
          if (err) {
            observer.error(err)
          } else {
            const result = stats.toJson()
            observer.next(result)
          }
          observer.complete()
        })
      })
    ))
}

const createBundle = (paths) => (entry$) => {
  const webpackConfig$ = makeWebpackConfig(paths)(entry$)
  const compiler$ = makeCompiler(paths)(webpackConfig$)
  return compile(paths)(compiler$)
}

module.exports = createBundle
