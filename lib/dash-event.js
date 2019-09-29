/* * Copyright © 2019-2019 chenwenbin * Released under the MIT License. */
'use strict';

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

var dashEvent = {};
var cache = Object.create(null);
var cacheLowerCaseEvent = Object.create(null);
/**
 * Create a cached version of a pure function.
 */

function cached(fn) {
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}
/**
 * Hyphenate a camelCase string.
 */


var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase();
});

dashEvent.install = function (Vue) {
  var _emit = Vue.prototype.$emit;

  Vue.prototype.$emit = function () {
    var arg = Array.prototype.slice.call(arguments);
    var fnName = arg[0];
    var params = arg.splice(1);

    if (!cacheLowerCaseEvent[fnName] && (cache[fnName] || hyphenateRE.test(fnName))) {
      _emit.call.apply(_emit, [this, fnName].concat(_toConsumableArray(params)));

      _emit.call.apply(_emit, [this, hyphenate(fnName)].concat(_toConsumableArray(params)));
    } else {
      cacheLowerCaseEvent[fnName] = fnName;

      _emit.call.apply(_emit, [this, fnName].concat(_toConsumableArray(params)));
    }
  };
};

module.exports = dashEvent;
