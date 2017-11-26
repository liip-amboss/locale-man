const { prompt } = require('inquirer')
const chalk = require('chalk')

const { askForTranslations } = require('./AddTranslation')

/**
 * Track all the texts that were added in a sequence
 * @type {Array}
 */
const addedTexts = []

/**
 * Ask for a new key and all translations, then ask to continue or not
 * This function is invoked recursivley
 * @param  {Object}  options
 * @return {Promise}
 */
const askForKeyAndTranslations = async options => {
  const { key } = await prompt({
    type: 'input',
    name: 'key',
    message: 'Enter the new translation key:'
  })
  await askForTranslations(key, options)
  const answer = await prompt({
    type: 'list',
    name: 'next',
    choices: [
      {
        name: 'Add another',
        value: 'continue'
      },
      {
        name: 'Finish',
        value: 'finish'
      }
    ],
    message: 'What do you want to do?'
  })

  addedTexts.push(key)

  if (answer.next === 'continue') {
    return askForKeyAndTranslations(options)
  }
}

/**
 * Handle bulk-add command
 * @param  {Object} options CLI options
 */
const handle = async options => {
  await askForKeyAndTranslations(options)

  if (!options.silent) {
    console.log(chalk.green('Translation files were updated. The following texts were added:'))
    for (let key in addedTexts) {
      console.log(chalk.black(chalk.bgCyan(`{{ $t('${addedTexts[key]}') }}`)))
    }
  }
}

module.exports = {
  handle,
  askForKeyAndTranslations
}
