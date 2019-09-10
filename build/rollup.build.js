const fs = require('fs')
const { formatTypeList, addons } = require('../config/rollup.build.config.js')
const libList = require('../config/lib.list.config')
const { build } = require('./rollup.createConfig')
const { resolve, getAssetsPath } = require('./utils')

fs.mkdirSync(resolve())
fs.mkdirSync(getAssetsPath('./es'))
let pkg = []
formatTypeList.forEach(({ format, min, suffix } = {}) => {
  Object.keys(libList).forEach((moduleName) => {
    const { input, output } = libList[moduleName]
    pkg.push({ min, format, suffix, moduleName, input, output: `${output}` })
  })
})
pkg = pkg.concat(addons)

pkg.forEach(build)
