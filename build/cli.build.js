const { run } = require('runjs')
const libList = require('../config/lib.list.config')
const { addons } = require('../config/rollup.build.config.js')
const { getAssetsPath, chalkConsole } = require('./utils')
const { styleDir } = require('../config/index')
const move = require('../script/move')
const rimraf = require('rimraf')
const fs = require('fs')
const cssFiles = []

function build({ input, output } = {}, index, arr) {
  chalkConsole.building(index, arr.length)
  run(
    `vue-cli-service build --target lib --no-clean --name ${output} --dest ${getAssetsPath()} ${input}`
  )
  cssFiles.push(`${output}.css`)
}

let pkg = []

Object.keys(libList).forEach((moduleName) => {
  const { input, output } = libList[moduleName]
  pkg.push({ input, output })
})
pkg = pkg.concat(addons)
pkg.forEach(build)
// 删除多余文件
rimraf(getAssetsPath('./demo.html'), function() {})

fs.mkdirSync(getAssetsPath(styleDir))
// 拷贝css文件到单独目录
cssFiles.forEach((cssFile) => {
  move(getAssetsPath(cssFile), getAssetsPath(styleDir + '/' + cssFile))
})

chalkConsole.success()
