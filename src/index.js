import FileHandle from '../packages/file-handle/index'

const components = [FileHandle]
const install = function(Vue) {
  components.forEach((component) => {
    Vue.component(component.name, component)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default { install, FileHandle }
