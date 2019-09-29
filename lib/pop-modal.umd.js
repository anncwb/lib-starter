/* * Copyright © 2019-2019 chenwenbin * Released under the MIT License. */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue')) :
  typeof define === 'function' && define.amd ? define(['vue'], factory) :
  (global = global || self, global['pop-modal'] = factory(global.vue));
}(this, function (Vue) { 'use strict';

  Vue = Vue && Vue.hasOwnProperty('default') ? Vue['default'] : Vue;

  /**
   *
   * @param {Number} from  Lower limit
   * @param {Number} to    Upper limit
   * @param {Number} value Checked number value
   *
   * @return {Number} Either source value itself or limit value if range limits
   *   are exceeded
   */
  var inRange = function inRange(from, to, value) {
    return value < from ? from : value > to ? to : value;
  };

  //
  var script = {
    props: {
      minHeight: {
        type: Number,
        default: 0
      },
      minWidth: {
        type: Number,
        default: 0
      }
    },
    data: function data() {
      return {
        clicked: false,
        size: {}
      };
    },
    computed: {
      className: function className() {
        return {
          'vue-modal-resizer': true,
          clicked: this.clicked
        };
      }
    },
    mounted: function mounted() {
      this.$el.addEventListener('mousedown', this.start, false);
    },
    methods: {
      start: function start(event) {
        this.clicked = true;
        window.addEventListener('mousemove', this.mousemove, false);
        window.addEventListener('mouseup', this.stop, false);
        event.stopPropagation();
        event.preventDefault();
      },
      stop: function stop() {
        this.clicked = false;
        window.removeEventListener('mousemove', this.mousemove, false);
        window.removeEventListener('mouseup', this.stop, false);
        this.$emit('resize-stop', {
          element: this.$el.parentElement,
          size: this.size
        });
      },
      mousemove: function mousemove(event) {
        this.resize(event);
      },
      resize: function resize(event) {
        var el = this.$el.parentElement; // el.getBoundingClientRect().left

        if (el) {
          var width = event.clientX - el.getBoundingClientRect().left;
          var height = event.clientY - el.getBoundingClientRect().top;
          width = inRange(this.minWidth, window.innerWidth, width);
          height = inRange(this.minHeight, window.innerHeight, height);
          this.size = {
            width: width,
            height: height
          };
          el.style.width = width + 'px';
          el.style.height = height + 'px';
          this.$emit('resize', {
            element: el,
            size: this.size
          });
        }
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
    return _c("div", { class: _vm.className })
  };
  var __vue_staticRenderFns__ = [];
  __vue_render__._withStripped = true;

    /* style */
    var __vue_inject_styles__ = undefined;
    /* scoped */
    var __vue_scope_id__ = "data-v-6a3395f9";
    /* module identifier */
    var __vue_module_identifier__ = undefined;
    /* functional template */
    var __vue_is_functional_template__ = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var resizer = normalizeComponent_1(
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
    name: 'PopModal',
    components: {
      resizer: resizer
    },
    props: {
      title: {
        type: String,
        default: 'this is title'
      },
      width: {
        type: String,
        default: '450'
      },
      height: {
        type: String,
        default: '300'
      },
      className: {
        type: String,
        default: ''
      },
      wrapClassName: {
        type: String,
        default: 'star-pop-modal'
      },
      index: {
        type: Number,
        default: 1
      }
    },
    data: function data() {
      return {
        // 2:正常窗口；1：缩小窗口；3：放大窗口
        modalStatus: 2,
        modalStyle: {
          position: 'absolute',
          float: 'none',
          left: this.index * 20 + 'px',
          top: this.index * 20 + 'px',
          width: this.width + 'px',
          height: this.height + 'px'
        },
        originStyle: {},
        visible: true
      };
    },
    mounted: function mounted() {
      this.drag();
      this.$nextTick(function () {
        this.setCurrentZindex(); // Code that will run only after the
        // entire view has been rendered
      });
    },
    methods: {
      close: function close() {
        this.$emit('close');
      },

      /**
       * @description: 拖动头部时，设置当前modal显示在前台
       * @Date: 2019-07-11 10:45:38
       */
      setCurrentZindex: function setCurrentZindex() {
        var modalList = this.$el.parentNode.querySelectorAll('.modal');

        for (var i = 0; i < modalList.length; i++) {
          modalList[i].style['z-index'] = 1;
        } // modalList.forEach((element) => {
        //   element.style['z-index'] = 1;
        // });


        this.$el.querySelector('.modal').style['z-index'] = 2;
      },

      /**
       * @description: 存储最大化，最小化前的初始值
       * @Date: 2019-07-09 17:41:11
       */
      saveOriginSize: function saveOriginSize() {
        var el = this.$el.querySelector('.modal');
        this.originStyle = {
          left: el.offsetLeft + 'px',
          top: el.offsetTop + 'px',
          width: el.offsetWidth + 'px',
          height: el.offsetHeight + 'px'
        };
      },

      /**
       * @description: 最小化窗口
       * @Date: 2019-07-11 10:46:41
       */
      min: function min() {
        // debugger
        if (this.modalStatus === 2) {
          this.saveOriginSize();
        }

        this.modalStatus = 1;
        this.modalStyle = {
          // top: (this.index - 1) * 40 + 'px',
          // right: 0,
          position: 'static',
          float: 'left',
          width: '150px' // height: '40px'

        };
        var dialogHeaderEl = this.$el.querySelector('.modal-header');
        dialogHeaderEl.style.cursor = 'inherit';
        dialogHeaderEl.style.position = 'static';
      },

      /**
       * @description: 最大化与还原窗口
       * @Date: 2019-07-11 10:46:49
       */
      max: function max() {
        var el = this.$el.querySelector('.modal');
        var dialogHeaderEl = this.$el.querySelector('.modal-header');
        dialogHeaderEl.style.cursor = 'move';
        dialogHeaderEl.style.position = 'absolute';

        if (this.modalStatus !== 2) {
          this.modalStyle = this.originStyle;
          this.modalStatus = 2;
          return;
        }

        if (this.modalStatus === 2) {
          this.saveOriginSize();
        }

        this.modalStatus = 3;
        var width, height;
        var wrapDOM = document.querySelector('.' + this.wrapClassName);

        if (wrapDOM) {
          var padding = this.getStyle(wrapDOM, 'padding').replace(/px/g, '') * 2; // debugger;
          // 兼容IE 11

          if (!padding) {
            padding = this.getStyle(wrapDOM, 'padding-left').replace(/px/g, '') * 2;
          }

          width = wrapDOM.clientWidth - padding;
          height = wrapDOM.clientHeight - padding;
        } else {
          width = window.innerWidth || document.documentElement.clientWidth;
          height = window.innerHeight || document.documentElement.clientHeight;
        }

        this.modalStyle = {
          position: 'absolute',
          float: 'none',
          left: 0,
          top: 0,
          width: width + 'px',
          height: height + 'px'
        };
      },
      getStyle: function getStyle(dom, attr) {
        if (window.document.currentStyle) {
          return dom.currentStyle[attr];
        } else {
          return getComputedStyle(dom, false)[attr];
        }
      },

      /**
       * @description: 拖动modal
       * @Date: 2019-07-10 10:25:52
       */
      drag: function drag() {
        var _this = this;

        var dialogHeaderEl = this.$el.querySelector('.modal-header');
        var dragDom = this.$el.querySelector('.modal');
        if (!dialogHeaderEl || !dragDom) return;
        dialogHeaderEl.style.cursor = 'move';
        var sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null);

        dialogHeaderEl.onmousedown = function (e) {
          _this.setCurrentZindex(); // 鼠标按下，计算当前元素距离可视区的距离


          var disX = e.clientX;
          var disY = e.clientY;
          var screenWidth = document.body.clientWidth; // body当前宽度

          var screenHeight = document.documentElement.clientHeight; // 可见区域高度(应为body高度，可某些环境下无法获取)

          var dragDomWidth = dragDom.offsetWidth; // 对话框宽度

          var dragDomheight = dragDom.offsetHeight; // 对话框高度

          var minDragDomLeft = dragDom.offsetLeft;
          var maxDragDomLeft = screenWidth - dragDom.offsetLeft - dragDomWidth;
          var minDragDomTop = dragDom.offsetTop;
          var maxDragDomTop = screenHeight - dragDom.offsetTop - dragDomheight; // 获取到的值带px 正则匹配替换

          var domLeft = _this.getStyle(dragDom, 'left');

          var domTop = _this.getStyle(dragDom, 'top');

          var styL = domLeft;
          var styT = domTop; // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px

          if (domLeft.includes('%')) {
            styL = +document.body.clientWidth * (+domLeft.replace(/%/g, '') / 100);
            styT = +document.body.clientHeight * (+domTop.replace(/%/g, '') / 100);
          } else {
            styL = +domLeft.replace(/px/g, '');
            styT = +domTop.replace(/px/g, '');
          }

          document.onmousemove = function (e) {
            // 通过事件委托，计算移动的距离
            var left = e.clientX - disX;
            var top = e.clientY - disY; // 边界处理

            if (-left > minDragDomLeft) {
              left = -minDragDomLeft;
            } else if (left > maxDragDomLeft) {
              left = maxDragDomLeft;
            }

            if (-top > minDragDomTop) {
              top = -minDragDomTop;
            } else if (top > maxDragDomTop) {
              top = maxDragDomTop;
            } // 移动当前元素


            dragDom.style.cssText += ";left:".concat(left + styL, "px;top:").concat(top + styT, "px;");
          };

          document.onmouseup = function (e) {
            document.onmousemove = null;
            document.onmouseup = null;
          };
        };
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
    return _c("transition", { attrs: { name: "modal-fade" } }, [
      _c("div", { class: ["modal-backdrop", _vm.className] }, [
        _c(
          "div",
          { staticClass: "modal", style: _vm.modalStyle },
          [
            _c(
              "header",
              {
                staticClass: "modal-header",
                class: { "modal-margin": _vm.modalStatus === 1 },
                attrs: { id: "modalTitle" }
              },
              [
                _c(
                  "div",
                  { staticClass: "modal-header-icon" },
                  [
                    _c("svg-icon", {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value: _vm.modalStatus !== 1,
                          expression: "modalStatus !== 1"
                        }
                      ],
                      staticClass: "modal-icon",
                      attrs: { type: "minus-o" },
                      nativeOn: {
                        click: function($event) {
                          return _vm.min($event)
                        }
                      }
                    }),
                    _vm._v(" "),
                    _c("svg-icon", {
                      staticClass: "modal-icon",
                      attrs: { type: "fullscreen-o" },
                      nativeOn: {
                        click: function($event) {
                          return _vm.max($event)
                        }
                      }
                    }),
                    _vm._v(" "),
                    _c("svg-icon", {
                      staticClass: "modal-icon",
                      attrs: { type: "close-o" },
                      nativeOn: {
                        click: function($event) {
                          return _vm.close($event)
                        }
                      }
                    })
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "modal-header-title" },
                  [
                    _vm._t("header", [
                      _vm._v(
                        "\n            " + _vm._s(_vm.title) + "\n          "
                      )
                    ])
                  ],
                  2
                )
              ]
            ),
            _vm._v(" "),
            _c(
              "section",
              {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: _vm.modalStatus !== 1,
                    expression: "modalStatus !== 1"
                  }
                ],
                staticClass: "modal-body"
              },
              [
                _vm._t("default", [
                  _vm._v("\n          I'm the default body!\n        ")
                ])
              ],
              2
            ),
            _vm._v(" "),
            _c("resizer", {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.modalStatus !== 1,
                  expression: "modalStatus !== 1"
                }
              ],
              attrs: { "min-width": 200, "min-height": 100 }
            })
          ],
          1
        )
      ])
    ])
  };
  var __vue_staticRenderFns__$1 = [];
  __vue_render__$1._withStripped = true;

    /* style */
    var __vue_inject_styles__$1 = undefined;
    /* scoped */
    var __vue_scope_id__$1 = "data-v-5390792d";
    /* module identifier */
    var __vue_module_identifier__$1 = undefined;
    /* functional template */
    var __vue_is_functional_template__$1 = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var PopModal = normalizeComponent_1(
      { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
      __vue_inject_styles__$1,
      __vue_script__$1,
      __vue_scope_id__$1,
      __vue_is_functional_template__$1,
      __vue_module_identifier__$1,
      undefined,
      undefined
    );

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function unwrapExports (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var CloseOutline_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  var CloseOutline = {
      name: 'close',
      theme: 'outline',
      icon: {
          tag: 'svg',
          attrs: { viewBox: '64 64 896 896', focusable: false },
          children: [
              {
                  tag: 'path',
                  attrs: {
                      d: 'M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z'
                  }
              }
          ]
      }
  };
  exports.default = CloseOutline;
  });

  var CloseOutline = unwrapExports(CloseOutline_1);

  var FullscreenOutline_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  var FullscreenOutline = {
      name: 'fullscreen',
      theme: 'outline',
      icon: {
          tag: 'svg',
          attrs: { viewBox: '64 64 896 896', focusable: false },
          children: [
              {
                  tag: 'path',
                  attrs: {
                      d: 'M290 236.4l43.9-43.9a8.01 8.01 0 0 0-4.7-13.6L169 160c-5.1-.6-9.5 3.7-8.9 8.9L179 329.1c.8 6.6 8.9 9.4 13.6 4.7l43.7-43.7L370 423.7c3.1 3.1 8.2 3.1 11.3 0l42.4-42.3c3.1-3.1 3.1-8.2 0-11.3L290 236.4zm352.7 187.3c3.1 3.1 8.2 3.1 11.3 0l133.7-133.6 43.7 43.7a8.01 8.01 0 0 0 13.6-4.7L863.9 169c.6-5.1-3.7-9.5-8.9-8.9L694.8 179c-6.6.8-9.4 8.9-4.7 13.6l43.9 43.9L600.3 370a8.03 8.03 0 0 0 0 11.3l42.4 42.4zM845 694.9c-.8-6.6-8.9-9.4-13.6-4.7l-43.7 43.7L654 600.3a8.03 8.03 0 0 0-11.3 0l-42.4 42.3a8.03 8.03 0 0 0 0 11.3L734 787.6l-43.9 43.9a8.01 8.01 0 0 0 4.7 13.6L855 864c5.1.6 9.5-3.7 8.9-8.9L845 694.9zm-463.7-94.6a8.03 8.03 0 0 0-11.3 0L236.3 733.9l-43.7-43.7a8.01 8.01 0 0 0-13.6 4.7L160.1 855c-.6 5.1 3.7 9.5 8.9 8.9L329.2 845c6.6-.8 9.4-8.9 4.7-13.6L290 787.6 423.7 654c3.1-3.1 3.1-8.2 0-11.3l-42.4-42.4z'
                  }
              }
          ]
      }
  };
  exports.default = FullscreenOutline;
  });

  var FullscreenOutline = unwrapExports(FullscreenOutline_1);

  var MinusOutline_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  var MinusOutline = {
      name: 'minus',
      theme: 'outline',
      icon: {
          tag: 'svg',
          attrs: { viewBox: '64 64 896 896', focusable: false },
          children: [
              {
                  tag: 'path',
                  attrs: {
                      d: 'M872 474H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h720c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z'
                  }
              }
          ]
      }
  };
  exports.default = MinusOutline;
  });

  var MinusOutline = unwrapExports(MinusOutline_1);

  var helpers = createCommonjsModule(function (module, exports) {
  var __assign = (commonjsGlobal && commonjsGlobal.__assign) || function () {
      __assign = Object.assign || function(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
              s = arguments[i];
              for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                  t[p] = s[p];
          }
          return t;
      };
      return __assign.apply(this, arguments);
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  function renderIconDefinitionToSVGElement(icon, options) {
      if (options === void 0) { options = {}; }
      if (typeof icon.icon === 'function') {
          var placeholders = options.placeholders || {};
          return renderAbstractNodeToSVGElement(icon.icon(placeholders.primaryColor || '#333', placeholders.secondaryColor || '#E6E6E6'), options);
      }
      return renderAbstractNodeToSVGElement(icon.icon, options);
  }
  exports.renderIconDefinitionToSVGElement = renderIconDefinitionToSVGElement;
  function renderAbstractNodeToSVGElement(node, options) {
      var targetAttrs = node.tag === 'svg'
          ? __assign({}, node.attrs, (options.extraSVGAttrs || {})) : node.attrs;
      var attrs = Object.keys(targetAttrs).reduce(function (acc, nextKey) {
          var key = nextKey;
          var value = targetAttrs[key];
          var token = key + "=\"" + value + "\"";
          acc.push(token);
          return acc;
      }, []);
      var attrsToken = attrs.length ? ' ' + attrs.join(' ') : '';
      var container = [
          "<" + node.tag + attrsToken + ">",
          "</" + node.tag + ">"
      ];
      var children = (node.children || [])
          .map(function (child) { return renderAbstractNodeToSVGElement(child, options); })
          .join('');
      return "" + container[0] + children + container[1];
  }
  });

  unwrapExports(helpers);
  var helpers_1 = helpers.renderIconDefinitionToSVGElement;

  //

  function withSuffix(name, theme) {
    switch (theme) {
      case 'fill':
        return name + '-fill';

      case 'outline':
        return name + '-o';

      case 'twotone':
        return name + '-twotone';

      default:
        throw new TypeError('Unknown theme type: ' + theme + ', name: ' + name);
    }
  }

  var ICONS = {};
  var script$2 = {
    name: 'SvgIcon',
    props: {
      width: {
        type: String,
        default: '1em'
      },
      height: {
        type: String,
        default: '1em'
      },
      type: {
        type: String,
        required: true
      }
    },
    data: function data() {
      return {};
    },
    computed: {
      svgString: function svgString() {
        var svgIcon = ICONS[this.type];

        if (this.type && svgIcon) {
          var svgHTMLString = helpers_1(svgIcon, {
            extraSVGAttrs: {
              width: this.width,
              height: this.height,
              fill: 'currentColor'
            }
          });
          return svgHTMLString;
        }

        return '';
      }
    },
    add: function add() {
      for (var _len = arguments.length, icons = new Array(_len), _key = 0; _key < _len; _key++) {
        icons[_key] = arguments[_key];
      }

      icons.forEach(function (icon) {
        var prop = withSuffix(icon.name, icon.theme);
        ICONS[prop] = icon;
      });
    }
  };

  /* script */
  var __vue_script__$2 = script$2;
  /* template */
  var __vue_render__$2 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("i", {
      staticClass: "ylz-svg-icon",
      domProps: { innerHTML: _vm._s(_vm.svgString) }
    })
  };
  var __vue_staticRenderFns__$2 = [];
  __vue_render__$2._withStripped = true;

    /* style */
    var __vue_inject_styles__$2 = undefined;
    /* scoped */
    var __vue_scope_id__$2 = undefined;
    /* module identifier */
    var __vue_module_identifier__$2 = undefined;
    /* functional template */
    var __vue_is_functional_template__$2 = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var SvgIcon = normalizeComponent_1(
      { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
      __vue_inject_styles__$2,
      __vue_script__$2,
      __vue_scope_id__$2,
      __vue_is_functional_template__$2,
      __vue_module_identifier__$2,
      undefined,
      undefined
    );

  SvgIcon.install = function (Vue) {
    Vue.component(SvgIcon.name, SvgIcon);
  };

  SvgIcon.add(MinusOutline, FullscreenOutline, CloseOutline);
  Vue.use(SvgIcon);

  /* istanbul ignore next */

  PopModal.install = function (Vue) {
    Vue.component(PopModal.name, PopModal);
  };

  return PopModal;

}));
