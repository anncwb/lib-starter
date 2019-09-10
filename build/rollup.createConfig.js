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
const filesize = require('rollup-plugin-filesize')
const cssnano = require('cssnano')
const simplevars = require('postcss-simple-vars')
const nested = require('postcss-nested')
const cssnext = require('postcss-cssnext')
const { getAssetsPath, env, fsExistsSync } = require('./utils')
const { externalMap } = require('../config/rollup.build.config')
const aliasConfig = require('../config/alias')
const fs = require('fs')

function createPlugins({ min } = {}) {
  const exclude = 'node_modules/**'
  const plugins = [
    commonjs(),
    vue({
      css: false
    }),
    json(),
    filesize(),
    resolve({
      extensions: aliasConfig.resolve
    }),
    // babel({
    //   runtimeHelpers: true,
    //   // 只编译我们的源代码
    //   exclude
    // }),
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
      // sourceMap: true,
      extensions: ['.css', '.less'],
      extract: true // 输出路径
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
// let buildCount = 0
async function build(config, index, arr) {
  const { output, suffix, input, format, moduleName } = config

  const inputOptions = {
    input,
    external: Object.keys(externalMap),
    plugins: createPlugins(config)
  }
  const fullName = output + suffix
  const file = getAssetsPath(fullName)
  const outOptions = {
    // dir: getAssetsPath(),
    file,
    format,
    name: moduleName,
    // exports: 'named',
    globals: externalMap
    // entryFileNames: file
  }
  const bundle = await rollup.rollup(inputOptions)
  let { output: outputData } = await bundle.generate(outOptions)

  write({ output: outputData, fileName: output, format, fullName, file })
}

const isEs = (fmt) => fmt === 'es'
async function write({ output, file, fileName, format, fullName } = {}) {
  for (const { isAsset, code, source } of output) {
    if (isAsset) {
      const cssFileName = `${fileName}.css`
      const filePath = isEs(format)
        ? getAssetsPath(`/es/${cssFileName}`)
        : getAssetsPath(cssFileName)

      !fsExistsSync(filePath) && fs.writeFileSync(filePath, source.toString())
    } else {
      const filePath = isEs(format) ? getAssetsPath(`/es/${fullName}`) : file
      fs.writeFileSync(filePath, code)
    }
  }
}
module.exports = {
  build
}
