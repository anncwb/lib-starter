import FileHandle from './src/main.vue'

FileHandle.install = (vue) => {
  vue.component(name, FileHandle)
}

export default FileHandle
