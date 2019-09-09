const rollup = require('rollup')
const resolve = require('rollup-plugin-node-resolve')
const babel = require('rollup-plugin-babel')
const vue = require('rollup-plugin-vue')
const commonjs = require('rollup-plugin-commonjs')
const { terser } = require('rollup-plugin-terser')
const replace = require('rollup-plugin-replace')
const json = require('rollup-plugin-json')
const postcss = require('rollup-plugin-postcss')
const alias = require('rollup-plugin-alias')
const cssnano = require('cssnano')
const simplevars = require('postcss-simple-vars')
const nested = require('postcss-nested')
const cssnext = require('postcss-cssnext')
const { getAssetsPath, env, chalkConsole } = require('./utils')
const { externalMap } = require('../config/rollup.build.config')
const aliasConfig = require('../config/alias')
const chalk = require('chalk')
function createPlugins({ min, moduleName } = {}) {
  const exclude = 'node_modules/**'
  const plugins = [
    commonjs(),
    vue({
      css: false,
      compileTemplate: true,
      htmlMinifier: {
        customAttrSurround: [[/@/, new RegExp('')], [/:/, new RegExp('')]],
        collapseWhitespace: true,
        removeComments: true
      }
    }),
    resolve({
      extensions: aliasConfig.resolve
    }),
    babel({
      runtimeHelpers: true,
      // 只编译我们的源代码
      exclude
    }),
    json(),
    postcss({
      plugins: [simplevars(), nested(), cssnext({ warnForDuplicates: false }), cssnano()],
      use: [
        [
          'less',
          {
            javascriptEnabled: true
          }
        ]
      ],
      inject: false,
      extensions: ['.css', '.less'],
      extract: getAssetsPath(`/styles/${moduleName || ''}/index.css`) // 输出路径
    }),
    replace({
      exclude,
      'process.env.NODE_ENV': JSON.stringify(env)
    }),
    alias({
      ...aliasConfig.alias,
      resolve: aliasConfig.resolve
    })
  ]
  if (min) {
    plugins.push(terser())
  }
  return plugins
}

/**
 * 打包
 * @param {*} config
 */
let buildCount = 0
async function build(config, index, arr) {
  const { min, output, suffix, input, format, moduleName } = config

  const inputOptions = {
    input,
    external: Object.keys(externalMap),
    plugins: createPlugins({ min, moduleName })
  }

  const file = getAssetsPath(output + suffix)
  const outOptions = {
    file,
    format,
    name: moduleName,
    globals: externalMap
  }
  const bundle = await rollup.rollup(inputOptions)
  bundle.write(outOptions).then(() => {
    chalkConsole.building(buildCount, arr.length)
    ++buildCount == arr.length && chalkConsole.success()
  })
}
module.exports = {
  build
}
