const Prism = require('prismjs')
require('prismjs/components/prism-jsx')
const prettier = require('prettier')

const prettify = (printWidth, tabWidth) => (code) => (
  prettier.format(
    code,
    {
      printWidth: printWidth,
      tabWidth: tabWidth,
      singleQuote: false,
      trailingComma: false,
      bracketSpacing: true,
      parser: 'babylon'
    }
  )
)

const highlight = (lang) => (code) => (
  Prism.highlight(code, Prism.languages[lang])
)

const transformCode = (printWidth, tabWidth, lang) => (code) => (
  highlight(lang)(prettify(printWidth, tabWidth)(code))
)

const getLangFromQuery = (query) => {
  let lang = query.replace('?', '')
  if (lang.length === 0) lang = 'jsx'
  return lang
}

module.exports = function markdownLoader (content) {
  const lang = getLangFromQuery(this.query)
  return 'module.exports = ' + JSON.stringify([
    {
      printWidth: 70,
      tabwidth: 2,
      code: transformCode(70, 2, lang)(content)
    },
    {
      printWidth: 45,
      tabwidth: 1,
      code: transformCode(45, 1, lang)(content)
    }
  ])
}
