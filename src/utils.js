const chalk = require('chalk')

/**
 * Print an error
 * @param  {mixed} Error object or string
 */
const printError = e => {
  console.error(chalk.red(e))
}

module.exports = {
  printError
}
