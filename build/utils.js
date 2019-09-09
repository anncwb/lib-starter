const path = require('path')
const { outputPath } = require('../config/index')
const chalk = require('chalk')

module.exports = {
  getAssetsPath(_path = '.') {
    return path.posix.join(outputPath, _path)
  },
  resolve(_path) {
    return _path ? path.resolve(__dirname, _path) : path.resolve(__dirname, '..', outputPath)
  },
  isProduct: ['production', 'prod'].includes(process.env.NODE_ENV),
  env: process.env.NODE_ENV,
  chalkConsole: {
    success: () => {
      console.log(chalk.green(`=========================================`))
      console.log(chalk.green(`========打包成功(build success)!=========`))
      console.log(chalk.green(`=========================================`))
    },
    building: (index, total) => {
      console.log(chalk.blue(`正在打包第${index}/${total}个库`))
    }
  }
}
