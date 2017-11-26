describe('Utils', () => {
  test('Path is resolved correctly', () => {
    // mock process.cwd
    jest.mock('process', () => ({
      cwd: () => '/absolute/path'
    }))

    const { resolve } = require('./utils')
    expect(resolve('relative/path')).toBe('/absolute/path/relative/path')
  })
})
