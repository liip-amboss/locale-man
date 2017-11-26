describe('AddTranslation', () => {
  test('Locales are prompted for', () => {
    // mock inquirer
    const inquirer = require('inquirer')
    const mockPrompt = jest.fn()
    const answers = [{ de: 'Eins', en: 'One' }]
    mockPrompt.mockImplementation(() => {
      return Promise.resolve(answers)
    })
    inquirer.prompt = mockPrompt

    const handle = require('../AddTranslation')
    handle('test', {
      locales: 'de,en',
      outputDir: './out'
    })

    const exptectedPrompt = [
      {'message': 'Enter translation for de:', 'name': 'de', 'type': 'input'},
      {'message': 'Enter translation for en:', 'name': 'en', 'type': 'input'}
    ]
    expect(mockPrompt).toHaveBeenCalledWith(exptectedPrompt)
  })
})
