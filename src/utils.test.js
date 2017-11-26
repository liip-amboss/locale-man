describe('Utils', () => {
  test('Path is resolved correctly', () => {
    // override process.cwd
    process.cwd = () => '/absolute/path'

    const { resolve } = require('./utils')
    expect(resolve('relative/path')).toBe('/absolute/path/relative/path')
  })
})
