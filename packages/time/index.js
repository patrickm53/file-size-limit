let SizeLimitError = require('size-limit/size-limit-error')

let getRunningTime = require('./get-running-time')

const SLOW_3G = 50 * 1024

async function sum (array, fn) {
  return (await Promise.all(array.map(fn))).reduce((all, i) => all + i, 0)
}

function getLoadingTime (size) {
  if (size === 0) return 0
  let time = size / SLOW_3G
  if (time < 0.01) time = 0.01
  return time
}

let self = {
  name: '@size-limit/time',
  async step70 (modules, config, check) {
    if (typeof check.size === 'undefined') {
      throw new SizeLimitError('missedModule', 'webpack', 'file')
    }
    check.loadTime = getLoadingTime(check.size)
    if (check.running !== false) {
      if (check.bundle) {
        check.runTime = await getRunningTime(check.bundle)
      } else {
        check.runTime = await sum(check.path, i => getRunningTime(i))
      }
    }
  }
}

module.exports = [self]
