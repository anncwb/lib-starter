const utils = require('./build/utils.js')
const aliasConfig = require('./config/alias')

const setAlias = (config) => {
  const { alias } = aliasConfig
  Object.keys(alias).forEach((key) => {
    config.resolve.alias.set(key, alias[key])
  })
}
module.exports = {
  lintOnSave: !utils.isProduct,
  runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
  productionSourceMap: false, // 不在production环境使用SourceMap
  pages: {
    index: {
      entry: 'examples/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  // 扩展 webpack 配置，使 packages 加入编译
  chainWebpack: (config) => {
    // 设置别名
    setAlias(config)
    // config.resolve.alias
    //   .set('@', utils.resolve('../src'))
    //   .set('@p', utils.resolve('../packages'))
    //   .set('@e', utils.resolve('../examples'))

    // 关闭利用空余带宽加载文件 提升首页速度
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
    // 配置别名
    config.extensions = aliasConfig.resolve
    config.module
      .rule('js')
      .include.add(/packages/)
      .end()
      .use('babel')
      .loader('babel-loader')
      .tap((options) => {
        return options
      })
  },
  devServer: {
    // 跨域
    port: 8099 // 端口号
  },
  pluginOptions: {
    lintStyleOnBuild: true,
    stylelint: {}
  }
}
