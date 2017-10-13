const prettier = require("prettier");
const escapeHtml = require("escape-html");

const prettify = (printWidth, tabWidth) => code =>
  prettier.format(code, {
    printWidth: printWidth,
    tabWidth: tabWidth,
    singleQuote: true,
    trailingComma: "none",
    bracketSpacing: true,
    parser: "babylon"
  });

const transformCode = (printWidth, tabWidth, lang) => code =>
  ["js", "react", "jsx"].indexOf(lang) > -1
    ? prettify(printWidth, tabWidth)(code)
    : code;

const getLangFromQuery = query => {
  let lang = query.replace("?", "");
  if (lang.length === 0) lang = "jsx";
  return lang;
};

module.exports = function markdownLoader(content) {
  const lang = getLangFromQuery(this.resourceQuery);
  const module = {
    lang,
    code: [
      {
        printWidth: 70,
        tabwidth: 2,
        code: escapeHtml(transformCode(70, 2, lang)(content))
      },
      {
        printWidth: 45,
        tabwidth: 1,
        code: escapeHtml(transformCode(45, 1, lang)(content))
      }
    ]
  };

  return `module.exports = ${JSON.stringify(module)};`;
};
