/* * Copyright © 2019-2019 chenwenbin * Released under the MIT License. */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue')) :
  typeof define === 'function' && define.amd ? define(['vue'], factory) :
  (global = global || self, global['split-pane'] = factory(global.vue));
}(this, function (Vue) { 'use strict';

  Vue = Vue && Vue.hasOwnProperty('default') ? Vue['default'] : Vue;

  var isServer = Vue.prototype.$isServer;
  var on = function () {
    if (!isServer && document.addEventListener) {
      return function (element, event, handler) {
        if (element && event && handler) {
          element.addEventListener(event, handler, false);
        }
      };
    } else {
      return function (element, event, handler) {
        if (element && event && handler) {
          element.attachEvent('on' + event, handler);
        }
      };
    }
  }();
  /* istanbul ignore next */

  var off = function () {
    if (!isServer && document.removeEventListener) {
      return function (element, event, handler) {
        if (element && event) {
          element.removeEventListener(event, handler, false);
        }
      };
    } else {
      return function (element, event, handler) {
        if (element && event) {
          element.detachEvent('on' + event, handler);
        }
      };
    }
  }();

  //
  //
  //
  //
  //
  //
  //
  //
  var script = {
    name: 'Trigger',
    props: {
      mode: {
        type: String,
        default: ''
      }
    },
    data: function data() {
      return {
        prefix: 'split-trigger',
        initOffset: 0
      };
    },
    computed: {
      isVertical: function isVertical() {
        return this.mode === 'vertical';
      },
      classes: function classes() {
        return [this.prefix, this.isVertical ? "".concat(this.prefix, "-vertical") : "".concat(this.prefix, "-horizontal")];
      },
      barConClasses: function barConClasses() {
        return ["".concat(this.prefix, "-bar-con"), this.isVertical ? 'vertical' : 'horizontal'];
      }
    }
  };

  function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
  /* server only */
  , shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
      createInjectorSSR = createInjector;
      createInjector = shadowMode;
      shadowMode = false;
    } // Vue.extend constructor export interop.


    var options = typeof script === 'function' ? script.options : script; // render functions

    if (template && template.render) {
      options.render = template.render;
      options.staticRenderFns = template.staticRenderFns;
      options._compiled = true; // functional template

      if (isFunctionalTemplate) {
        options.functional = true;
      }
    } // scopedId


    if (scopeId) {
      options._scopeId = scopeId;
    }

    var hook;

    if (moduleIdentifier) {
      // server build
      hook = function hook(context) {
        // 2.3 injection
        context = context || // cached call
        this.$vnode && this.$vnode.ssrContext || // stateful
        this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
        // 2.2 with runInNewContext: true

        if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
          context = __VUE_SSR_CONTEXT__;
        } // inject component styles


        if (style) {
          style.call(this, createInjectorSSR(context));
        } // register component module identifier for async chunk inference


        if (context && context._registeredComponents) {
          context._registeredComponents.add(moduleIdentifier);
        }
      }; // used by ssr in case component is cached and beforeCreate
      // never gets called


      options._ssrRegister = hook;
    } else if (style) {
      hook = shadowMode ? function () {
        style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
      } : function (context) {
        style.call(this, createInjector(context));
      };
    }

    if (hook) {
      if (options.functional) {
        // register for functional component in vue file
        var originalRender = options.render;

        options.render = function renderWithStyleInjection(h, context) {
          hook.call(context);
          return originalRender(h, context);
        };
      } else {
        // inject component registration as beforeCreate hook
        var existing = options.beforeCreate;
        options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
      }
    }

    return script;
  }

  var normalizeComponent_1 = normalizeComponent;

  /* script */
  var __vue_script__ = script;
  /* template */
  var __vue_render__ = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { class: _vm.classes }, [
      _c("div", { class: _vm.barConClasses }, _vm._m(0), 0)
    ])
  };
  var __vue_staticRenderFns__ = [
    function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _vm._l(8, function(i) {
        return _c("i", { key: "trigger-" + i, class: _vm.prefix + "-bar" })
      })
    }
  ];
  __vue_render__._withStripped = true;

    /* style */
    var __vue_inject_styles__ = undefined;
    /* scoped */
    var __vue_scope_id__ = undefined;
    /* module identifier */
    var __vue_module_identifier__ = undefined;
    /* functional template */
    var __vue_is_functional_template__ = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var Trigger = normalizeComponent_1(
      { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
      __vue_inject_styles__,
      __vue_script__,
      __vue_scope_id__,
      __vue_is_functional_template__,
      __vue_module_identifier__,
      undefined,
      undefined
    );

  //
  var script$1 = {
    name: 'SplitPane',
    components: {
      Trigger: Trigger
    },
    props: {
      value: {
        type: [Number, String],
        default: 0.5
      },
      mode: {
        type: String,
        validator: function validator(value) {
          return ['horizontal', 'vertical'].includes(value);
        },
        default: 'horizontal'
      },
      min: {
        type: [Number, String],
        default: '40px'
      },
      max: {
        type: [Number, String],
        default: '40px'
      }
    },

    /**
     * Events
     * @on-move-start
     * @on-moving 返回值：事件对象，但是在事件对象中加入了两个参数：atMin(当前是否在最小值处), atMax(当前是否在最大值处)
     * @on-move-end
     */
    data: function data() {
      return {
        prefix: 'split',
        offset: 0,
        oldOffset: 0,
        isMoving: false
      };
    },
    computed: {
      wrapperClasses: function wrapperClasses() {
        return ["".concat(this.prefix, "-wrapper"), this.isMoving ? 'no-select' : ''];
      },
      isHorizontal: function isHorizontal() {
        return this.mode === 'horizontal';
      },
      anotherOffset: function anotherOffset() {
        return 100 - this.offset;
      },
      valueIsPx: function valueIsPx() {
        return typeof this.value === 'string';
      },
      offsetSize: function offsetSize() {
        return this.isHorizontal ? 'offsetWidth' : 'offsetHeight';
      },
      computedMin: function computedMin() {
        return this.getComputedThresholdValue('min');
      },
      computedMax: function computedMax() {
        return this.getComputedThresholdValue('max');
      }
    },
    watch: {
      value: function value() {
        this.setOffset();
      }
    },
    mounted: function mounted() {
      var _this = this;

      this.$nextTick(function () {
        _this.setOffset();
      });
    },
    methods: {
      px2percent: function px2percent(numerator, denominator) {
        return parseFloat(numerator) / parseFloat(denominator);
      },
      getComputedThresholdValue: function getComputedThresholdValue(type) {
        var size = this.$refs.outerWrapper[this.offsetSize];

        if (this.valueIsPx) {
          return typeof this[type] === 'string' ? this[type] : size * this[type];
        } else {
          return typeof this[type] === 'string' ? this.px2percent(this[type], size) : this[type];
        }
      },
      getMin: function getMin(value1, value2) {
        if (this.valueIsPx) {
          return "".concat(Math.min(parseFloat(value1), parseFloat(value2)), "px");
        } else {
          return Math.min(value1, value2);
        }
      },
      getMax: function getMax(value1, value2) {
        if (this.valueIsPx) {
          return "".concat(Math.max(parseFloat(value1), parseFloat(value2)), "px");
        } else {
          return Math.max(value1, value2);
        }
      },
      getAnotherOffset: function getAnotherOffset(value) {
        var res = 0;

        if (this.valueIsPx) {
          res = "".concat(this.$refs.outerWrapper[this.offsetSize] - parseFloat(value), "px");
        } else {
          res = 1 - value;
        }

        return res;
      },
      handleMove: function handleMove(e) {
        var pageOffset = this.isHorizontal ? e.pageX : e.pageY;
        var offset = pageOffset - this.initOffset;
        var outerWidth = this.$refs.outerWrapper[this.offsetSize];
        var value = this.valueIsPx ? "".concat(parseFloat(this.oldOffset) + offset, "px") : this.px2percent(outerWidth * this.oldOffset + offset, outerWidth);
        var anotherValue = this.getAnotherOffset(value);

        if (parseFloat(value) <= parseFloat(this.computedMin)) {
          value = this.getMax(value, this.computedMin);
        }

        if (parseFloat(anotherValue) <= parseFloat(this.computedMax)) {
          value = this.getAnotherOffset(this.getMax(anotherValue, this.computedMax));
        }

        e.atMin = this.value === this.computedMin;
        e.atMax = this.valueIsPx ? this.getAnotherOffset(this.value) === this.computedMax : this.getAnotherOffset(this.value).toFixed(5) === this.computedMax.toFixed(5);
        this.$emit('input', value);
        this.$emit('on-moving', e);
      },
      handleUp: function handleUp() {
        this.isMoving = false;
        off(document, 'mousemove', this.handleMove);
        off(document, 'mouseup', this.handleUp);
        this.$emit('on-move-end');
      },
      handleMousedown: function handleMousedown(e) {
        this.initOffset = this.isHorizontal ? e.pageX : e.pageY;
        this.oldOffset = this.value;
        this.isMoving = true;
        on(document, 'mousemove', this.handleMove);
        on(document, 'mouseup', this.handleUp);
        this.$emit('on-move-start');
      },
      setOffset: function setOffset() {
        this.offset = (this.valueIsPx ? this.px2percent(this.value, this.$refs.outerWrapper[this.offsetSize]) : this.value) * 10000 / 100;
      }
    }
  };

  /* script */
  var __vue_script__$1 = script$1;
  /* template */
  var __vue_render__$1 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { ref: "outerWrapper", class: _vm.wrapperClasses }, [
      _vm.isHorizontal
        ? _c("div", { class: _vm.prefix + "-horizontal" }, [
            _c(
              "div",
              {
                class: [_vm.prefix + "-pane", "left-pane"],
                style: { right: _vm.anotherOffset + "%" }
              },
              [_vm._t("left")],
              2
            ),
            _vm._v(" "),
            _c(
              "div",
              {
                class: _vm.prefix + "-trigger-con",
                style: { left: _vm.offset + "%" },
                on: { mousedown: _vm.handleMousedown }
              },
              [
                _vm._t("trigger", [
                  _c("trigger", { attrs: { mode: "vertical" } })
                ])
              ],
              2
            ),
            _vm._v(" "),
            _c(
              "div",
              {
                class: [_vm.prefix + "-pane", "right-pane"],
                style: { left: _vm.offset + "%" }
              },
              [_vm._t("right")],
              2
            )
          ])
        : _c("div", { class: _vm.prefix + "-vertical" }, [
            _c(
              "div",
              {
                class: [_vm.prefix + "-pane", "top-pane"],
                style: { bottom: _vm.anotherOffset + "%" }
              },
              [_vm._t("top")],
              2
            ),
            _vm._v(" "),
            _c(
              "div",
              {
                class: _vm.prefix + "-trigger-con",
                style: { top: _vm.offset + "%" },
                on: { mousedown: _vm.handleMousedown }
              },
              [
                _vm._t("trigger", [
                  _c("trigger", { attrs: { mode: "horizontal" } })
                ])
              ],
              2
            ),
            _vm._v(" "),
            _c(
              "div",
              {
                class: [_vm.prefix + "-pane", "bottom-pane"],
                style: { top: _vm.offset + "%" }
              },
              [_vm._t("bottom")],
              2
            )
          ])
    ])
  };
  var __vue_staticRenderFns__$1 = [];
  __vue_render__$1._withStripped = true;

    /* style */
    var __vue_inject_styles__$1 = undefined;
    /* scoped */
    var __vue_scope_id__$1 = undefined;
    /* module identifier */
    var __vue_module_identifier__$1 = undefined;
    /* functional template */
    var __vue_is_functional_template__$1 = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var Split = normalizeComponent_1(
      { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
      __vue_inject_styles__$1,
      __vue_script__$1,
      __vue_scope_id__$1,
      __vue_is_functional_template__$1,
      __vue_module_identifier__$1,
      undefined,
      undefined
    );

  // 导入组件，组件必须声明 name

  Split.install = function (Vue) {
    Vue.component(Split.name, Split);
  }; // 默认导出组件

  return Split;

}));
