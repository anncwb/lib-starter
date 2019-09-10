<template>
  <div class="hello">
    <Button type="primary">
      按钮
    </Button>
    <Button type="danger">
      按钮1
    </Button>
    {{ message }}
  </div>
</template>

<script>
import { Button } from 'element-ui'
import 'element-ui/lib/theme-chalk/button.css'
export default {
  name: 'HelloWorld',
  components: { Button },
  props: {
    message: {
      type: String,
      default: ''
    }
  }
}
</script>
