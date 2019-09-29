/* * Copyright © 2019-2019 chenwenbin * Released under the MIT License. */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global['water-mark'] = factory());
}(this, function () { 'use strict';

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(source, true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(source).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  /* Just return a value to define the module export. */

  /* 加载水印 */
  var loadMark = function loadMark(settings) {
    var defSetting = {
      id: 'water-mark',
      // 水印总体的id
      prefix: 'water-mark-item',
      // 小水印的id前缀
      txt: '',
      // 水印的内容
      markX: 20,
      // 水印起始位置x轴坐标
      markY: 20,
      // 水印起始位置Y轴坐标
      rows: 0,
      // 水印行数
      cols: 0,
      // 水印列数
      xSpace: 100,
      // 水印x轴间隔
      ySpace: 50,
      // 水印y轴间隔
      font: '微软雅黑',
      // 水印字体
      color: 'black',
      // 水印字体颜色
      fontsize: '18px',
      // 水印字体大小
      alpha: 0.1,
      // 水印透明度，要求设置在大于等于0.005
      width: 100,
      // 水印宽度
      height: 100,
      // 水印长度
      angle: 12,
      // 水印倾斜度数
      parentWidth: 0,
      // 水印的总体宽度（默认值：body的scrollWidth和clientWidth的较大值）
      parentHeight: 0,
      // 水印的总体高度（默认值：body的scrollHeight和clientHeight的较大值）
      parentNode: null,
      // 水印插件挂载的父元素element,不输入则默认挂在body上
      clear: false
    }; // 默认值

    defSetting = _objectSpread2({}, defSetting, {}, settings);
    /* 如果元素存在则移除 */

    var watermarkElement = document.getElementById(defSetting.id);

    if (watermarkElement) {
      var _parentElement = watermarkElement.parentNode;

      if (_parentElement) {
        _parentElement.removeChild(watermarkElement);
      }
    }

    if (defSetting.clear) return;
    /* 获取页面最大宽度 */

    var pageWidth = Math.max(document.body.scrollWidth, document.body.clientWidth) - defSetting.width / 2;
    /* 获取页面最大长度 */

    var pageHeight = Math.max(document.body.scrollHeight, document.body.clientHeight, document.documentElement.clientHeight) - defSetting.height / 2;
    var setting = arguments[0] || {};
    var parentEle = defSetting.parentNode;
    var pageOffsetTop = 0;
    var pageOffsetLeft = 0;

    if (setting.parentWidth || setting.parentHeight) {
      setting.parentWidth ? pageWidth = setting.parentWidth - defSetting.width / 2 : defSetting.parentNode ? pageWidth = parentEle.offsetWidth - defSetting.width / 2 : void 0;
      setting.parentHeight ? pageHeight = setting.parentHeight - defSetting.height / 2 : defSetting.parentNode ? pageHeight = Math.max(parentEle.offsetHeight, parentEle.scrollHeight) - defSetting.height / 2 : void 0;
      /* 指定父元素同时指定了宽或高 */

      if (parentEle) {
        pageOffsetTop = parentEle.offsetTop || 0;
        pageOffsetLeft = parentEle.offsetLeft || 0;
        defSetting.markX = defSetting.markX + pageOffsetLeft;
        defSetting.markY = defSetting.markY + pageOffsetTop;
      }
    } else {
      if (parentEle) {
        pageOffsetTop = parentEle.offsetTop || 0;
        pageOffsetLeft = parentEle.offsetLeft || 0;
        pageWidth = parentEle.offsetWidth - defSetting.width / 2 || 0;
        pageHeight = Math.max(parentEle.offsetHeight, parentEle.scrollHeight) - defSetting.height / 2 || 0;
        defSetting.markX = defSetting.markX + pageOffsetLeft;
        defSetting.markY = defSetting.markY + pageOffsetTop;
      }
    }
    /* 创建水印外壳div */


    var otdiv = document.getElementById(defSetting.id);
    var shadowRoot = null;

    if (!otdiv) {
      otdiv = document.createElement('div');
      /* 创建shadow dom */

      otdiv.id = defSetting.id;
      otdiv.style.pointerEvents = 'none';
      /* 判断浏览器是否支持createShadowRoot方法 */

      if (typeof otdiv.createShadowRoot === 'function') {
        shadowRoot = otdiv.createShadowRoot();
      } else {
        shadowRoot = otdiv;
      }
      /* 将shadow dom随机插入body内的任意位置 */


      var nodeList = document.body.children;
      var index = Math.floor(Math.random() * (nodeList.length - 1));

      if (nodeList[index]) {
        document.body.insertBefore(otdiv, nodeList[index]);
      } else {
        document.body.appendChild(otdiv);
      }
    } else if (otdiv.shadowRoot) {
      shadowRoot = otdiv.shadowRoot;
    }
    /* 如果将水印列数设置为0，或水印列数设置过大，超过页面最大宽度，则重新计算水印列数和水印x轴间隔 */


    if (defSetting.cols === 0 || parseInt(defSetting.markX + defSetting.width * defSetting.cols + defSetting.xSpace * (defSetting.cols - 1)) > pageWidth) {
      defSetting.cols = parseInt((pageWidth - defSetting.markX + pageOffsetLeft) / (defSetting.width + defSetting.xSpace));
      defSetting.xSpace = parseInt((pageWidth - defSetting.markX + pageOffsetLeft - defSetting.width * defSetting.cols) / (defSetting.cols - 1));
    }
    /* 如果将水印行数设置为0，或水印行数设置过大，超过页面最大长度，则重新计算水印行数和水印y轴间隔 */


    if (defSetting.rows === 0 || parseInt(defSetting.markY + defSetting.height * defSetting.rows + defSetting.ySpace * (defSetting.rows - 1)) > pageHeight) {
      defSetting.rows = parseInt((pageHeight - defSetting.markY + pageOffsetTop) / (defSetting.height + defSetting.ySpace));
      defSetting.ySpace = parseInt((pageHeight - defSetting.markY + pageOffsetTop - defSetting.height * defSetting.rows) / (defSetting.rows - 1));
    }

    var x;
    var y;

    for (var i = 0; i < defSetting.rows; i++) {
      y = defSetting.markY + (defSetting.ySpace + defSetting.height) * i;

      for (var j = 0; j < defSetting.cols; j++) {
        x = defSetting.markX + (defSetting.width + defSetting.xSpace) * j;
        var maskDiv = document.createElement('div');
        var oText = document.createTextNode(defSetting.txt);
        maskDiv.appendChild(oText);
        /* 设置水印相关属性start */

        maskDiv.id = defSetting.prefix + i + j;
        /* 设置水印div倾斜显示 */

        maskDiv.style.webkitTransform = 'rotate(-' + defSetting.angle + 'deg)';
        maskDiv.style.MozTransform = 'rotate(-' + defSetting.angle + 'deg)';
        maskDiv.style.msTransform = 'rotate(-' + defSetting.angle + 'deg)';
        maskDiv.style.OTransform = 'rotate(-' + defSetting.angle + 'deg)';
        maskDiv.style.transform = 'rotate(-' + defSetting.angle + 'deg)';
        maskDiv.style.visibility = '';
        maskDiv.style.position = 'absolute';
        /* 选不中 */

        maskDiv.style.left = x + 'px';
        maskDiv.style.top = y + 'px';
        maskDiv.style.overflow = 'hidden';
        maskDiv.style.zIndex = '9999999';
        maskDiv.style.pointerEvents = 'none';
        maskDiv.style.opacity = defSetting.alpha;
        maskDiv.style.fontSize = defSetting.fontsize;
        maskDiv.style.fontFamily = defSetting.font;
        maskDiv.style.color = defSetting.color;
        maskDiv.style.textAlign = 'center';
        maskDiv.style.width = defSetting.width + 'px';
        maskDiv.style.height = defSetting.height + 'px';
        maskDiv.style.display = 'block';
        maskDiv.style['-ms-user-select'] = 'none';
        /* 设置水印相关属性end */

        shadowRoot.appendChild(maskDiv);
      }
    }
  };

  var source = {
    load: function load(setting) {
      return loadMark(setting);
    },
    clear: function clear() {
      return loadMark({
        clear: true
      });
    }
  };

  return source;

}));
