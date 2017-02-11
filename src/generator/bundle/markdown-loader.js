var Prism = require('prismjs')
var markdown = require('markdown-it')
require('prismjs/components/prism-jsx')

const md = markdown({
  html: true,
  xhtmlOut: false,
  breaks: false,
  linkify: false,
  typographer: false,
  quotes: '“”‘’',
  highlight: function (code, lang = 'jsx') {
    if (!Prism.languages.hasOwnProperty(lang)) {
      lang = 'jsx'
    }

    return `<pre class="language-${lang}"><code>${Prism.highlight(code, Prism.languages[lang])}</code></pre>`
  }
})
.use(require('markdown-it-anchor'), {
  permalink: true,
  permalinkBefore: true,
  permalinkSymbol: '#'
})

module.exports = function markdownLoader (content) {
  return 'module.exports = ' + JSON.stringify(md.render(content))
}
