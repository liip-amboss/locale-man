const { prompt } = require('inquirer')
const chalk = require('chalk')

const { printError, writeTranslationsToDisk, pathResolve } = require('../utils')

/**
 * Prompt the user for translations in each locale
 * @param  {String} key Translation key
 * @param  {Object} options CLI options
 * @return {Promise}
 */
const askForTranslations = async (key, options) => {
  if (!options.locales) {
    printError('Missing option "locales" (e.g. --locales de,fr)')
    process.exit(1)
  }

  if (!options.outputDir) {
    printError('Missing option "--output-dir" (e.g. --output-dir src/locale/)')
    process.exit(1)
  }

  const locales = options.locales.split(',')

  // generate a prompt object for each translation we want
  const questions = locales.map(locale => ({
    type: 'input',
    name: locale,
    message: `Enter translation for ${locale}:`
  }))

  // ask for translation in each language
  const answers = await prompt(questions)

  // handle each locale
  for (let locale of locales) {
    let payload = {
      key,
      locale,
      translation: answers[locale],
      dir: pathResolve(options.outputDir)
    }
    await writeTranslationsToDisk(payload)
  }
}

/**
 * Handle add local command
 * @param  {String} key Translation key
 * @param  {Object} options CLI options
 */
const handle = async (key, options) => {
  await askForTranslations(key, options)
  if (!options.silent) {
    console.log(chalk.green('Translation files were updated. You can use it like this:'))
    console.log(chalk.black(chalk.bgCyan(`{{ $t('${key}') }}`)))
  }
}

module.exports = {
  handle,
  askForTranslations
}
