const fs = require('fs')
const { formatTypeList, addons } = require('../config/rollup.build.config.js')
const libList = require('../config/rollup.lib.list.config')
const { build } = require('./rollup.createConfig')
const { resolve } = require('./utils')
let pkg = []

formatTypeList.forEach(({ format, min, suffix }) => {
  Object.keys(libList).forEach((moduleName) => {
    const { input, output } = libList[moduleName]
    pkg.push({ min, format, suffix, moduleName, input, output: `${format}/${output}` })
  })
})
pkg = pkg.concat(addons)
pkg.forEach(build)

fs.mkdirSync(resolve())
