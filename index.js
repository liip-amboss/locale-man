const program = require('commander')

const AddTranslation = require('./src/commands/AddTranslation')

program
  .version('0.0.1')
  .description('locale-man 👮: Interactive translation manager for node')

/**
 * Add a translation
 */
program
  .command('add <key>')
  .alias('a')
  .description('Add a translation')
  .action(AddTranslation)
  .option('-l, --locales <locales>', 'Comma-spearated list of supported locales')
  .option('-o, --output-dir <output-dir>', 'Path to folder with json translation files')

program.parse(process.argv)
