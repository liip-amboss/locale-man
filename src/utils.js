/**
 * Print an error
 * @param  {mixed} Error object or string
 */
const printError = e => {
  console.error(chalk.red('Something went wrong: ' + e))
}

module.exports = {
  printError
}
