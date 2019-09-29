/* * Copyright © 2019-2019 chenwenbin * Released under the MIT License. */
'use strict';

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script = {
  name: 'ColorPicker',
  props: {
    // 当前颜色值
    value: {
      type: String,
      required: true
    },
    // 预设主题色
    predefineColors: {
      type: Array,
      default: function _default() {
        return ['#1AB394', '#ff4500', '#ff8c00', '#ffd700', '#90ee90', '#00ced1', '#1e90ff', '#c71585', 'rgba(255, 69, 0, 0.68)', 'rgb(255, 120, 0)', 'hsl(181, 100%, 37%)', 'hsla(209, 100%, 56%, 0.73)', '#c7158577'];
      }
    },
    // 默认颜色
    defaultColor: {
      type: String,
      default: '#000000'
    },
    // 禁用状态
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      // 面板打开状态
      openStatus: false,
      // 鼠标经过的颜色块
      hoveColor: null,
      // 主题颜色
      tColor: this.predefineColors,
      // 颜色面板
      colorConfig: [['#7f7f7f', '#f2f2f2'], ['#0d0d0d', '#808080'], ['#1c1a10', '#ddd8c3'], ['#0e243d', '#c6d9f0'], ['#233f5e', '#dae5f0'], ['#632623', '#f2dbdb'], ['#4d602c', '#eaf1de'], ['#3f3150', '#e6e0ec'], ['#1e5867', '#d9eef3'], ['#99490f', '#fee9da']],
      // 标准颜色
      bColor: ['#c21401', '#ff1e02', '#ffc12a', '#ffff3a', '#90cf5b', '#00af57', '#00afee', '#0071be', '#00215f', '#72349d'],
      html5Color: this.value
    };
  },
  computed: {
    // 显示面板颜色
    showPanelColor: function showPanelColor() {
      if (this.hoveColor) {
        return this.hoveColor;
      } else {
        return this.showColor;
      }
    },
    // 显示颜色
    showColor: function showColor() {
      if (this.value) {
        return this.value;
      } else {
        return this.defaultColor;
      }
    },
    // 颜色面板
    colorPanel: function colorPanel() {
      var colorArr = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.colorConfig[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var color = _step.value;
          colorArr.push(this.gradient(color[1], color[0], 5));
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return colorArr;
    }
  },
  mounted: function mounted() {
    var _this = this;

    // 点击页面上其他地方，关闭弹窗
    document.onclick = function () {
      _this.openStatus = false;
    };
  },
  methods: {
    triggerHtml5Color: function triggerHtml5Color() {
      this.$refs.html5Color.click();
    },
    // 更新组件的值 value
    updataValue: function updataValue(value) {
      this.$emit('input', value);
      this.$emit('change', value);
      this.openStatus = false;
    },
    // 设置默认颜色
    handleDefaultColor: function handleDefaultColor() {
      this.updataValue(this.defaultColor);
    },
    // 格式化 hex 颜色值
    parseColor: function parseColor(hexStr) {
      if (hexStr.length === 4) {
        hexStr = '#' + hexStr[1] + hexStr[1] + hexStr[2] + hexStr[2] + hexStr[3] + hexStr[3];
      } else {
        return hexStr;
      }
    },
    // RGB 颜色 转 HEX 颜色
    rgbToHex: function rgbToHex(r, g, b) {
      var hex = (r << 16 | g << 8 | b).toString(16);
      return '#' + new Array(Math.abs(hex.length - 7)).join('0') + hex;
    },
    // HEX 转 RGB 颜色
    hexToRgb: function hexToRgb(hex) {
      hex = this.parseColor(hex);
      var rgb = [];

      for (var i = 1; i < 7; i += 2) {
        rgb.push(parseInt('0x' + hex.slice(i, i + 2)));
      }

      return rgb;
    },
    // 计算渐变过渡颜色
    gradient: function gradient(startColor, endColor, step) {
      // 讲 hex 转换为 rgb
      var sColor = this.hexToRgb(startColor);
      var eColor = this.hexToRgb(endColor); // 计算R\G\B每一步的差值

      var rStep = (eColor[0] - sColor[0]) / step;
      var gStep = (eColor[1] - sColor[1]) / step;
      var bStep = (eColor[2] - sColor[2]) / step;
      var gradientColorArr = []; // 计算每一步的hex值

      for (var i = 0; i < step; i++) {
        gradientColorArr.push(this.rgbToHex(parseInt(rStep * i + sColor[0]), parseInt(gStep * i + sColor[1]), parseInt(bStep * i + sColor[2])));
      }

      return gradientColorArr;
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

/* script */ var __vue_script__ = script;
/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    {
      ref: "colorPicker",
      staticClass: "m-colorPicker",
      on: {
        click: function(event) {
          event.stopPropagation();
        }
      }
    },
    [
      _c("div", {
        staticClass: "colorBtn",
        class: { disabled: _vm.disabled },
        style: "background-color: " + _vm.showColor,
        on: {
          click: function($event) {
            _vm.openStatus = !_vm.disabled;
          }
        }
      }),
      _vm._v(" "),
      _c("input", {
        directives: [
          {
            name: "model",
            rawName: "v-model",
            value: _vm.html5Color,
            expression: "html5Color"
          }
        ],
        ref: "html5Color",
        attrs: { type: "color" },
        domProps: { value: _vm.html5Color },
        on: {
          change: function($event) {
            return _vm.updataValue(_vm.html5Color)
          },
          input: function($event) {
            if ($event.target.composing) {
              return
            }
            _vm.html5Color = $event.target.value;
          }
        }
      }),
      _vm._v(" "),
      _c("div", { staticClass: "box", class: { open: _vm.openStatus } }, [
        _c("div", { staticClass: "hd" }, [
          _c("div", {
            staticClass: "colorView",
            style: "background-color: " + _vm.showPanelColor
          }),
          _vm._v(" "),
          _c(
            "div",
            {
              staticClass: "defaultColor",
              on: {
                click: _vm.handleDefaultColor,
                mouseover: function($event) {
                  _vm.hoveColor = _vm.defaultColor;
                },
                mouseout: function($event) {
                  _vm.hoveColor = null;
                }
              }
            },
            [_vm._v("\n        默认颜色\n      ")]
          )
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "bd" }, [
          _c("h3", [_vm._v("主题颜色")]),
          _vm._v(" "),
          _c(
            "ul",
            { staticClass: "tColor" },
            _vm._l(_vm.tColor, function(color, index) {
              return _c("li", {
                key: index,
                style: { backgroundColor: color },
                on: {
                  mouseover: function($event) {
                    _vm.hoveColor = color;
                  },
                  mouseout: function($event) {
                    _vm.hoveColor = null;
                  },
                  click: function($event) {
                    return _vm.updataValue(color)
                  }
                }
              })
            }),
            0
          ),
          _vm._v(" "),
          _c(
            "ul",
            { staticClass: "bColor" },
            _vm._l(_vm.colorPanel, function(item, index) {
              return _c("li", { key: index }, [
                _c(
                  "ul",
                  _vm._l(item, function(color, cindex) {
                    return _c("li", {
                      key: cindex,
                      style: { backgroundColor: color },
                      on: {
                        mouseover: function($event) {
                          _vm.hoveColor = color;
                        },
                        mouseout: function($event) {
                          _vm.hoveColor = null;
                        },
                        click: function($event) {
                          return _vm.updataValue(color)
                        }
                      }
                    })
                  }),
                  0
                )
              ])
            }),
            0
          ),
          _vm._v(" "),
          _c("h3", [_vm._v("标准颜色")]),
          _vm._v(" "),
          _c(
            "ul",
            { staticClass: "tColor" },
            _vm._l(_vm.bColor, function(color, index) {
              return _c("li", {
                key: index,
                style: { backgroundColor: color },
                on: {
                  mouseover: function($event) {
                    _vm.hoveColor = color;
                  },
                  mouseout: function($event) {
                    _vm.hoveColor = null;
                  },
                  click: function($event) {
                    return _vm.updataValue(color)
                  }
                }
              })
            }),
            0
          ),
          _vm._v(" "),
          _c("h3", { on: { click: _vm.triggerHtml5Color } }, [
            _vm._v("更多颜色...")
          ])
        ])
      ])
    ]
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  var __vue_inject_styles__ = undefined;
  /* scoped */
  var __vue_scope_id__ = "data-v-55f13fe5";
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var ColorPick = normalizeComponent_1(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    undefined
  );

// 导入组件，组件必须声明 name

ColorPick.install = function (Vue) {
  Vue.component(ColorPick.name, ColorPick);
}; // 默认导出组件

module.exports = ColorPick;
