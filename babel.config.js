var { clearConsole } = require('./config/index')

var plugins = [
  [
    'component',
    {
      libraryName: 'element-ui',
      styleLibraryName: 'theme-chalk'
    }
  ],
  '@babel/plugin-syntax-dynamic-import'
]
clearConsole && plugins.push('transform-remove-console')
module.exports = {
  presets: [
    '@vue/app',
    [
      '@vue/babel-preset-jsx',
      {
        injectH: false
      }
    ]
  ],

  plugins: plugins
}
