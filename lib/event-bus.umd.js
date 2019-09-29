/* * Copyright © 2019-2019 chenwenbin * Released under the MIT License. */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global['event-bus'] = factory());
}(this, function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    }
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  /**
   *
   * 让在Vue中使用的EventBus也有生命周期
   */
  var EventBus =
  /*#__PURE__*/
  function () {
    function EventBus(vue) {
      _classCallCheck(this, EventBus);

      if (!this.handles) {
        Object.defineProperty(this, 'handles', {
          value: {},
          enumerable: false
        });
      }

      this.Vue = vue; // _uid和EventName的映射

      this.eventMapUid = {};
    }

    _createClass(EventBus, [{
      key: "setEventMapUid",
      value: function setEventMapUid(uid, eventName) {
        if (!this.eventMapUid[uid]) this.eventMapUid[uid] = [];
        this.eventMapUid[uid].push(eventName); // 把每个_uid订阅的事件名字push到各自uid所属的数组里
      }
    }, {
      key: "$on",
      value: function $on(eventName, callback, vm) {
        // vm是在组件内部使用时组件当前的this用于取_uid
        if (!this.handles[eventName]) this.handles[eventName] = [];
        this.handles[eventName].push(callback);
        if (vm instanceof this.Vue) this.setEventMapUid(vm._uid, eventName);
      }
    }, {
      key: "$emit",
      value: function $emit() {
        var args = Array.prototype.slice.call(arguments);
        var eventName = args[0];
        var params = args.slice(1);

        if (this.handles[eventName]) {
          var len = this.handles[eventName].length;

          for (var i = 0; i < len; i++) {
            var _this$handles$eventNa;

            (_this$handles$eventNa = this.handles[eventName])[i].apply(_this$handles$eventNa, _toConsumableArray(params));
          }
        }
      }
    }, {
      key: "$offVmEvent",
      value: function $offVmEvent(uid) {
        var _this = this;

        var currentEvents = this.eventMapUid[uid] || [];
        currentEvents.forEach(function (event) {
          _this.$off(event);
        });
      }
    }, {
      key: "$off",
      value: function $off(eventName) {
        delete this.handles[eventName];
      }
    }]);

    return EventBus;
  }(); // 写成Vue插件形式，直接引入然后Vue.use($EventBus)进行使用


  var $EventBus = {};

  $EventBus.install = function (Vue, option) {
    window.$bus = Vue.prototype.$bus = new EventBus(Vue);
    Vue.mixin({
      beforeDestroy: function beforeDestroy() {
        // 拦截beforeDestroy钩子自动销毁自身所有订阅的事件
        this.$bus.$offVmEvent(this._uid);
      }
    });
  };

  return $EventBus;

}));
