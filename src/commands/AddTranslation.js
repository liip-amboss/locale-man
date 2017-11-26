const { prompt } = require('inquirer')
const chalk = require('chalk')

const { printError, writeTranslationsToDisk, pathResolve } = require('../utils')

/**
 * Prompt the user for translations in each locale
 * @param  {String} key Translation key
 * @param  {Object} options CLI options
 * @return {Promise}
 */
const askForTranslations = (key, options) => {
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

  return new Promise((resolve, reject) => {
    // ask for translation in each language
    prompt(questions).then(answers => {
      const writeOperations = []
      // handle each locale
      locales.forEach(locale => {
        let payload = {
          key,
          locale,
          translation: answers[locale],
          dir: pathResolve(options.outputDir)
        }
        writeOperations.push(writeTranslationsToDisk(payload))
      })

      // when all translation files are updated
      Promise.all(writeOperations)
        .then(resolve)
        .catch(reject)
    })
      .catch(reject)
  })
}

/**
 * Handle add local command
 * @param  {String} key Translation key
 * @param  {Object} options CLI options
 */
const handle = (key, options) => {
  const handleError = e => { if (!options.silent) { printError(e) } }

  askForTranslations(key, options)
    .then(() => {
      if (!options.silent) {
        console.log(chalk.green('Translation files were updated. You can use it like this:'))
        console.log(chalk.black(chalk.bgCyan(`{{ $t('${key}') }}`)))
      }
    })
    .catch(handleError)
}

module.exports = {
  handle,
  askForTranslations
}
