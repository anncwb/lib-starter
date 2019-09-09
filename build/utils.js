const path = require('path')
const { outputPath } = require('../config/index')
module.exports = {
  getAssetsPath(_path) {
    return path.posix.join(outputPath, _path)
  },
  resolve(_path) {
    return _path ? path.resolve(__dirname, _path) : path.resolve(__dirname, '..', outputPath)
  },
  isProduct: ['production', 'prod'].includes(process.env.NODE_ENV),
  env: process.env.NODE_ENV
}
