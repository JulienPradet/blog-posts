const chalk = require('chalk')

const typeToColor = {
  error: chalk.red,
  warn: chalk.yellow,
  log: chalk.white,
  info: chalk.gray,
  debug: chalk.blue,
  success: chalk.green
}
const typeToTitleColor = {
  error: chalk.white.bgRed.bold,
  warn: chalk.black.bgYellow.bold,
  log: chalk.black.bgWhite.bold,
  info: chalk.white.bgBlack.bold,
  debug: chalk.bgBlue.white.bold,
  success: chalk.bgGreen.white.bold
}

const appendChar = ' '
let longestTitle = 10

const appendSpaces = (n, subject = '') => {
  while (subject.length < n) {
    subject = appendChar + subject
  }
  return subject
}

const message = (subject) => (type, string, displayTitle = true) => {
  if (!typeToColor.hasOwnProperty(type)) {
    console.log(typeToColor.warn(`Type ${type} is not defined as logging type`))
    type = 'info'
  }

  if (subject.length < longestTitle) {
    subject = appendSpaces(longestTitle, subject)
  } else {
    longestTitle = subject.length
  }

  const title = displayTitle
    ? typeToTitleColor[type](subject + ' ')
    : appendSpaces(longestTitle + 1)
  const message = typeToColor[type](string)
  console.log(title + ' ' + message)
}

module.exports = message
