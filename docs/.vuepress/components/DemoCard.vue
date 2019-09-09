<template>
  <div class="demo-card">
    <div class="source">
      <slot />
    </div>
    <div
      v-show="showCode"
      class="code"
    >
      <div
        v-if="$slots.codeDesc"
        class="code-desc"
      >
        <slot name="codeDesc" />
      </div>
      <div class="code-src">
        <slot name="code" />
      </div>
    </div>
    <div
      class="action"
      @click="showCode=!showCode"
    >
      <span>{{ `${showCode?'隐藏':'显示'}代码` }}</span>
      <span
        v-if="$attrs.onlineRunLink"
        class="open"
        @click="open"
      >
        在线运行
      </span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showCode: false
    };
  },
  methods: {
    open() {
      window.open(this.$attrs.onlineRunLink)
    }
  }
};
</script>
<style lang="less" scoped>
.demo-card {
  margin-bottom: 24px;
  border: 1px solid #ebebeb;
  border-radius: 3px;
  transition: 0.2s;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6), 0 2px 4px 0 rgba(232, 237, 250, 0.5);
  }
  .source {
    padding: 24px;
  }
  .code {
    padding: 10px;
    background-color: #fafafa;
    transition: 0.2s;
    &-desc {
      font-size: 13px;
      margin-bottom: 20px;
      padding: 10px;
      background-color: #fff;
    }
  }
  .action {
    border-top: 1px solid #eaeefb;
    height: 48px;
    line-height: 48px;
    box-sizing: border-box;
    background-color: #fff;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    text-align: center;
    margin-top: -1px;
    color: #409eff;
    cursor: pointer;
    .open {
      float: right;
      margin-right: 30px;
    }
  }
}
</style>
