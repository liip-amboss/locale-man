const { prompt } = require('inquirer')
const chalk = require('chalk')

const { printError, writeTranslationsToDisk, resolve } = require('../utils')

/**
 * Handle add local command
 * @param  {String} key Translation key
 * @param  {Object} options CLI options
 */
const handle = (key, options) => {
  if (!options.locales) {
    printError('Missing option "locales" (e.g. --locales de,fr)')
    process.exit(1)
  }

  if (!options.outputDir) {
    printError('Missing option "--output-dir" (e.g. --output-dir src/locale/)')
    process.exit(1)
  }

  const handleError = e => { if (!options.silent) { printError(e) } }

  const locales = options.locales.split(',')

  // generate a prompt object for each translation we want
  const questions = locales.map(locale => ({
    type: 'input',
    name: locale,
    message: `Enter translation for ${locale}:`
  }))

  // ask for translation in each language
  prompt(questions).then(answers => {
    const writeOperations = []
    // handle each locale
    locales.forEach(locale => {
      let payload = {
        key,
        locale,
        translation: answers[locale],
        dir: resolve(options.outputDir)
      }
      writeOperations.push(writeTranslationsToDisk(payload))
    })

    // when all translation files are updated
    Promise.all(writeOperations)
      .then(() => {
        if (!options.silent) {
          console.log(chalk.green('Translation files were updated. You can use it like this:'))
          console.log(chalk.black(chalk.bgCyan(`{{ $t('${key}') }}`)))
        }
      })
      .catch(handleError)
  })
    .catch(handleError)
}

module.exports = handle
