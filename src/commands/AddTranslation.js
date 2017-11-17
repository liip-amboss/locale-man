const { prompt } = require('inquirer')
const program = require('commander')
const fs = require('fs')
const chalk = require('chalk')
const set = require('lodash.set')

const path = require('path')
const appDir = path.dirname(require.main.filename)
const getFileFromProject = path => {
  return appDir + '/' + path
}

const { printError } = require('../utils')

const config = require(getFileFromProject('config'))
const jsonFile = require('jsonfile')

/**
 * Write a translation to it's corresponding file
 * @param  {String} locale       e.g. 'de'
 * @param  {String} key          e.g 'page.dashboard.title'
 * @param  {String} translation  The translation for <key>
 * @return {Promise}
 */
const writeTranslationsToDisk = ({ locale, key, translation }) => {
  return new Promise((resolve, reject) => {
    let translationFile = getFileFromProject(`${config.localeDir}/${locale}.json`)
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
 */
const handle = key => {
  // generate a prompt object for each translation we want
  const questions = config.supportedLocales.map(locale => ({
    type: 'input',
    name: locale,
    message: `Enter translation for ${locale}:`
  }))

  // ask for translation in each language
  prompt(questions).then(answers => {
    const writeOperations = []
    // handle each locale
    config.supportedLocales.forEach(locale => {
      let payload = {
        key,
        locale,
        translation: answers[locale]
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

/**
 * Command interface for commander.js
 */
module.exports = {
  alias: 'a',
  command: 'add <key>',
  description: 'Add a translation',
  handle
}
