const Prism = require("prismjs");
require("prismjs/components/prism-jsx");
const escapeHtml = require("escape-html");
const markdown = require("markdown-it");

const md = markdown({
  html: true,
  xhtmlOut: false,
  breaks: false,
  linkify: false,
  typographer: false,
  quotes: "“”‘’",
  highlight: function(code, lang = "jsx") {
    if (!Prism.languages.hasOwnProperty(lang)) {
      if (lang !== "") {
        console.warn(`Language "${lang}" is not supported.`);
      }
      lang = "jsx";
    }

    return `<pre class="language-${lang}" data-lang="${lang}"><code>${escapeHtml(
      code
    )}</code></pre>`;
  }
}).use(require("markdown-it-anchor"), {
  permalink: true,
  permalinkBefore: true,
  permalinkSymbol: "#"
});

module.exports = function markdownLoader(content) {
  return "module.exports = " + JSON.stringify(md.render(content));
};
