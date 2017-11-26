describe('AddTranslation', () => {
  // mock inquirer
  const inquirer = require('inquirer')
  const mockPrompt = jest.fn()
  const answers = { de: 'Eins', en: 'One' }
  mockPrompt.mockImplementation(() => {
    return Promise.resolve(answers)
  })
  inquirer.prompt = mockPrompt

  // mock write-translations utility
  const utils = require('../../utils')
  utils.writeTranslationsToDisk = jest.fn()

  test('Locales are prompted for', () => {
    const askForTranslations = require('../AddTranslation')
    askForTranslations('test', {
      locales: 'de,en',
      outputDir: './out'
    })

    const exptectedPrompt = [
      {'message': 'Enter translation for de:', 'name': 'de', 'type': 'input'},
      {'message': 'Enter translation for en:', 'name': 'en', 'type': 'input'}
    ]
    expect(mockPrompt).toHaveBeenCalledWith(exptectedPrompt)
  })

  test('Translations are assembled correctly', () => {
    const askForTranslations = require('../AddTranslation')
    askForTranslations('test', {
      locales: 'de,en',
      outputDir: './out'
    })

    // for each locale..
    expect(utils.writeTranslationsToDisk).toHaveBeenCalledTimes(2)
    expect(utils.writeTranslationsToDisk).toHaveBeenLastCalledWith({
      locale: 'en',
      key: 'test',
      translation: 'One',
      dir: utils.pathResolve('./out')
    })
  })
})
