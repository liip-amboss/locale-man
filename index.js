const program = require('commander')

const AddTranslation = require('./src/commands/AddTranslation')

program
  .version('0.0.1')
  .description('locale-man 👮: Interactive translation manager for node')

/**
 * Add a translation
 */
program
  .command(AddTranslation.command)
  .alias(AddTranslation.alias)
  .description(AddTranslation.description)
  .action(AddTranslation.handle)

program.parse(process.argv)
