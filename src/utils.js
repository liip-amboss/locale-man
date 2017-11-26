const chalk = require('chalk')
const jsonFile = require('jsonfile')
const set = require('lodash.set')
const path = require('path')

/**
 * Print an error
 * @param  {mixed} Error object or string
 */
const printError = e => {
  console.error(chalk.red(e))
}

/**
 * Resolve a path relative to the dir where the cmd was executed
 * @param  {String} path Relative path to be resolved
 * @return {String}      Absolute path
 */
const resolve = relPath => path.resolve(process.cwd(), relPath)

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
    jsonFile.readFile(translationFile, (e, obj) => {
      /* eslint-disable no-irregular-whitespace */
      obj = obj || {}
      // this will transform dot notation
      set(obj, key, translation)
      jsonFile.writeFile(translationFile, obj, { spaces: 4 }, err => { reject(err) })
      resolve()
    })
  })
}

module.exports = {
  printError,
  writeTranslationsToDisk,
  resolve
}
