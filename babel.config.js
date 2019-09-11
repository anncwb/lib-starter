var { clearConsole } = require('./config/index')

var plugins = []
clearConsole && plugins.push('transform-remove-console')
module.exports = {
  presets: ['@babel/preset-env'],

  plugins: plugins
}
