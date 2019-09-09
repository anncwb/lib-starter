const utils = require('../build/utils.js')
const devConfig = require('./dev')
const prodConfig = require('./prod')

const config = utils.isProduct ? prodConfig : devConfig
module.exports = {
  outputPath: 'lib',
  clearConsole: config.clearConsole
}
