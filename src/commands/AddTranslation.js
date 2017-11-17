const { prompt } = require('inquirer')
const program = require('commander')
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const set = require('lodash.set')

const { printError } = require('../utils')

const jsonFile = require('jsonfile')

/**
 * Write a translation to it's corresponding file
 * @param  {String} locale       e.g. 'de'
 * @param  {String} key          e.g 'page.dashboard.title'
 * @param  {String} translation  The translation for <key>
 * @param  {String} dir          Directory to write files to
 * @return {Promise}
 */
const writeTranslationsToDisk = ({ locale, key, translation, dir }) => {
  return new Promise((resolve, reject) => {
    let translationFile = `${dir}/${locale}.json`
    jsonFile.readFile(translationFile, (err, obj) => {
      obj = obj || {}
      // this will transform dot notation
      set(obj, key, translation)
      jsonFile.writeFile(translationFile, obj, { spaces: 4 }, err => { reject(err) })
      resolve()
    })
  })
}

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
        dir: path.resolve(process.cwd(), options.outputDir)
      }
      writeOperations.push(writeTranslationsToDisk(payload))
    })

    // when all translation files are updated
    Promise.all(writeOperations)
      .then(() => { console.log(chalk.green('Translation files were updated')) })
      .catch(printError)
  })
  .catch(printError)
}

module.exports = handle
