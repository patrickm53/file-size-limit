let { join } = require('path')

let getSize = require('../')

function fixture (name) {
  return join(__dirname, 'fixtures', `${ name }.js`)
}

jest.setTimeout(10000)

it('calculates running time', async () => {
  let size = await getSize(fixture('bad/index'))
  expect(size.running > 0.2).toBeTruthy()
  expect(size.running < 0.4).toBeTruthy()
})
