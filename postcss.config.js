module.exports = (config) => [
  require('stylelint')(),
  require('postcss-cssnext')({
    browsers: 'last 2 versions',
    features: {
      customProperties: {
        variables: {
          maxWidth: '40rem',
          colorPrimaryDark: '#000000',
          colorPrimary: '#00c9c9',
          colorSecondaryDark: '#006a7b',
          colorSecondary: '#006a7b',
          colorNeutralDark: '#000',
          colorNeutral: '#444',
          colorNeutralLight: '#FBFCFC',
          colorText: '#222'
        }
      }
    }
  }),
  require('postcss-reporter')(),
  ...!config.production ? [
    require('postcss-browser-reporter')()
  ] : []
]
