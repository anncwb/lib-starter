import TestModule from './src/main.vue'

TestModule.install = (vue) => {
  vue.component(name, TestModule)
}

export default TestModule
