/* * Copyright © 2019-2019 chenwenbin * Released under the MIT License. */
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Vue = _interopDefault(require('vue'));

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var screenfull = createCommonjsModule(function (module) {
/*!
* screenfull
* v5.0.0 - 2019-09-09
* (c) Sindre Sorhus; MIT License
*/
(function () {

	var document = typeof window !== 'undefined' && typeof window.document !== 'undefined' ? window.document : {};
	var isCommonjs =  module.exports;

	var fn = (function () {
		var val;

		var fnMap = [
			[
				'requestFullscreen',
				'exitFullscreen',
				'fullscreenElement',
				'fullscreenEnabled',
				'fullscreenchange',
				'fullscreenerror'
			],
			// New WebKit
			[
				'webkitRequestFullscreen',
				'webkitExitFullscreen',
				'webkitFullscreenElement',
				'webkitFullscreenEnabled',
				'webkitfullscreenchange',
				'webkitfullscreenerror'

			],
			// Old WebKit
			[
				'webkitRequestFullScreen',
				'webkitCancelFullScreen',
				'webkitCurrentFullScreenElement',
				'webkitCancelFullScreen',
				'webkitfullscreenchange',
				'webkitfullscreenerror'

			],
			[
				'mozRequestFullScreen',
				'mozCancelFullScreen',
				'mozFullScreenElement',
				'mozFullScreenEnabled',
				'mozfullscreenchange',
				'mozfullscreenerror'
			],
			[
				'msRequestFullscreen',
				'msExitFullscreen',
				'msFullscreenElement',
				'msFullscreenEnabled',
				'MSFullscreenChange',
				'MSFullscreenError'
			]
		];

		var i = 0;
		var l = fnMap.length;
		var ret = {};

		for (; i < l; i++) {
			val = fnMap[i];
			if (val && val[1] in document) {
				for (i = 0; i < val.length; i++) {
					ret[fnMap[0][i]] = val[i];
				}
				return ret;
			}
		}

		return false;
	})();

	var eventNameMap = {
		change: fn.fullscreenchange,
		error: fn.fullscreenerror
	};

	var screenfull = {
		request: function (element) {
			return new Promise(function (resolve, reject) {
				var onFullScreenEntered = function () {
					this.off('change', onFullScreenEntered);
					resolve();
				}.bind(this);

				this.on('change', onFullScreenEntered);

				element = element || document.documentElement;

				Promise.resolve(element[fn.requestFullscreen]()).catch(reject);
			}.bind(this));
		},
		exit: function () {
			return new Promise(function (resolve, reject) {
				if (!this.isFullscreen) {
					resolve();
					return;
				}

				var onFullScreenExit = function () {
					this.off('change', onFullScreenExit);
					resolve();
				}.bind(this);

				this.on('change', onFullScreenExit);

				Promise.resolve(document[fn.exitFullscreen]()).catch(reject);
			}.bind(this));
		},
		toggle: function (element) {
			return this.isFullscreen ? this.exit() : this.request(element);
		},
		onchange: function (callback) {
			this.on('change', callback);
		},
		onerror: function (callback) {
			this.on('error', callback);
		},
		on: function (event, callback) {
			var eventName = eventNameMap[event];
			if (eventName) {
				document.addEventListener(eventName, callback, false);
			}
		},
		off: function (event, callback) {
			var eventName = eventNameMap[event];
			if (eventName) {
				document.removeEventListener(eventName, callback, false);
			}
		},
		raw: fn
	};

	if (!fn) {
		if (isCommonjs) {
			module.exports = {isEnabled: false};
		} else {
			window.screenfull = {isEnabled: false};
		}

		return;
	}

	Object.defineProperties(screenfull, {
		isFullscreen: {
			get: function () {
				return Boolean(document[fn.fullscreenElement]);
			}
		},
		element: {
			enumerable: true,
			get: function () {
				return document[fn.fullscreenElement];
			}
		},
		isEnabled: {
			enumerable: true,
			get: function () {
				// Coerce to boolean in case of old WebKit
				return Boolean(document[fn.fullscreenEnabled]);
			}
		}
	});

	if (isCommonjs) {
		module.exports = screenfull;
	} else {
		window.screenfull = screenfull;
	}
})();
});
var screenfull_1 = screenfull.isEnabled;

//
var script = {
  name: 'Fullscreen',
  props: {
    wrapClass: {
      type: String,
      default: ''
    }
  },
  data: function data() {
    return {
      isFullscreen: false
    };
  },
  mounted: function mounted() {
    this.init();
  },
  beforeDestroy: function beforeDestroy() {
    this.destroy();
  },
  methods: {
    // 点击图标
    handleIconClick: function handleIconClick() {
      if (!screenfull.isEnabled) {
        this.$message.error('您的浏览器不支持全屏!');
        return false;
      }

      screenfull.toggle();
    },
    change: function change() {
      this.isFullscreen = screenfull.isFullscreen;
    },
    init: function init() {
      if (screenfull.isEnabled) {
        screenfull.on('change', this.change);
      }
    },
    destroy: function destroy() {
      if (screenfull.isEnabled) {
        screenfull.off('change', this.change);
      }
    },
    renderIcon: function renderIcon(h) {
      var isFullscreen = this.isFullscreen,
          handleIconClick = this.handleIconClick;
      return h('svg-icon', {
        style: {
          fontSize: '16px'
        },
        attrs: {
          type: isFullscreen ? 'fullscreen-exit-o' : 'fullscreen-o'
        }
      });
    }
  },
  render: function render(h) {
    var isFullscreen = this.isFullscreen,
        handleIconClick = this.handleIconClick;
    return h('div', {
      className: ['fullscreen', this.wrapClass],
      on: {
        click: handleIconClick
      }
    }, [this.renderIcon(h)]);
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

  /* style */
  var __vue_inject_styles__ = undefined;
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = undefined;
  /* style inject */
  
  /* style inject SSR */
  

  
  var Fullscreen = normalizeComponent_1(
    {},
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    undefined
  );

var FullscreenExitOutline_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
var FullscreenExitOutline = {
    name: 'fullscreen-exit',
    theme: 'outline',
    icon: {
        tag: 'svg',
        attrs: { viewBox: '64 64 896 896', focusable: false },
        children: [
            {
                tag: 'path',
                attrs: {
                    d: 'M391 240.9c-.8-6.6-8.9-9.4-13.6-4.7l-43.7 43.7L200 146.3a8.03 8.03 0 0 0-11.3 0l-42.4 42.3a8.03 8.03 0 0 0 0 11.3L280 333.6l-43.9 43.9a8.01 8.01 0 0 0 4.7 13.6L401 410c5.1.6 9.5-3.7 8.9-8.9L391 240.9zm10.1 373.2L240.8 633c-6.6.8-9.4 8.9-4.7 13.6l43.9 43.9L146.3 824a8.03 8.03 0 0 0 0 11.3l42.4 42.3c3.1 3.1 8.2 3.1 11.3 0L333.7 744l43.7 43.7A8.01 8.01 0 0 0 391 783l18.9-160.1c.6-5.1-3.7-9.4-8.8-8.8zm221.8-204.2L783.2 391c6.6-.8 9.4-8.9 4.7-13.6L744 333.6 877.7 200c3.1-3.1 3.1-8.2 0-11.3l-42.4-42.3a8.03 8.03 0 0 0-11.3 0L690.3 279.9l-43.7-43.7a8.01 8.01 0 0 0-13.6 4.7L614.1 401c-.6 5.2 3.7 9.5 8.8 8.9zM744 690.4l43.9-43.9a8.01 8.01 0 0 0-4.7-13.6L623 614c-5.1-.6-9.5 3.7-8.9 8.9L633 783.1c.8 6.6 8.9 9.4 13.6 4.7l43.7-43.7L824 877.7c3.1 3.1 8.2 3.1 11.3 0l42.4-42.3c3.1-3.1 3.1-8.2 0-11.3L744 690.4z'
                }
            }
        ]
    }
};
exports.default = FullscreenExitOutline;
});

var FullscreenExitOutline = unwrapExports(FullscreenExitOutline_1);

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
var script$1 = {
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

/* script */ var __vue_script__$1 = script$1;
/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("i", {
    staticClass: "ylz-svg-icon",
    domProps: { innerHTML: _vm._s(_vm.svgString) }
  })
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

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
  

  
  var SvgIcon = normalizeComponent_1(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    undefined,
    undefined
  );

SvgIcon.install = function (Vue) {
  Vue.component(SvgIcon.name, SvgIcon);
};

SvgIcon.add(FullscreenExitOutline, FullscreenOutline);
Vue.use(SvgIcon);

// 导入组件，组件必须声明 name

Fullscreen.install = function (Vue) {
  Vue.component(Fullscreen.name, Fullscreen);
}; // 默认导出组件

module.exports = Fullscreen;
