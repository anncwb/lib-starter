import FileHandle from '../packages/file-handle/index'
import './index.css'
import vue from 'element-ui'
const components = [FileHandle]
const install = function(Vue) {
  components.forEach((component) => {
    Vue.component(component.name, component)
  })
}
console.log('======================')
console.log(vue)
console.log('======================')
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default { install, FileHandle }
