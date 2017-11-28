const program = require('commander')
const chalk = require('chalk')

const AddTranslation = require('./src/commands/AddTranslation')
const BulkAdd = require('./src/commands/BulkAdd')

if (!process.env.LISTENING_TO_UNHANDLED_REJECTION) {
  process.on('unhandledRejection', reason => {
    console.log(reason)
  })
  // Avoid memory leak by adding too many listeners
  process.env.LISTENING_TO_UNHANDLED_REJECTION = true
}

const wrapWithErrorHandler = (command, ...args) => {
  return async (...args) => {
    try {
      await command(...args)
    } catch (e) {
      console.log(chalk.red(e.stack))
      process.exitCode = 1
    }
  }
}

program
  .version('0.0.5')
  .description('locale-man 👮: Interactive translation manager for node')

/**
 * Add a translation
 */
program
  .command('add <key>')
  .alias('a')
  .description('Add a translation')
  .action(wrapWithErrorHandler(AddTranslation.handle))
  .option('-l, --locales <locales>', 'Comma-spearated list of supported locales')
  .option('-o, --output-dir <output-dir>', 'Path to folder with json translation files')
  .option('-s, --silent', 'Silent mode (no output)')

/**
 * Bulk add
 */
program
  .command('bulk-add')
  .alias('ba')
  .description('Add several translations at once')
  .action(wrapWithErrorHandler(BulkAdd.handle))
  .option('-l, --locales <locales>', 'Comma-spearated list of supported locales')
  .option('-o, --output-dir <output-dir>', 'Path to folder with json translation files')
  .option('-s, --silent', 'Silent mode (no output)')

program.parse(process.argv)
