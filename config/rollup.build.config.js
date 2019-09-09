module.exports = {
  externalMap: {
    'ant-design-vue': 'Antd',
    vue: 'Vue'
  },
  formatTypeList: [
    { format: 'cjs', min: false, suffix: '.common.js' },
    // { format: 'cjs', min: true, suffix: '.min.js' },
    { format: 'umd', min: false, suffix: '.umd.js' },
    { format: 'umd', min: true, suffix: '.umd.min.js' }
    // { format: 'es', min: false, suffix: '.js' },
    // { format: 'es', min: true, suffix: '.min.js' }
  ],
  addons: [
    // {
    //   min: false,
    //   format: 'es',
    //   suffix: '.js',
    //   input: 'src/index.js',
    //   output: 'index'
    // }
  ]
}
