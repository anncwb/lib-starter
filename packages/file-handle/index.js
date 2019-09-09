import Test from './src/main.vue'

Test.install = (vue) => {
  vue.component(name, Test)
}

export default Test
