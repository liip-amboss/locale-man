describe('Utils', () => {
  test('Path is resolved correctly', () => {
    // override process.cwd
    process.cwd = () => '/absolute/path'

    const { pathResolve } = require('./utils')
    expect(pathResolve('relative/path')).toBe('/absolute/path/relative/path')
  })

  test('Translations are written correctly', () => {
    const { writeTranslationsToDisk } = require('./utils')
    // mock jsonfile
    const jsonFile = require('jsonfile')
    jsonFile.readFile = jest.fn()
    jsonFile.readFile.mockImplementation((t, fn) => fn())
    jsonFile.writeFile = jest.fn()

    const result = writeTranslationsToDisk({
      locale: 'de',
      key: 'hello.world',
      translation: 'Hallo Welt',
      dir: './out'
    })

    expect(jsonFile.readFile).toHaveBeenCalledWith('./out/de.json', expect.any(Function))
    expect(jsonFile.writeFile).toHaveBeenCalled()
    expect(result).toBeInstanceOf(Promise)
  })
})
