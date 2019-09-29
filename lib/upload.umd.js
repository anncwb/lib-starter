/* * Copyright © 2019-2019 chenwenbin * Released under the MIT License. */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue')) :
  typeof define === 'function' && define.amd ? define(['vue'], factory) :
  (global = global || self, global.upload = factory(global.vue));
}(this, function (Vue) { 'use strict';

  Vue = Vue && Vue.hasOwnProperty('default') ? Vue['default'] : Vue;

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
  var _ICON_CLASS = {
    'star-icon-warning': 'exclamation-circle-o',
    'star-icon-circle-check': 'check-circle-o',
    'star-icon-circle-close': 'close-circle-o',
    'star-icon-check': 'check-o',
    'star-icon-close': 'close-o'
  };
  var script = {
    name: 'StarProgress',
    props: {
      type: {
        type: String,
        default: 'line',
        validator: function validator(val) {
          return ['line', 'circle', 'dashboard'].indexOf(val) > -1;
        }
      },
      percentage: {
        type: Number,
        default: 0,
        required: true,
        validator: function validator(val) {
          return val >= 0 && val <= 100;
        }
      },
      status: {
        type: String,
        validator: function validator(val) {
          return ['success', 'exception', 'warning'].indexOf(val) > -1;
        }
      },
      strokeWidth: {
        type: Number,
        default: 6
      },
      textInside: {
        type: Boolean,
        default: false
      },
      width: {
        type: Number,
        default: 126
      },
      showText: {
        type: Boolean,
        default: true
      },
      color: {
        type: [String, Array, Function],
        default: ''
      },
      format: Function
    },
    computed: {
      ICON_CLASS: function ICON_CLASS() {
        return _ICON_CLASS;
      },
      barStyle: function barStyle() {
        var style = {};
        style.width = this.percentage + '%';
        style.backgroundColor = this.getCurrentColor(this.percentage);
        return style;
      },
      relativeStrokeWidth: function relativeStrokeWidth() {
        return (this.strokeWidth / this.width * 100).toFixed(1);
      },
      radius: function radius() {
        if (this.type === 'circle' || this.type === 'dashboard') {
          return parseInt(50 - parseFloat(this.relativeStrokeWidth) / 2, 10);
        } else {
          return 0;
        }
      },
      trackPath: function trackPath() {
        var radius = this.radius;
        var isDashboard = this.type === 'dashboard';
        return "\n          M 50 50\n          m 0 ".concat(isDashboard ? '' : '-').concat(radius, "\n          a ").concat(radius, " ").concat(radius, " 0 1 1 0 ").concat(isDashboard ? '-' : '').concat(radius * 2, "\n          a ").concat(radius, " ").concat(radius, " 0 1 1 0 ").concat(isDashboard ? '' : '-').concat(radius * 2, "\n          ");
      },
      perimeter: function perimeter() {
        return 2 * Math.PI * this.radius;
      },
      rate: function rate() {
        return this.type === 'dashboard' ? 0.75 : 1;
      },
      strokeDashoffset: function strokeDashoffset() {
        var offset = -1 * this.perimeter * (1 - this.rate) / 2;
        return "".concat(offset, "px");
      },
      trailPathStyle: function trailPathStyle() {
        return {
          strokeDasharray: "".concat(this.perimeter * this.rate, "px, ").concat(this.perimeter, "px"),
          strokeDashoffset: this.strokeDashoffset
        };
      },
      circlePathStyle: function circlePathStyle() {
        return {
          strokeDasharray: "".concat(this.perimeter * this.rate * (this.percentage / 100), "px, ").concat(this.perimeter, "px"),
          strokeDashoffset: this.strokeDashoffset,
          transition: 'stroke-dasharray 0.6s ease 0s, stroke 0.6s ease'
        };
      },
      stroke: function stroke() {
        var ret;

        if (this.color) {
          ret = this.getCurrentColor(this.percentage);
        } else {
          switch (this.status) {
            case 'success':
              ret = '#13ce66';
              break;

            case 'exception':
              ret = '#ff4949';
              break;

            case 'warning':
              ret = '#e6a23c';
              break;

            default:
              ret = '#20a0ff';
          }
        }

        return ret;
      },
      iconClass: function iconClass() {
        if (this.status === 'warning') {
          return {
            class: 'star-icon-warning'
          };
        }

        if (this.type === 'line') {
          return this.status === 'success' ? 'star-icon-circle-check' : 'star-icon-circle-close';
        } else {
          return this.status === 'success' ? 'star-icon-check' : 'star-icon-close';
        }
      },
      progressTextSize: function progressTextSize() {
        return this.type === 'line' ? 12 + this.strokeWidth * 0.4 : this.width * 0.111111 + 2;
      },
      content: function content() {
        if (typeof this.format === 'function') {
          return this.format(this.percentage) || '';
        } else {
          return "".concat(this.percentage, "%");
        }
      }
    },
    methods: {
      getCurrentColor: function getCurrentColor(percentage) {
        if (typeof this.color === 'function') {
          return this.color(percentage);
        } else if (typeof this.color === 'string') {
          return this.color;
        } else {
          return this.getLevelColor(percentage);
        }
      },
      getLevelColor: function getLevelColor(percentage) {
        var colorArray = this.getColorArray().sort(function (a, b) {
          return a.percentage - b.percentage;
        });

        for (var i = 0; i < colorArray.length; i++) {
          if (colorArray[i].percentage > percentage) {
            return colorArray[i].color;
          }
        }

        return colorArray[colorArray.length - 1].color;
      },
      getColorArray: function getColorArray() {
        var color = this.color;
        var span = 100 / color.length;
        return color.map(function (seriesColor, index) {
          if (typeof seriesColor === 'string') {
            return {
              color: seriesColor,
              progress: (index + 1) * span
            };
          }

          return seriesColor;
        });
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
    return _c(
      "div",
      {
        staticClass: "star-progress",
        class: [
          "star-progress--" + _vm.type,
          _vm.status ? "is-" + _vm.status : "",
          {
            "star-progress--without-text": !_vm.showText,
            "star-progress--text-inside": _vm.textInside
          }
        ],
        attrs: {
          role: "progressbar",
          "aria-valuenow": _vm.percentage,
          "aria-valuemin": "0",
          "aria-valuemax": "100"
        }
      },
      [
        _vm.type === "line"
          ? _c("div", { staticClass: "star-progress-bar" }, [
              _c(
                "div",
                {
                  staticClass: "star-progress-bar__outer",
                  style: { height: _vm.strokeWidth + "px" }
                },
                [
                  _c(
                    "div",
                    {
                      staticClass: "star-progress-bar__inner",
                      style: _vm.barStyle
                    },
                    [
                      _vm.showText && _vm.textInside
                        ? _c(
                            "div",
                            { staticClass: "star-progress-bar__innerText" },
                            [
                              _vm._v(
                                "\n          " +
                                  _vm._s(_vm.content) +
                                  "\n        "
                              )
                            ]
                          )
                        : _vm._e()
                    ]
                  )
                ]
              )
            ])
          : _c(
              "div",
              {
                staticClass: "star-progress-circle",
                style: { height: _vm.width + "px", width: _vm.width + "px" }
              },
              [
                _c("svg", { attrs: { viewBox: "0 0 100 100" } }, [
                  _c("path", {
                    staticClass: "star-progress-circle__track",
                    style: _vm.trailPathStyle,
                    attrs: {
                      d: _vm.trackPath,
                      stroke: "#e5e9f2",
                      "stroke-width": _vm.relativeStrokeWidth,
                      fill: "none"
                    }
                  }),
                  _vm._v(" "),
                  _c("path", {
                    staticClass: "star-progress-circle__path",
                    style: _vm.circlePathStyle,
                    attrs: {
                      d: _vm.trackPath,
                      stroke: _vm.stroke,
                      fill: "none",
                      "stroke-linecap": "round",
                      "stroke-width": _vm.percentage ? _vm.relativeStrokeWidth : 0
                    }
                  })
                ])
              ]
            ),
        _vm._v(" "),
        _vm.showText && !_vm.textInside
          ? _c(
              "div",
              {
                staticClass: "star-progress__text",
                style: { fontSize: _vm.progressTextSize + "px" }
              },
              [
                !_vm.status
                  ? [_vm._v("\n      " + _vm._s(_vm.content) + "\n    ")]
                  : _c("svg-icon", {
                      class: _vm.iconClass,
                      attrs: { type: _vm.ICON_CLASS[_vm.iconClass] }
                    })
              ],
              2
            )
          : _vm._e()
      ]
    )
  };
  var __vue_staticRenderFns__ = [];
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
    

    
    var StarProgress = normalizeComponent_1(
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
    name: 'StarUploadList',
    components: {
      StarProgress: StarProgress
    },
    props: {
      files: {
        type: Array,
        default: function _default() {
          return [];
        }
      },
      disabled: {
        type: Boolean,
        default: false
      },
      handlePreview: Function,
      listType: String
    },
    // mixins: [Locale],
    data: function data() {
      return {
        focusing: false
      };
    },
    methods: {
      parsePercentage: function parsePercentage(val) {
        return parseInt(val, 10);
      },
      handleClick: function handleClick(file) {
        this.handlePreview && this.handlePreview(file);
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
    return _c(
      "transition-group",
      {
        class: [
          "star-upload-list",
          "star-upload-list--" + _vm.listType,
          { "is-disabled": _vm.disabled }
        ],
        attrs: { tag: "ul", name: "star-list" }
      },
      _vm._l(_vm.files, function(file) {
        return _c(
          "li",
          {
            key: file.uid,
            class: [
              "star-upload-list__item",
              "is-" + file.status,
              _vm.focusing ? "focusing" : ""
            ],
            attrs: { tabindex: "0" },
            on: {
              keydown: function($event) {
                if (
                  !$event.type.indexOf("key") &&
                  _vm._k($event.keyCode, "delete", [8, 46], $event.key, [
                    "Backspace",
                    "Delete",
                    "Del"
                  ])
                ) {
                  return null
                }
                !_vm.disabled && _vm.$emit("remove", file);
              },
              focus: function($event) {
                _vm.focusing = true;
              },
              blur: function($event) {
                _vm.focusing = false;
              },
              click: function($event) {
                _vm.focusing = false;
              }
            }
          },
          [
            _vm._t(
              "default",
              [
                file.status !== "uploading" &&
                ["picture-card", "picture"].indexOf(_vm.listType) > -1
                  ? _c("img", {
                      staticClass: "star-upload-list__item-thumbnail",
                      attrs: { src: file.url, alt: "" }
                    })
                  : _vm._e(),
                _vm._v(" "),
                _c(
                  "a",
                  {
                    staticClass: "star-upload-list__item-name",
                    on: {
                      click: function($event) {
                        return _vm.handleClick(file)
                      }
                    }
                  },
                  [
                    _c("svg-icon", {
                      staticClass: "star-icon-document",
                      attrs: { type: "file-text-o" }
                    }),
                    _vm._v(_vm._s(file.name) + "\n      ")
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "label",
                  { staticClass: "star-upload-list__item-status-label" },
                  [
                    _c("svg-icon", {
                      class: {
                        "star-icon-upload-success": true,
                        "star-icon-circle-check": _vm.listType === "text",
                        "star-icon-check":
                          ["picture-card", "picture"].indexOf(_vm.listType) > -1
                      },
                      attrs: {
                        type:
                          _vm.listType === "text" ? "check-circle-o" : "check-o"
                      }
                    })
                  ],
                  1
                ),
                _vm._v(" "),
                !_vm.disabled
                  ? _c("svg-icon", {
                      staticClass: "star-icon-close",
                      attrs: { type: "close-o" },
                      nativeOn: {
                        click: function($event) {
                          return _vm.$emit("remove", file)
                        }
                      }
                    })
                  : _vm._e(),
                _vm._v(" "),
                !_vm.disabled
                  ? _c("i", { staticClass: "star-icon-close-tip" }, [
                      _vm._v("按 delete 键可删除")
                    ])
                  : _vm._e(),
                _vm._v(" "),
                file.status === "uploading"
                  ? _c("star-progress", {
                      attrs: {
                        type: _vm.listType === "picture-card" ? "circle" : "line",
                        "stroke-width": _vm.listType === "picture-card" ? 6 : 2,
                        percentage: _vm.parsePercentage(file.percentage)
                      }
                    })
                  : _vm._e(),
                _vm._v(" "),
                _vm.listType === "picture-card"
                  ? _c(
                      "span",
                      { staticClass: "star-upload-list__item-actions" },
                      [
                        _vm.handlePreview && _vm.listType === "picture-card"
                          ? _c(
                              "span",
                              {
                                staticClass: "star-upload-list__item-preview",
                                on: {
                                  click: function($event) {
                                    return _vm.handlePreview(file)
                                  }
                                }
                              },
                              [
                                _c("svg-icon", {
                                  staticClass: "star-icon-zoom-in",
                                  attrs: { type: "zoom-in-0" }
                                })
                              ],
                              1
                            )
                          : _vm._e(),
                        _vm._v(" "),
                        !_vm.disabled
                          ? _c(
                              "span",
                              {
                                staticClass: "star-upload-list__item-delete",
                                on: {
                                  click: function($event) {
                                    return _vm.$emit("remove", file)
                                  }
                                }
                              },
                              [
                                _c("svg-icon", {
                                  staticClass: "star-icon-delete",
                                  attrs: { type: "delete-o" }
                                })
                              ],
                              1
                            )
                          : _vm._e()
                      ]
                    )
                  : _vm._e()
              ],
              { file: file }
            )
          ],
          2
        )
      }),
      0
    )
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
    

    
    var UploadList = normalizeComponent_1(
      { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
      __vue_inject_styles__$1,
      __vue_script__$1,
      __vue_scope_id__$1,
      __vue_is_functional_template__$1,
      __vue_module_identifier__$1,
      undefined,
      undefined
    );

  function getError(action, option, xhr) {
    var msg;

    if (xhr.response) {
      msg = "".concat(xhr.response.error || xhr.response);
    } else if (xhr.responseText) {
      msg = "".concat(xhr.responseText);
    } else {
      msg = "fail to post ".concat(action, " ").concat(xhr.status);
    }

    var err = new Error(msg);
    err.status = xhr.status;
    err.method = 'post';
    err.url = action;
    return err;
  }

  function getBody(xhr) {
    var text = xhr.responseText || xhr.response;

    if (!text) {
      return text;
    }

    try {
      return JSON.parse(text);
    } catch (e) {
      return text;
    }
  }

  function upload(option) {
    if (typeof XMLHttpRequest === 'undefined') {
      return;
    }

    var xhr = new XMLHttpRequest();
    var action = option.action;

    if (xhr.upload) {
      xhr.upload.onprogress = function progress(e) {
        if (e.total > 0) {
          e.percent = e.loaded / e.total * 100;
        }

        option.onProgress(e);
      };
    }

    var formData = new FormData();

    if (option.data) {
      Object.keys(option.data).forEach(function (key) {
        formData.append(key, option.data[key]);
      });
    }

    formData.append(option.filename, option.file, option.file.name);

    xhr.onerror = function error(e) {
      option.onError(e);
    };

    xhr.onload = function onload() {
      if (xhr.status < 200 || xhr.status >= 300) {
        return option.onError(getError(action, option, xhr));
      }

      option.onSuccess(getBody(xhr));
    };

    xhr.open('post', action, true);

    if (option.withCredentials && 'withCredentials' in xhr) {
      xhr.withCredentials = true;
    }

    var headers = option.headers || {};

    for (var item in headers) {
      if (headers.hasOwnProperty(item) && headers[item] !== null) {
        xhr.setRequestHeader(item, headers[item]);
      }
    }

    xhr.send(formData);
    return xhr;
  }

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
  var script$2 = {
    name: 'StarUploadDrag',
    props: {
      disabled: Boolean
    },
    inject: {
      uploader: {
        default: ''
      }
    },
    data: function data() {
      return {
        dragover: false
      };
    },
    methods: {
      onDragover: function onDragover() {
        if (!this.disabled) {
          this.dragover = true;
        }
      },
      onDrop: function onDrop(e) {
        if (this.disabled || !this.uploader) return;
        var accept = this.uploader.accept;
        this.dragover = false;

        if (!accept) {
          this.$emit('file', e.dataTransfer.files);
          return;
        }

        this.$emit('file', [].slice.call(e.dataTransfer.files).filter(function (file) {
          var type = file.type,
              name = file.name;
          var extension = name.indexOf('.') > -1 ? ".".concat(name.split('.').pop()) : '';
          var baseType = type.replace(/\/.*$/, '');
          return accept.split(',').map(function (type) {
            return type.trim();
          }).filter(function (type) {
            return type;
          }).some(function (acceptedType) {
            if (/\..+$/.test(acceptedType)) {
              return extension === acceptedType;
            }

            if (/\/\*$/.test(acceptedType)) {
              return baseType === acceptedType.replace(/\/\*$/, '');
            }

            if (/^[^\/]+\/[^\/]+$/.test(acceptedType)) {
              return type === acceptedType;
            }

            return false;
          });
        }));
      }
    }
  };

  /* script */
  var __vue_script__$2 = script$2;

  /* template */
  var __vue_render__$2 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      {
        staticClass: "star-upload-dragger",
        class: {
          "is-dragover": _vm.dragover
        },
        on: {
          drop: function($event) {
            $event.preventDefault();
            return _vm.onDrop($event)
          },
          dragover: function($event) {
            $event.preventDefault();
            return _vm.onDragover($event)
          },
          dragleave: function($event) {
            $event.preventDefault();
            _vm.dragover = false;
          }
        }
      },
      [_vm._t("default")],
      2
    )
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
    

    
    var UploadDragger = normalizeComponent_1(
      { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
      __vue_inject_styles__$2,
      __vue_script__$2,
      __vue_scope_id__$2,
      __vue_is_functional_template__$2,
      __vue_module_identifier__$2,
      undefined,
      undefined
    );

  var script$3 = {
    inject: ['uploader'],
    components: {
      UploadDragger: UploadDragger
    },
    props: {
      type: String,
      action: {
        type: String,
        required: true
      },
      name: {
        type: String,
        default: 'file'
      },
      data: Object,
      headers: Object,
      withCredentials: Boolean,
      multiple: Boolean,
      accept: String,
      onStart: Function,
      onProgress: Function,
      onSuccess: Function,
      onError: Function,
      beforeUpload: Function,
      drag: Boolean,
      onPreview: {
        type: Function,
        default: function _default() {}
      },
      onRemove: {
        type: Function,
        default: function _default() {}
      },
      fileList: Array,
      autoUpload: Boolean,
      listType: String,
      httpRequest: {
        type: Function,
        default: upload
      },
      disabled: Boolean,
      limit: Number,
      onExceed: Function
    },
    data: function data() {
      return {
        mouseover: false,
        reqs: {}
      };
    },
    methods: {
      isImage: function isImage(str) {
        return str.indexOf('image') !== -1;
      },
      handleChange: function handleChange(ev) {
        var files = ev.target.files;
        if (!files) return;
        this.uploadFiles(files);
      },
      uploadFiles: function uploadFiles(files) {
        var _this = this;

        if (this.limit && this.fileList.length + files.length > this.limit) {
          this.onExceed && this.onExceed(files, this.fileList);
          return;
        }

        var postFiles = Array.prototype.slice.call(files);

        if (!this.multiple) {
          postFiles = postFiles.slice(0, 1);
        }

        if (postFiles.length === 0) {
          return;
        }

        postFiles.forEach(function (rawFile) {
          _this.onStart(rawFile);

          if (_this.autoUpload) _this.upload(rawFile);
        });
      },
      upload: function upload(rawFile) {
        var _this2 = this;

        this.$refs.input.value = null;

        if (!this.beforeUpload) {
          return this.post(rawFile);
        }

        var before = this.beforeUpload(rawFile);

        if (before && before.then) {
          before.then(function (processedFile) {
            var fileType = Object.prototype.toString.call(processedFile);

            if (fileType === '[object File]' || fileType === '[object Blob]') {
              if (fileType === '[object Blob]') {
                processedFile = new File([processedFile], rawFile.name, {
                  type: rawFile.type
                });
              }

              for (var p in rawFile) {
                if (rawFile.hasOwnProperty(p)) {
                  processedFile[p] = rawFile[p];
                }
              }

              _this2.post(processedFile);
            } else {
              _this2.post(rawFile);
            }
          }, function () {
            _this2.onRemove(null, rawFile);
          });
        } else if (before !== false) {
          this.post(rawFile);
        } else {
          this.onRemove(null, rawFile);
        }
      },
      abort: function abort(file) {
        var reqs = this.reqs;

        if (file) {
          var uid = file;
          if (file.uid) uid = file.uid;

          if (reqs[uid]) {
            reqs[uid].abort();
          }
        } else {
          Object.keys(reqs).forEach(function (uid) {
            if (reqs[uid]) reqs[uid].abort();
            delete reqs[uid];
          });
        }
      },
      post: function post(rawFile) {
        var _this3 = this;

        var uid = rawFile.uid;
        var options = {
          headers: this.headers,
          withCredentials: this.withCredentials,
          file: rawFile,
          data: this.data,
          filename: this.name,
          action: this.action,
          onProgress: function onProgress(e) {
            _this3.onProgress(e, rawFile);
          },
          onSuccess: function onSuccess(res) {
            _this3.onSuccess(res, rawFile);

            delete _this3.reqs[uid];
          },
          onError: function onError(err) {
            _this3.onError(err, rawFile);

            delete _this3.reqs[uid];
          }
        };
        var req = this.httpRequest(options);
        this.reqs[uid] = req;

        if (req && req.then) {
          req.then(options.onSuccess, options.onError);
        }
      },
      handleClick: function handleClick() {
        if (!this.disabled) {
          this.$refs.input.value = null;
          this.$refs.input.click();
        }
      },
      handleKeydown: function handleKeydown(e) {
        if (e.target !== e.currentTarget) return;

        if (e.keyCode === 13 || e.keyCode === 32) {
          this.handleClick();
        }
      }
    },
    // render(h) {
    //   let {
    //     handleClick,
    //     drag,
    //     name,
    //     handleChange,
    //     multiple,
    //     accept,
    //     listType,
    //     uploadFiles,
    //     disabled,
    //     handleKeydown
    //   } = this
    //   var data = {
    //     class: {
    //       'star-upload': true
    //     },
    //     on: {
    //       click: handleClick,
    //       keydown: handleKeydown
    //     }
    //   }
    //   data.class[`star-upload--${listType}`] = true
    //   return (
    //     <div {...data} tabindex="0">
    //       {drag ? (
    //         <upload-dragger disabled={disabled} on-file={uploadFiles}>
    //           {this.$slots.default}
    //         </upload-dragger>
    //       ) : (
    //         this.$slots.default
    //       )}
    //       <input
    //         class="star-upload__input"
    //         type="file"
    //         ref="input"
    //         name={name}
    //         on-change={handleChange}
    //         multiple={multiple}
    //         accept={accept}
    //       ></input>
    //     </div>
    //   )
    // }
    render: function render(h) {
      var handleClick = this.handleClick,
          drag = this.drag,
          name = this.name,
          handleChange = this.handleChange,
          multiple = this.multiple,
          accept = this.accept,
          listType = this.listType,
          uploadFiles = this.uploadFiles,
          disabled = this.disabled,
          handleKeydown = this.handleKeydown;
      var data = {
        class: {
          'star-upload': true
        },
        on: {
          click: handleClick,
          keydown: handleKeydown
        }
      };
      data.class["star-upload--".concat(listType)] = true;
      return h('div', Object.assign({}, data, {
        attrs: {
          tabindex: '0'
        }
      }), [drag ? h('upload-dragger', {
        attrs: {
          disabled: disabled
        },
        on: {
          file: uploadFiles
        }
      }, [this.$slots.default]) : this.$slots.default, h('input', {
        class: 'star-upload__input',
        attrs: {
          type: 'file',
          name: name,
          multiple: multiple,
          accept: accept
        },
        ref: 'input',
        on: {
          change: handleChange
        }
      })]);
    }
  };

  /* script */
  var __vue_script__$3 = script$3;

  /* template */

    /* style */
    var __vue_inject_styles__$3 = undefined;
    /* scoped */
    var __vue_scope_id__$3 = undefined;
    /* module identifier */
    var __vue_module_identifier__$3 = undefined;
    /* functional template */
    var __vue_is_functional_template__$3 = undefined;
    /* style inject */
    
    /* style inject SSR */
    

    
    var Upload = normalizeComponent_1(
      {},
      __vue_inject_styles__$3,
      __vue_script__$3,
      __vue_scope_id__$3,
      __vue_is_functional_template__$3,
      __vue_module_identifier__$3,
      undefined,
      undefined
    );

  function noop() {}

  var script$4 = {
    // name: 'ElUpload',
    name: 'StarUpload',
    // mixins: [Migrating],
    components: {
      StarProgress: StarProgress,
      UploadList: UploadList,
      Upload: Upload
    },
    provide: function provide() {
      return {
        uploader: this
      };
    },
    inject: {
      elForm: {
        default: ''
      }
    },
    props: {
      action: {
        type: String,
        required: true
      },
      headers: {
        type: Object,
        default: function _default() {
          return {};
        }
      },
      data: Object,
      multiple: Boolean,
      name: {
        type: String,
        default: 'file'
      },
      drag: Boolean,
      dragger: Boolean,
      withCredentials: Boolean,
      showFileList: {
        type: Boolean,
        default: true
      },
      accept: String,
      type: {
        type: String,
        default: 'select'
      },
      beforeUpload: Function,
      beforeRemove: Function,
      onRemove: {
        type: Function,
        default: noop
      },
      onChange: {
        type: Function,
        default: noop
      },
      onPreview: {
        type: Function
      },
      onSuccess: {
        type: Function,
        default: noop
      },
      onProgress: {
        type: Function,
        default: noop
      },
      onError: {
        type: Function,
        default: noop
      },
      fileList: {
        type: Array,
        default: function _default() {
          return [];
        }
      },
      autoUpload: {
        type: Boolean,
        default: true
      },
      listType: {
        type: String,
        default: 'text' // text,picture,picture-card

      },
      httpRequest: Function,
      disabled: Boolean,
      limit: Number,
      onExceed: {
        type: Function,
        default: noop
      }
    },
    data: function data() {
      return {
        uploadFiles: [],
        dragOver: false,
        draging: false,
        tempIndex: 1
      };
    },
    computed: {
      uploadDisabled: function uploadDisabled() {
        return this.disabled || (this.elForm || {}).disabled;
      }
    },
    watch: {
      listType: function listType(type) {
        if (type === 'picture-card' || type === 'picture') {
          this.uploadFiles = this.uploadFiles.map(function (file) {
            if (!file.url && file.raw) {
              try {
                file.url = URL.createObjectURL(file.raw);
              } catch (err) {
                console.error('[Element Error][Upload]', err);
              }
            }

            return file;
          });
        }
      },
      fileList: {
        immediate: true,
        handler: function handler(fileList) {
          var _this = this;

          this.uploadFiles = fileList.map(function (item) {
            item.uid = item.uid || Date.now() + _this.tempIndex++;
            item.status = item.status || 'success';
            return item;
          });
        }
      }
    },
    beforeDestroy: function beforeDestroy() {
      this.uploadFiles.forEach(function (file) {
        if (file.url && file.url.indexOf('blob:') === 0) {
          URL.revokeObjectURL(file.url);
        }
      });
    },
    methods: {
      handleStart: function handleStart(rawFile) {
        rawFile.uid = Date.now() + this.tempIndex++;
        var file = {
          status: 'ready',
          name: rawFile.name,
          size: rawFile.size,
          percentage: 0,
          uid: rawFile.uid,
          raw: rawFile
        };

        if (this.listType === 'picture-card' || this.listType === 'picture') {
          try {
            file.url = URL.createObjectURL(rawFile);
          } catch (err) {
            console.error('[Element Error][Upload]', err);
            return;
          }
        }

        this.uploadFiles.push(file);
        this.onChange(file, this.uploadFiles);
      },
      handleProgress: function handleProgress(ev, rawFile) {
        var file = this.getFile(rawFile);
        this.onProgress(ev, file, this.uploadFiles);
        file.status = 'uploading';
        file.percentage = ev.percent || 0;
      },
      handleSuccess: function handleSuccess(res, rawFile) {
        var file = this.getFile(rawFile);

        if (file) {
          file.status = 'success';
          file.response = res;
          this.onSuccess(res, file, this.uploadFiles);
          this.onChange(file, this.uploadFiles);
        }
      },
      handleError: function handleError(err, rawFile) {
        var file = this.getFile(rawFile);
        var fileList = this.uploadFiles;
        file.status = 'fail';
        fileList.splice(fileList.indexOf(file), 1);
        this.onError(err, file, this.uploadFiles);
        this.onChange(file, this.uploadFiles);
      },
      handleRemove: function handleRemove(file, raw) {
        var _this2 = this;

        if (raw) {
          file = this.getFile(raw);
        }

        var doRemove = function doRemove() {
          _this2.abort(file);

          var fileList = _this2.uploadFiles;
          fileList.splice(fileList.indexOf(file), 1);

          _this2.onRemove(file, fileList);
        };

        if (!this.beforeRemove) {
          doRemove();
        } else if (typeof this.beforeRemove === 'function') {
          var before = this.beforeRemove(file, this.uploadFiles);

          if (before && before.then) {
            before.then(function () {
              doRemove();
            }, noop);
          } else if (before !== false) {
            doRemove();
          }
        }
      },
      getFile: function getFile(rawFile) {
        var fileList = this.uploadFiles;
        var target;
        fileList.every(function (item) {
          target = rawFile.uid === item.uid ? item : null;
          return !target;
        });
        return target;
      },
      abort: function abort(file) {
        this.$refs['upload-inner'].abort(file);
      },
      clearFiles: function clearFiles() {
        this.uploadFiles = [];
      },
      submit: function submit() {
        var _this3 = this;

        this.uploadFiles.filter(function (file) {
          return file.status === 'ready';
        }).forEach(function (file) {
          _this3.$refs['upload-inner'].upload(file.raw);
        });
      } // getMigratingConfig() {
      //   return {
      //     props: {
      //       'default-file-list': 'default-file-list is renamed to file-list.',
      //       'show-upload-list': 'show-upload-list is renamed to show-file-list.',
      //       'thumbnail-mode': 'thumbnail-mode has been deprecated, you can implement the same effect according to this case: http://element.eleme.io/#/zh-CN/component/upload#yong-hu-tou-xiang-shang-chuan'
      //     }
      //   };
      // }

    },
    // render(h) {
    //   let uploadList
    //   if (this.showFileList) {
    //     uploadList = (
    //       <UploadList
    //         disabled={this.uploadDisabled}
    //         listType={this.listType}
    //         files={this.uploadFiles}
    //         on-remove={this.handleRemove}
    //         handlePreview={this.onPreview}
    //       >
    //         {(props) => {
    //           if (this.$scopedSlots.file) {
    //             return this.$scopedSlots.file({
    //               file: props.file
    //             })
    //           }
    //         }}
    //       </UploadList>
    //     )
    //   }
    //   var uploadData = {
    //     props: {
    //       type: this.type,
    //       drag: this.drag,
    //       action: this.action,
    //       multiple: this.multiple,
    //       'before-upload': this.beforeUpload,
    //       'with-credentials': this.withCredentials,
    //       headers: this.headers,
    //       name: this.name,
    //       data: this.data,
    //       accept: this.accept,
    //       fileList: this.uploadFiles,
    //       autoUpload: this.autoUpload,
    //       listType: this.listType,
    //       disabled: this.uploadDisabled,
    //       limit: this.limit,
    //       'on-exceed': this.onExceed,
    //       'on-start': this.handleStart,
    //       'on-progress': this.handleProgress,
    //       'on-success': this.handleSuccess,
    //       'on-error': this.handleError,
    //       'on-preview': this.onPreview,
    //       'on-remove': this.handleRemove,
    //       'http-request': this.httpRequest
    //     },
    //     ref: 'upload-inner'
    //   }
    //   var trigger = this.$slots.trigger || this.$slots.default
    //   var uploadComponent = <upload {...uploadData}>{trigger}</upload>
    //   return
    //   (
    //     <div>
    //       {this.listType === 'picture-card' ? uploadList : ''}
    //       {this.$slots.trigger ? [uploadComponent, this.$slots.default] : uploadComponent}
    //       {this.$slots.tip}
    //       {this.listType !== 'picture-card' ? uploadList : ''}
    //     </div>
    //   )
    // }
    render: function render(h) {
      var uploadList;

      var _this4 = this;

      if (this.showFileList) {
        uploadList = h(UploadList, {
          attrs: {
            disabled: this.uploadDisabled,
            listType: this.listType,
            files: this.uploadFiles,
            handlePreview: this.onPreview
          },
          on: {
            remove: this.handleRemove
          }
        }, [function (props) {
          if (_this4.$scopedSlots.file) {
            return _this4.$scopedSlots.file({
              file: props.file
            });
          }
        }]);
      }

      var uploadData = {
        props: {
          type: this.type,
          drag: this.drag,
          action: this.action,
          multiple: this.multiple,
          'before-upload': this.beforeUpload,
          'with-credentials': this.withCredentials,
          headers: this.headers,
          name: this.name,
          data: this.data,
          accept: this.accept,
          fileList: this.uploadFiles,
          autoUpload: this.autoUpload,
          listType: this.listType,
          disabled: this.uploadDisabled,
          limit: this.limit,
          'on-exceed': this.onExceed,
          'on-start': this.handleStart,
          'on-progress': this.handleProgress,
          'on-success': this.handleSuccess,
          'on-error': this.handleError,
          'on-preview': this.onPreview,
          'on-remove': this.handleRemove,
          'http-request': this.httpRequest
        },
        ref: 'upload-inner'
      };
      var trigger = this.$slots.trigger || this.$slots.default;
      var uploadComponent = h(Upload, uploadData, [trigger]);
      return h('div', [this.listType === 'picture-card' ? uploadList : '', this.$slots.trigger ? [uploadComponent, this.$slots.default] : uploadComponent, this.$slots.tip, this.listType !== 'picture-card' ? uploadList : '']);
    }
  };

  /* script */
  var __vue_script__$4 = script$4;

  /* template */

    /* style */
    var __vue_inject_styles__$4 = undefined;
    /* scoped */
    var __vue_scope_id__$4 = undefined;
    /* module identifier */
    var __vue_module_identifier__$4 = undefined;
    /* functional template */
    var __vue_is_functional_template__$4 = undefined;
    /* style inject */
    
    /* style inject SSR */
    

    
    var Upload$1 = normalizeComponent_1(
      {},
      __vue_inject_styles__$4,
      __vue_script__$4,
      __vue_scope_id__$4,
      __vue_is_functional_template__$4,
      __vue_module_identifier__$4,
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

  var CheckCircleOutline_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  var CheckCircleOutline = {
      name: 'check-circle',
      theme: 'outline',
      icon: {
          tag: 'svg',
          attrs: { viewBox: '64 64 896 896', focusable: false },
          children: [
              {
                  tag: 'path',
                  attrs: {
                      d: 'M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0 0 51.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z'
                  }
              },
              {
                  tag: 'path',
                  attrs: {
                      d: 'M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z'
                  }
              }
          ]
      }
  };
  exports.default = CheckCircleOutline;
  });

  var CheckCircleOutline = unwrapExports(CheckCircleOutline_1);

  var CloseCircleOutline_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  var CloseCircleOutline = {
      name: 'close-circle',
      theme: 'outline',
      icon: {
          tag: 'svg',
          attrs: { viewBox: '64 64 896 896', focusable: false },
          children: [
              {
                  tag: 'path',
                  attrs: {
                      d: 'M685.4 354.8c0-4.4-3.6-8-8-8l-66 .3L512 465.6l-99.3-118.4-66.1-.3c-4.4 0-8 3.5-8 8 0 1.9.7 3.7 1.9 5.2l130.1 155L340.5 670a8.32 8.32 0 0 0-1.9 5.2c0 4.4 3.6 8 8 8l66.1-.3L512 564.4l99.3 118.4 66 .3c4.4 0 8-3.5 8-8 0-1.9-.7-3.7-1.9-5.2L553.5 515l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z'
                  }
              },
              {
                  tag: 'path',
                  attrs: {
                      d: 'M512 65C264.6 65 64 265.6 64 513s200.6 448 448 448 448-200.6 448-448S759.4 65 512 65zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z'
                  }
              }
          ]
      }
  };
  exports.default = CloseCircleOutline;
  });

  var CloseCircleOutline = unwrapExports(CloseCircleOutline_1);

  var DeleteOutline_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  var DeleteOutline = {
      name: 'delete',
      theme: 'outline',
      icon: {
          tag: 'svg',
          attrs: { viewBox: '64 64 896 896', focusable: false },
          children: [
              {
                  tag: 'path',
                  attrs: {
                      d: 'M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z'
                  }
              }
          ]
      }
  };
  exports.default = DeleteOutline;
  });

  var DeleteOutline = unwrapExports(DeleteOutline_1);

  var ExclamationCircleOutline_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  var ExclamationCircleOutline = {
      name: 'exclamation-circle',
      theme: 'outline',
      icon: {
          tag: 'svg',
          attrs: { viewBox: '64 64 896 896', focusable: false },
          children: [
              {
                  tag: 'path',
                  attrs: {
                      d: 'M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z'
                  }
              },
              {
                  tag: 'path',
                  attrs: {
                      d: 'M464 688a48 48 0 1 0 96 0 48 48 0 1 0-96 0zm24-112h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8z'
                  }
              }
          ]
      }
  };
  exports.default = ExclamationCircleOutline;
  });

  var ExclamationCircleOutline = unwrapExports(ExclamationCircleOutline_1);

  var FileTextOutline_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  var FileTextOutline = {
      name: 'file-text',
      theme: 'outline',
      icon: {
          tag: 'svg',
          attrs: { viewBox: '64 64 896 896', focusable: false },
          children: [
              {
                  tag: 'path',
                  attrs: {
                      d: 'M854.6 288.6L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0 0 42 42h216v494zM504 618H320c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zM312 490v48c0 4.4 3.6 8 8 8h384c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H320c-4.4 0-8 3.6-8 8z'
                  }
              }
          ]
      }
  };
  exports.default = FileTextOutline;
  });

  var FileTextOutline = unwrapExports(FileTextOutline_1);

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

  var CheckOutline_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  var CheckOutline = {
      name: 'check',
      theme: 'outline',
      icon: {
          tag: 'svg',
          attrs: { viewBox: '64 64 896 896', focusable: false },
          children: [
              {
                  tag: 'path',
                  attrs: {
                      d: 'M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z'
                  }
              }
          ]
      }
  };
  exports.default = CheckOutline;
  });

  var CheckOutline = unwrapExports(CheckOutline_1);

  var ZoomInOutline_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  var ZoomInOutline = {
      name: 'zoom-in',
      theme: 'outline',
      icon: {
          tag: 'svg',
          attrs: { viewBox: '64 64 896 896', focusable: false },
          children: [
              {
                  tag: 'path',
                  attrs: {
                      d: 'M637 443H519V309c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v134H325c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h118v134c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V519h118c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8zm284 424L775 721c122.1-148.9 113.6-369.5-26-509-148-148.1-388.4-148.1-537 0-148.1 148.6-148.1 389 0 537 139.5 139.6 360.1 148.1 509 26l146 146c3.2 2.8 8.3 2.8 11 0l43-43c2.8-2.7 2.8-7.8 0-11zM696 696c-118.8 118.7-311.2 118.7-430 0-118.7-118.8-118.7-311.2 0-430 118.8-118.7 311.2-118.7 430 0 118.7 118.8 118.7 311.2 0 430z'
                  }
              }
          ]
      }
  };
  exports.default = ZoomInOutline;
  });

  var ZoomInOutline = unwrapExports(ZoomInOutline_1);

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
  var script$5 = {
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
  var __vue_script__$5 = script$5;
  /* template */
  var __vue_render__$3 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("i", {
      staticClass: "ylz-svg-icon",
      domProps: { innerHTML: _vm._s(_vm.svgString) }
    })
  };
  var __vue_staticRenderFns__$3 = [];
  __vue_render__$3._withStripped = true;

    /* style */
    var __vue_inject_styles__$5 = undefined;
    /* scoped */
    var __vue_scope_id__$5 = undefined;
    /* module identifier */
    var __vue_module_identifier__$5 = undefined;
    /* functional template */
    var __vue_is_functional_template__$5 = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var SvgIcon = normalizeComponent_1(
      { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
      __vue_inject_styles__$5,
      __vue_script__$5,
      __vue_scope_id__$5,
      __vue_is_functional_template__$5,
      __vue_module_identifier__$5,
      undefined,
      undefined
    );

  SvgIcon.install = function (Vue) {
    Vue.component(SvgIcon.name, SvgIcon);
  };

  SvgIcon.add(FileTextOutline, CheckCircleOutline, CheckOutline, CloseOutline, ZoomInOutline, DeleteOutline, ExclamationCircleOutline, CloseCircleOutline);
  Vue.use(SvgIcon);

  /* istanbul ignore next */

  Upload$1.install = function (Vue) {
    Vue.component(Upload$1.name, Upload$1);
  };

  return Upload$1;

}));
