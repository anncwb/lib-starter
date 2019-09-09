const { run } = require('runjs')
const libList = require('../config/lib.list.config')
const { addons } = require('../config/rollup.build.config.js')
const { getAssetsPath, chalkConsole } = require('./utils')
const rimraf = require('rimraf')

function build({ input, output } = {}, index, arr) {
  chalkConsole.building(index, arr.length)
  run(
    `vue-cli-service build --target lib --no-clean --name ${output} --dest ${getAssetsPath()} ${input}`
  )
}

let pkg = []

Object.keys(libList).forEach((moduleName) => {
  const { input, output } = libList[moduleName]
  pkg.push({ input, output })
})
pkg = pkg.concat(addons)
pkg.forEach(build)
rimraf(getAssetsPath('./demo.html'), function() {})

chalkConsole.success()
