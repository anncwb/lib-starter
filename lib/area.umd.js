/* * Copyright © 2019-2019 chenwenbin * Released under the MIT License. */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.area = factory());
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

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var lodash_find = createCommonjsModule(function (module, exports) {
  /**
   * lodash (Custom Build) <https://lodash.com/>
   * Build: `lodash modularize exports="npm" -o ./`
   * Copyright jQuery Foundation and other contributors <https://jquery.org/>
   * Released under MIT license <https://lodash.com/license>
   * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
   * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
   */

  /** Used as the size to enable large array optimizations. */
  var LARGE_ARRAY_SIZE = 200;

  /** Used as the `TypeError` message for "Functions" methods. */
  var FUNC_ERROR_TEXT = 'Expected a function';

  /** Used to stand-in for `undefined` hash values. */
  var HASH_UNDEFINED = '__lodash_hash_undefined__';

  /** Used to compose bitmasks for comparison styles. */
  var UNORDERED_COMPARE_FLAG = 1,
      PARTIAL_COMPARE_FLAG = 2;

  /** Used as references for various `Number` constants. */
  var INFINITY = 1 / 0,
      MAX_SAFE_INTEGER = 9007199254740991,
      MAX_INTEGER = 1.7976931348623157e+308,
      NAN = 0 / 0;

  /** `Object#toString` result references. */
  var argsTag = '[object Arguments]',
      arrayTag = '[object Array]',
      boolTag = '[object Boolean]',
      dateTag = '[object Date]',
      errorTag = '[object Error]',
      funcTag = '[object Function]',
      genTag = '[object GeneratorFunction]',
      mapTag = '[object Map]',
      numberTag = '[object Number]',
      objectTag = '[object Object]',
      promiseTag = '[object Promise]',
      regexpTag = '[object RegExp]',
      setTag = '[object Set]',
      stringTag = '[object String]',
      symbolTag = '[object Symbol]',
      weakMapTag = '[object WeakMap]';

  var arrayBufferTag = '[object ArrayBuffer]',
      dataViewTag = '[object DataView]',
      float32Tag = '[object Float32Array]',
      float64Tag = '[object Float64Array]',
      int8Tag = '[object Int8Array]',
      int16Tag = '[object Int16Array]',
      int32Tag = '[object Int32Array]',
      uint8Tag = '[object Uint8Array]',
      uint8ClampedTag = '[object Uint8ClampedArray]',
      uint16Tag = '[object Uint16Array]',
      uint32Tag = '[object Uint32Array]';

  /** Used to match property names within property paths. */
  var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
      reIsPlainProp = /^\w*$/,
      reLeadingDot = /^\./,
      rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

  /**
   * Used to match `RegExp`
   * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
   */
  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

  /** Used to match leading and trailing whitespace. */
  var reTrim = /^\s+|\s+$/g;

  /** Used to match backslashes in property paths. */
  var reEscapeChar = /\\(\\)?/g;

  /** Used to detect bad signed hexadecimal string values. */
  var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

  /** Used to detect binary string values. */
  var reIsBinary = /^0b[01]+$/i;

  /** Used to detect host constructors (Safari). */
  var reIsHostCtor = /^\[object .+?Constructor\]$/;

  /** Used to detect octal string values. */
  var reIsOctal = /^0o[0-7]+$/i;

  /** Used to detect unsigned integer values. */
  var reIsUint = /^(?:0|[1-9]\d*)$/;

  /** Used to identify `toStringTag` values of typed arrays. */
  var typedArrayTags = {};
  typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
  typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
  typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
  typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
  typedArrayTags[uint32Tag] = true;
  typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
  typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
  typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
  typedArrayTags[errorTag] = typedArrayTags[funcTag] =
  typedArrayTags[mapTag] = typedArrayTags[numberTag] =
  typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
  typedArrayTags[setTag] = typedArrayTags[stringTag] =
  typedArrayTags[weakMapTag] = false;

  /** Built-in method references without a dependency on `root`. */
  var freeParseInt = parseInt;

  /** Detect free variable `global` from Node.js. */
  var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

  /** Detect free variable `self`. */
  var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

  /** Used as a reference to the global object. */
  var root = freeGlobal || freeSelf || Function('return this')();

  /** Detect free variable `exports`. */
  var freeExports =  exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports = freeModule && freeModule.exports === freeExports;

  /** Detect free variable `process` from Node.js. */
  var freeProcess = moduleExports && freeGlobal.process;

  /** Used to access faster Node.js helpers. */
  var nodeUtil = (function() {
    try {
      return freeProcess && freeProcess.binding('util');
    } catch (e) {}
  }());

  /* Node.js helper references. */
  var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

  /**
   * A specialized version of `_.some` for arrays without support for iteratee
   * shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {boolean} Returns `true` if any element passes the predicate check,
   *  else `false`.
   */
  function arraySome(array, predicate) {
    var index = -1,
        length = array ? array.length : 0;

    while (++index < length) {
      if (predicate(array[index], index, array)) {
        return true;
      }
    }
    return false;
  }

  /**
   * The base implementation of `_.findIndex` and `_.findLastIndex` without
   * support for iteratee shorthands.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {Function} predicate The function invoked per iteration.
   * @param {number} fromIndex The index to search from.
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function baseFindIndex(array, predicate, fromIndex, fromRight) {
    var length = array.length,
        index = fromIndex + (fromRight ? 1 : -1);

    while ((fromRight ? index-- : ++index < length)) {
      if (predicate(array[index], index, array)) {
        return index;
      }
    }
    return -1;
  }

  /**
   * The base implementation of `_.property` without support for deep paths.
   *
   * @private
   * @param {string} key The key of the property to get.
   * @returns {Function} Returns the new accessor function.
   */
  function baseProperty(key) {
    return function(object) {
      return object == null ? undefined : object[key];
    };
  }

  /**
   * The base implementation of `_.times` without support for iteratee shorthands
   * or max array length checks.
   *
   * @private
   * @param {number} n The number of times to invoke `iteratee`.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the array of results.
   */
  function baseTimes(n, iteratee) {
    var index = -1,
        result = Array(n);

    while (++index < n) {
      result[index] = iteratee(index);
    }
    return result;
  }

  /**
   * The base implementation of `_.unary` without support for storing metadata.
   *
   * @private
   * @param {Function} func The function to cap arguments for.
   * @returns {Function} Returns the new capped function.
   */
  function baseUnary(func) {
    return function(value) {
      return func(value);
    };
  }

  /**
   * Gets the value at `key` of `object`.
   *
   * @private
   * @param {Object} [object] The object to query.
   * @param {string} key The key of the property to get.
   * @returns {*} Returns the property value.
   */
  function getValue(object, key) {
    return object == null ? undefined : object[key];
  }

  /**
   * Checks if `value` is a host object in IE < 9.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
   */
  function isHostObject(value) {
    // Many host objects are `Object` objects that can coerce to strings
    // despite having improperly defined `toString` methods.
    var result = false;
    if (value != null && typeof value.toString != 'function') {
      try {
        result = !!(value + '');
      } catch (e) {}
    }
    return result;
  }

  /**
   * Converts `map` to its key-value pairs.
   *
   * @private
   * @param {Object} map The map to convert.
   * @returns {Array} Returns the key-value pairs.
   */
  function mapToArray(map) {
    var index = -1,
        result = Array(map.size);

    map.forEach(function(value, key) {
      result[++index] = [key, value];
    });
    return result;
  }

  /**
   * Creates a unary function that invokes `func` with its argument transformed.
   *
   * @private
   * @param {Function} func The function to wrap.
   * @param {Function} transform The argument transform.
   * @returns {Function} Returns the new function.
   */
  function overArg(func, transform) {
    return function(arg) {
      return func(transform(arg));
    };
  }

  /**
   * Converts `set` to an array of its values.
   *
   * @private
   * @param {Object} set The set to convert.
   * @returns {Array} Returns the values.
   */
  function setToArray(set) {
    var index = -1,
        result = Array(set.size);

    set.forEach(function(value) {
      result[++index] = value;
    });
    return result;
  }

  /** Used for built-in method references. */
  var arrayProto = Array.prototype,
      funcProto = Function.prototype,
      objectProto = Object.prototype;

  /** Used to detect overreaching core-js shims. */
  var coreJsData = root['__core-js_shared__'];

  /** Used to detect methods masquerading as native. */
  var maskSrcKey = (function() {
    var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
    return uid ? ('Symbol(src)_1.' + uid) : '';
  }());

  /** Used to resolve the decompiled source of functions. */
  var funcToString = funcProto.toString;

  /** Used to check objects for own properties. */
  var hasOwnProperty = objectProto.hasOwnProperty;

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */
  var objectToString = objectProto.toString;

  /** Used to detect if a method is native. */
  var reIsNative = RegExp('^' +
    funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
    .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
  );

  /** Built-in value references. */
  var Symbol = root.Symbol,
      Uint8Array = root.Uint8Array,
      propertyIsEnumerable = objectProto.propertyIsEnumerable,
      splice = arrayProto.splice;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeKeys = overArg(Object.keys, Object),
      nativeMax = Math.max;

  /* Built-in method references that are verified to be native. */
  var DataView = getNative(root, 'DataView'),
      Map = getNative(root, 'Map'),
      Promise = getNative(root, 'Promise'),
      Set = getNative(root, 'Set'),
      WeakMap = getNative(root, 'WeakMap'),
      nativeCreate = getNative(Object, 'create');

  /** Used to detect maps, sets, and weakmaps. */
  var dataViewCtorString = toSource(DataView),
      mapCtorString = toSource(Map),
      promiseCtorString = toSource(Promise),
      setCtorString = toSource(Set),
      weakMapCtorString = toSource(WeakMap);

  /** Used to convert symbols to primitives and strings. */
  var symbolProto = Symbol ? Symbol.prototype : undefined,
      symbolValueOf = symbolProto ? symbolProto.valueOf : undefined,
      symbolToString = symbolProto ? symbolProto.toString : undefined;

  /**
   * Creates a hash object.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function Hash(entries) {
    var index = -1,
        length = entries ? entries.length : 0;

    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }

  /**
   * Removes all key-value entries from the hash.
   *
   * @private
   * @name clear
   * @memberOf Hash
   */
  function hashClear() {
    this.__data__ = nativeCreate ? nativeCreate(null) : {};
  }

  /**
   * Removes `key` and its value from the hash.
   *
   * @private
   * @name delete
   * @memberOf Hash
   * @param {Object} hash The hash to modify.
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function hashDelete(key) {
    return this.has(key) && delete this.__data__[key];
  }

  /**
   * Gets the hash value for `key`.
   *
   * @private
   * @name get
   * @memberOf Hash
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function hashGet(key) {
    var data = this.__data__;
    if (nativeCreate) {
      var result = data[key];
      return result === HASH_UNDEFINED ? undefined : result;
    }
    return hasOwnProperty.call(data, key) ? data[key] : undefined;
  }

  /**
   * Checks if a hash value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf Hash
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function hashHas(key) {
    var data = this.__data__;
    return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
  }

  /**
   * Sets the hash `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf Hash
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the hash instance.
   */
  function hashSet(key, value) {
    var data = this.__data__;
    data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
    return this;
  }

  // Add methods to `Hash`.
  Hash.prototype.clear = hashClear;
  Hash.prototype['delete'] = hashDelete;
  Hash.prototype.get = hashGet;
  Hash.prototype.has = hashHas;
  Hash.prototype.set = hashSet;

  /**
   * Creates an list cache object.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function ListCache(entries) {
    var index = -1,
        length = entries ? entries.length : 0;

    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }

  /**
   * Removes all key-value entries from the list cache.
   *
   * @private
   * @name clear
   * @memberOf ListCache
   */
  function listCacheClear() {
    this.__data__ = [];
  }

  /**
   * Removes `key` and its value from the list cache.
   *
   * @private
   * @name delete
   * @memberOf ListCache
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function listCacheDelete(key) {
    var data = this.__data__,
        index = assocIndexOf(data, key);

    if (index < 0) {
      return false;
    }
    var lastIndex = data.length - 1;
    if (index == lastIndex) {
      data.pop();
    } else {
      splice.call(data, index, 1);
    }
    return true;
  }

  /**
   * Gets the list cache value for `key`.
   *
   * @private
   * @name get
   * @memberOf ListCache
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function listCacheGet(key) {
    var data = this.__data__,
        index = assocIndexOf(data, key);

    return index < 0 ? undefined : data[index][1];
  }

  /**
   * Checks if a list cache value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf ListCache
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function listCacheHas(key) {
    return assocIndexOf(this.__data__, key) > -1;
  }

  /**
   * Sets the list cache `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf ListCache
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the list cache instance.
   */
  function listCacheSet(key, value) {
    var data = this.__data__,
        index = assocIndexOf(data, key);

    if (index < 0) {
      data.push([key, value]);
    } else {
      data[index][1] = value;
    }
    return this;
  }

  // Add methods to `ListCache`.
  ListCache.prototype.clear = listCacheClear;
  ListCache.prototype['delete'] = listCacheDelete;
  ListCache.prototype.get = listCacheGet;
  ListCache.prototype.has = listCacheHas;
  ListCache.prototype.set = listCacheSet;

  /**
   * Creates a map cache object to store key-value pairs.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function MapCache(entries) {
    var index = -1,
        length = entries ? entries.length : 0;

    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }

  /**
   * Removes all key-value entries from the map.
   *
   * @private
   * @name clear
   * @memberOf MapCache
   */
  function mapCacheClear() {
    this.__data__ = {
      'hash': new Hash,
      'map': new (Map || ListCache),
      'string': new Hash
    };
  }

  /**
   * Removes `key` and its value from the map.
   *
   * @private
   * @name delete
   * @memberOf MapCache
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function mapCacheDelete(key) {
    return getMapData(this, key)['delete'](key);
  }

  /**
   * Gets the map value for `key`.
   *
   * @private
   * @name get
   * @memberOf MapCache
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function mapCacheGet(key) {
    return getMapData(this, key).get(key);
  }

  /**
   * Checks if a map value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf MapCache
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function mapCacheHas(key) {
    return getMapData(this, key).has(key);
  }

  /**
   * Sets the map `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf MapCache
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the map cache instance.
   */
  function mapCacheSet(key, value) {
    getMapData(this, key).set(key, value);
    return this;
  }

  // Add methods to `MapCache`.
  MapCache.prototype.clear = mapCacheClear;
  MapCache.prototype['delete'] = mapCacheDelete;
  MapCache.prototype.get = mapCacheGet;
  MapCache.prototype.has = mapCacheHas;
  MapCache.prototype.set = mapCacheSet;

  /**
   *
   * Creates an array cache object to store unique values.
   *
   * @private
   * @constructor
   * @param {Array} [values] The values to cache.
   */
  function SetCache(values) {
    var index = -1,
        length = values ? values.length : 0;

    this.__data__ = new MapCache;
    while (++index < length) {
      this.add(values[index]);
    }
  }

  /**
   * Adds `value` to the array cache.
   *
   * @private
   * @name add
   * @memberOf SetCache
   * @alias push
   * @param {*} value The value to cache.
   * @returns {Object} Returns the cache instance.
   */
  function setCacheAdd(value) {
    this.__data__.set(value, HASH_UNDEFINED);
    return this;
  }

  /**
   * Checks if `value` is in the array cache.
   *
   * @private
   * @name has
   * @memberOf SetCache
   * @param {*} value The value to search for.
   * @returns {number} Returns `true` if `value` is found, else `false`.
   */
  function setCacheHas(value) {
    return this.__data__.has(value);
  }

  // Add methods to `SetCache`.
  SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
  SetCache.prototype.has = setCacheHas;

  /**
   * Creates a stack cache object to store key-value pairs.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function Stack(entries) {
    this.__data__ = new ListCache(entries);
  }

  /**
   * Removes all key-value entries from the stack.
   *
   * @private
   * @name clear
   * @memberOf Stack
   */
  function stackClear() {
    this.__data__ = new ListCache;
  }

  /**
   * Removes `key` and its value from the stack.
   *
   * @private
   * @name delete
   * @memberOf Stack
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function stackDelete(key) {
    return this.__data__['delete'](key);
  }

  /**
   * Gets the stack value for `key`.
   *
   * @private
   * @name get
   * @memberOf Stack
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function stackGet(key) {
    return this.__data__.get(key);
  }

  /**
   * Checks if a stack value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf Stack
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function stackHas(key) {
    return this.__data__.has(key);
  }

  /**
   * Sets the stack `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf Stack
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the stack cache instance.
   */
  function stackSet(key, value) {
    var cache = this.__data__;
    if (cache instanceof ListCache) {
      var pairs = cache.__data__;
      if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
        pairs.push([key, value]);
        return this;
      }
      cache = this.__data__ = new MapCache(pairs);
    }
    cache.set(key, value);
    return this;
  }

  // Add methods to `Stack`.
  Stack.prototype.clear = stackClear;
  Stack.prototype['delete'] = stackDelete;
  Stack.prototype.get = stackGet;
  Stack.prototype.has = stackHas;
  Stack.prototype.set = stackSet;

  /**
   * Creates an array of the enumerable property names of the array-like `value`.
   *
   * @private
   * @param {*} value The value to query.
   * @param {boolean} inherited Specify returning inherited property names.
   * @returns {Array} Returns the array of property names.
   */
  function arrayLikeKeys(value, inherited) {
    // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
    // Safari 9 makes `arguments.length` enumerable in strict mode.
    var result = (isArray(value) || isArguments(value))
      ? baseTimes(value.length, String)
      : [];

    var length = result.length,
        skipIndexes = !!length;

    for (var key in value) {
      if ((inherited || hasOwnProperty.call(value, key)) &&
          !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
        result.push(key);
      }
    }
    return result;
  }

  /**
   * Gets the index at which the `key` is found in `array` of key-value pairs.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} key The key to search for.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function assocIndexOf(array, key) {
    var length = array.length;
    while (length--) {
      if (eq(array[length][0], key)) {
        return length;
      }
    }
    return -1;
  }

  /**
   * The base implementation of `_.get` without support for default values.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Array|string} path The path of the property to get.
   * @returns {*} Returns the resolved value.
   */
  function baseGet(object, path) {
    path = isKey(path, object) ? [path] : castPath(path);

    var index = 0,
        length = path.length;

    while (object != null && index < length) {
      object = object[toKey(path[index++])];
    }
    return (index && index == length) ? object : undefined;
  }

  /**
   * The base implementation of `getTag`.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the `toStringTag`.
   */
  function baseGetTag(value) {
    return objectToString.call(value);
  }

  /**
   * The base implementation of `_.hasIn` without support for deep paths.
   *
   * @private
   * @param {Object} [object] The object to query.
   * @param {Array|string} key The key to check.
   * @returns {boolean} Returns `true` if `key` exists, else `false`.
   */
  function baseHasIn(object, key) {
    return object != null && key in Object(object);
  }

  /**
   * The base implementation of `_.isEqual` which supports partial comparisons
   * and tracks traversed objects.
   *
   * @private
   * @param {*} value The value to compare.
   * @param {*} other The other value to compare.
   * @param {Function} [customizer] The function to customize comparisons.
   * @param {boolean} [bitmask] The bitmask of comparison flags.
   *  The bitmask may be composed of the following flags:
   *     1 - Unordered comparison
   *     2 - Partial comparison
   * @param {Object} [stack] Tracks traversed `value` and `other` objects.
   * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
   */
  function baseIsEqual(value, other, customizer, bitmask, stack) {
    if (value === other) {
      return true;
    }
    if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
      return value !== value && other !== other;
    }
    return baseIsEqualDeep(value, other, baseIsEqual, customizer, bitmask, stack);
  }

  /**
   * A specialized version of `baseIsEqual` for arrays and objects which performs
   * deep comparisons and tracks traversed objects enabling objects with circular
   * references to be compared.
   *
   * @private
   * @param {Object} object The object to compare.
   * @param {Object} other The other object to compare.
   * @param {Function} equalFunc The function to determine equivalents of values.
   * @param {Function} [customizer] The function to customize comparisons.
   * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual`
   *  for more details.
   * @param {Object} [stack] Tracks traversed `object` and `other` objects.
   * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
   */
  function baseIsEqualDeep(object, other, equalFunc, customizer, bitmask, stack) {
    var objIsArr = isArray(object),
        othIsArr = isArray(other),
        objTag = arrayTag,
        othTag = arrayTag;

    if (!objIsArr) {
      objTag = getTag(object);
      objTag = objTag == argsTag ? objectTag : objTag;
    }
    if (!othIsArr) {
      othTag = getTag(other);
      othTag = othTag == argsTag ? objectTag : othTag;
    }
    var objIsObj = objTag == objectTag && !isHostObject(object),
        othIsObj = othTag == objectTag && !isHostObject(other),
        isSameTag = objTag == othTag;

    if (isSameTag && !objIsObj) {
      stack || (stack = new Stack);
      return (objIsArr || isTypedArray(object))
        ? equalArrays(object, other, equalFunc, customizer, bitmask, stack)
        : equalByTag(object, other, objTag, equalFunc, customizer, bitmask, stack);
    }
    if (!(bitmask & PARTIAL_COMPARE_FLAG)) {
      var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
          othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

      if (objIsWrapped || othIsWrapped) {
        var objUnwrapped = objIsWrapped ? object.value() : object,
            othUnwrapped = othIsWrapped ? other.value() : other;

        stack || (stack = new Stack);
        return equalFunc(objUnwrapped, othUnwrapped, customizer, bitmask, stack);
      }
    }
    if (!isSameTag) {
      return false;
    }
    stack || (stack = new Stack);
    return equalObjects(object, other, equalFunc, customizer, bitmask, stack);
  }

  /**
   * The base implementation of `_.isMatch` without support for iteratee shorthands.
   *
   * @private
   * @param {Object} object The object to inspect.
   * @param {Object} source The object of property values to match.
   * @param {Array} matchData The property names, values, and compare flags to match.
   * @param {Function} [customizer] The function to customize comparisons.
   * @returns {boolean} Returns `true` if `object` is a match, else `false`.
   */
  function baseIsMatch(object, source, matchData, customizer) {
    var index = matchData.length,
        length = index,
        noCustomizer = !customizer;

    if (object == null) {
      return !length;
    }
    object = Object(object);
    while (index--) {
      var data = matchData[index];
      if ((noCustomizer && data[2])
            ? data[1] !== object[data[0]]
            : !(data[0] in object)
          ) {
        return false;
      }
    }
    while (++index < length) {
      data = matchData[index];
      var key = data[0],
          objValue = object[key],
          srcValue = data[1];

      if (noCustomizer && data[2]) {
        if (objValue === undefined && !(key in object)) {
          return false;
        }
      } else {
        var stack = new Stack;
        if (customizer) {
          var result = customizer(objValue, srcValue, key, object, source, stack);
        }
        if (!(result === undefined
              ? baseIsEqual(srcValue, objValue, customizer, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG, stack)
              : result
            )) {
          return false;
        }
      }
    }
    return true;
  }

  /**
   * The base implementation of `_.isNative` without bad shim checks.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a native function,
   *  else `false`.
   */
  function baseIsNative(value) {
    if (!isObject(value) || isMasked(value)) {
      return false;
    }
    var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
    return pattern.test(toSource(value));
  }

  /**
   * The base implementation of `_.isTypedArray` without Node.js optimizations.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
   */
  function baseIsTypedArray(value) {
    return isObjectLike(value) &&
      isLength(value.length) && !!typedArrayTags[objectToString.call(value)];
  }

  /**
   * The base implementation of `_.iteratee`.
   *
   * @private
   * @param {*} [value=_.identity] The value to convert to an iteratee.
   * @returns {Function} Returns the iteratee.
   */
  function baseIteratee(value) {
    // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
    // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
    if (typeof value == 'function') {
      return value;
    }
    if (value == null) {
      return identity;
    }
    if (typeof value == 'object') {
      return isArray(value)
        ? baseMatchesProperty(value[0], value[1])
        : baseMatches(value);
    }
    return property(value);
  }

  /**
   * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   */
  function baseKeys(object) {
    if (!isPrototype(object)) {
      return nativeKeys(object);
    }
    var result = [];
    for (var key in Object(object)) {
      if (hasOwnProperty.call(object, key) && key != 'constructor') {
        result.push(key);
      }
    }
    return result;
  }

  /**
   * The base implementation of `_.matches` which doesn't clone `source`.
   *
   * @private
   * @param {Object} source The object of property values to match.
   * @returns {Function} Returns the new spec function.
   */
  function baseMatches(source) {
    var matchData = getMatchData(source);
    if (matchData.length == 1 && matchData[0][2]) {
      return matchesStrictComparable(matchData[0][0], matchData[0][1]);
    }
    return function(object) {
      return object === source || baseIsMatch(object, source, matchData);
    };
  }

  /**
   * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
   *
   * @private
   * @param {string} path The path of the property to get.
   * @param {*} srcValue The value to match.
   * @returns {Function} Returns the new spec function.
   */
  function baseMatchesProperty(path, srcValue) {
    if (isKey(path) && isStrictComparable(srcValue)) {
      return matchesStrictComparable(toKey(path), srcValue);
    }
    return function(object) {
      var objValue = get(object, path);
      return (objValue === undefined && objValue === srcValue)
        ? hasIn(object, path)
        : baseIsEqual(srcValue, objValue, undefined, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG);
    };
  }

  /**
   * A specialized version of `baseProperty` which supports deep paths.
   *
   * @private
   * @param {Array|string} path The path of the property to get.
   * @returns {Function} Returns the new accessor function.
   */
  function basePropertyDeep(path) {
    return function(object) {
      return baseGet(object, path);
    };
  }

  /**
   * The base implementation of `_.toString` which doesn't convert nullish
   * values to empty strings.
   *
   * @private
   * @param {*} value The value to process.
   * @returns {string} Returns the string.
   */
  function baseToString(value) {
    // Exit early for strings to avoid a performance hit in some environments.
    if (typeof value == 'string') {
      return value;
    }
    if (isSymbol(value)) {
      return symbolToString ? symbolToString.call(value) : '';
    }
    var result = (value + '');
    return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
  }

  /**
   * Casts `value` to a path array if it's not one.
   *
   * @private
   * @param {*} value The value to inspect.
   * @returns {Array} Returns the cast property path array.
   */
  function castPath(value) {
    return isArray(value) ? value : stringToPath(value);
  }

  /**
   * Creates a `_.find` or `_.findLast` function.
   *
   * @private
   * @param {Function} findIndexFunc The function to find the collection index.
   * @returns {Function} Returns the new find function.
   */
  function createFind(findIndexFunc) {
    return function(collection, predicate, fromIndex) {
      var iterable = Object(collection);
      if (!isArrayLike(collection)) {
        var iteratee = baseIteratee(predicate);
        collection = keys(collection);
        predicate = function(key) { return iteratee(iterable[key], key, iterable); };
      }
      var index = findIndexFunc(collection, predicate, fromIndex);
      return index > -1 ? iterable[iteratee ? collection[index] : index] : undefined;
    };
  }

  /**
   * A specialized version of `baseIsEqualDeep` for arrays with support for
   * partial deep comparisons.
   *
   * @private
   * @param {Array} array The array to compare.
   * @param {Array} other The other array to compare.
   * @param {Function} equalFunc The function to determine equivalents of values.
   * @param {Function} customizer The function to customize comparisons.
   * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
   *  for more details.
   * @param {Object} stack Tracks traversed `array` and `other` objects.
   * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
   */
  function equalArrays(array, other, equalFunc, customizer, bitmask, stack) {
    var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
        arrLength = array.length,
        othLength = other.length;

    if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
      return false;
    }
    // Assume cyclic values are equal.
    var stacked = stack.get(array);
    if (stacked && stack.get(other)) {
      return stacked == other;
    }
    var index = -1,
        result = true,
        seen = (bitmask & UNORDERED_COMPARE_FLAG) ? new SetCache : undefined;

    stack.set(array, other);
    stack.set(other, array);

    // Ignore non-index properties.
    while (++index < arrLength) {
      var arrValue = array[index],
          othValue = other[index];

      if (customizer) {
        var compared = isPartial
          ? customizer(othValue, arrValue, index, other, array, stack)
          : customizer(arrValue, othValue, index, array, other, stack);
      }
      if (compared !== undefined) {
        if (compared) {
          continue;
        }
        result = false;
        break;
      }
      // Recursively compare arrays (susceptible to call stack limits).
      if (seen) {
        if (!arraySome(other, function(othValue, othIndex) {
              if (!seen.has(othIndex) &&
                  (arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack))) {
                return seen.add(othIndex);
              }
            })) {
          result = false;
          break;
        }
      } else if (!(
            arrValue === othValue ||
              equalFunc(arrValue, othValue, customizer, bitmask, stack)
          )) {
        result = false;
        break;
      }
    }
    stack['delete'](array);
    stack['delete'](other);
    return result;
  }

  /**
   * A specialized version of `baseIsEqualDeep` for comparing objects of
   * the same `toStringTag`.
   *
   * **Note:** This function only supports comparing values with tags of
   * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
   *
   * @private
   * @param {Object} object The object to compare.
   * @param {Object} other The other object to compare.
   * @param {string} tag The `toStringTag` of the objects to compare.
   * @param {Function} equalFunc The function to determine equivalents of values.
   * @param {Function} customizer The function to customize comparisons.
   * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
   *  for more details.
   * @param {Object} stack Tracks traversed `object` and `other` objects.
   * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
   */
  function equalByTag(object, other, tag, equalFunc, customizer, bitmask, stack) {
    switch (tag) {
      case dataViewTag:
        if ((object.byteLength != other.byteLength) ||
            (object.byteOffset != other.byteOffset)) {
          return false;
        }
        object = object.buffer;
        other = other.buffer;

      case arrayBufferTag:
        if ((object.byteLength != other.byteLength) ||
            !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
          return false;
        }
        return true;

      case boolTag:
      case dateTag:
      case numberTag:
        // Coerce booleans to `1` or `0` and dates to milliseconds.
        // Invalid dates are coerced to `NaN`.
        return eq(+object, +other);

      case errorTag:
        return object.name == other.name && object.message == other.message;

      case regexpTag:
      case stringTag:
        // Coerce regexes to strings and treat strings, primitives and objects,
        // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
        // for more details.
        return object == (other + '');

      case mapTag:
        var convert = mapToArray;

      case setTag:
        var isPartial = bitmask & PARTIAL_COMPARE_FLAG;
        convert || (convert = setToArray);

        if (object.size != other.size && !isPartial) {
          return false;
        }
        // Assume cyclic values are equal.
        var stacked = stack.get(object);
        if (stacked) {
          return stacked == other;
        }
        bitmask |= UNORDERED_COMPARE_FLAG;

        // Recursively compare objects (susceptible to call stack limits).
        stack.set(object, other);
        var result = equalArrays(convert(object), convert(other), equalFunc, customizer, bitmask, stack);
        stack['delete'](object);
        return result;

      case symbolTag:
        if (symbolValueOf) {
          return symbolValueOf.call(object) == symbolValueOf.call(other);
        }
    }
    return false;
  }

  /**
   * A specialized version of `baseIsEqualDeep` for objects with support for
   * partial deep comparisons.
   *
   * @private
   * @param {Object} object The object to compare.
   * @param {Object} other The other object to compare.
   * @param {Function} equalFunc The function to determine equivalents of values.
   * @param {Function} customizer The function to customize comparisons.
   * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
   *  for more details.
   * @param {Object} stack Tracks traversed `object` and `other` objects.
   * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
   */
  function equalObjects(object, other, equalFunc, customizer, bitmask, stack) {
    var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
        objProps = keys(object),
        objLength = objProps.length,
        othProps = keys(other),
        othLength = othProps.length;

    if (objLength != othLength && !isPartial) {
      return false;
    }
    var index = objLength;
    while (index--) {
      var key = objProps[index];
      if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
        return false;
      }
    }
    // Assume cyclic values are equal.
    var stacked = stack.get(object);
    if (stacked && stack.get(other)) {
      return stacked == other;
    }
    var result = true;
    stack.set(object, other);
    stack.set(other, object);

    var skipCtor = isPartial;
    while (++index < objLength) {
      key = objProps[index];
      var objValue = object[key],
          othValue = other[key];

      if (customizer) {
        var compared = isPartial
          ? customizer(othValue, objValue, key, other, object, stack)
          : customizer(objValue, othValue, key, object, other, stack);
      }
      // Recursively compare objects (susceptible to call stack limits).
      if (!(compared === undefined
            ? (objValue === othValue || equalFunc(objValue, othValue, customizer, bitmask, stack))
            : compared
          )) {
        result = false;
        break;
      }
      skipCtor || (skipCtor = key == 'constructor');
    }
    if (result && !skipCtor) {
      var objCtor = object.constructor,
          othCtor = other.constructor;

      // Non `Object` object instances with different constructors are not equal.
      if (objCtor != othCtor &&
          ('constructor' in object && 'constructor' in other) &&
          !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
            typeof othCtor == 'function' && othCtor instanceof othCtor)) {
        result = false;
      }
    }
    stack['delete'](object);
    stack['delete'](other);
    return result;
  }

  /**
   * Gets the data for `map`.
   *
   * @private
   * @param {Object} map The map to query.
   * @param {string} key The reference key.
   * @returns {*} Returns the map data.
   */
  function getMapData(map, key) {
    var data = map.__data__;
    return isKeyable(key)
      ? data[typeof key == 'string' ? 'string' : 'hash']
      : data.map;
  }

  /**
   * Gets the property names, values, and compare flags of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the match data of `object`.
   */
  function getMatchData(object) {
    var result = keys(object),
        length = result.length;

    while (length--) {
      var key = result[length],
          value = object[key];

      result[length] = [key, value, isStrictComparable(value)];
    }
    return result;
  }

  /**
   * Gets the native function at `key` of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {string} key The key of the method to get.
   * @returns {*} Returns the function if it's native, else `undefined`.
   */
  function getNative(object, key) {
    var value = getValue(object, key);
    return baseIsNative(value) ? value : undefined;
  }

  /**
   * Gets the `toStringTag` of `value`.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the `toStringTag`.
   */
  var getTag = baseGetTag;

  // Fallback for data views, maps, sets, and weak maps in IE 11,
  // for data views in Edge < 14, and promises in Node.js.
  if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
      (Map && getTag(new Map) != mapTag) ||
      (Promise && getTag(Promise.resolve()) != promiseTag) ||
      (Set && getTag(new Set) != setTag) ||
      (WeakMap && getTag(new WeakMap) != weakMapTag)) {
    getTag = function(value) {
      var result = objectToString.call(value),
          Ctor = result == objectTag ? value.constructor : undefined,
          ctorString = Ctor ? toSource(Ctor) : undefined;

      if (ctorString) {
        switch (ctorString) {
          case dataViewCtorString: return dataViewTag;
          case mapCtorString: return mapTag;
          case promiseCtorString: return promiseTag;
          case setCtorString: return setTag;
          case weakMapCtorString: return weakMapTag;
        }
      }
      return result;
    };
  }

  /**
   * Checks if `path` exists on `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Array|string} path The path to check.
   * @param {Function} hasFunc The function to check properties.
   * @returns {boolean} Returns `true` if `path` exists, else `false`.
   */
  function hasPath(object, path, hasFunc) {
    path = isKey(path, object) ? [path] : castPath(path);

    var result,
        index = -1,
        length = path.length;

    while (++index < length) {
      var key = toKey(path[index]);
      if (!(result = object != null && hasFunc(object, key))) {
        break;
      }
      object = object[key];
    }
    if (result) {
      return result;
    }
    var length = object ? object.length : 0;
    return !!length && isLength(length) && isIndex(key, length) &&
      (isArray(object) || isArguments(object));
  }

  /**
   * Checks if `value` is a valid array-like index.
   *
   * @private
   * @param {*} value The value to check.
   * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
   * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
   */
  function isIndex(value, length) {
    length = length == null ? MAX_SAFE_INTEGER : length;
    return !!length &&
      (typeof value == 'number' || reIsUint.test(value)) &&
      (value > -1 && value % 1 == 0 && value < length);
  }

  /**
   * Checks if `value` is a property name and not a property path.
   *
   * @private
   * @param {*} value The value to check.
   * @param {Object} [object] The object to query keys on.
   * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
   */
  function isKey(value, object) {
    if (isArray(value)) {
      return false;
    }
    var type = typeof value;
    if (type == 'number' || type == 'symbol' || type == 'boolean' ||
        value == null || isSymbol(value)) {
      return true;
    }
    return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
      (object != null && value in Object(object));
  }

  /**
   * Checks if `value` is suitable for use as unique object key.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
   */
  function isKeyable(value) {
    var type = typeof value;
    return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
      ? (value !== '__proto__')
      : (value === null);
  }

  /**
   * Checks if `func` has its source masked.
   *
   * @private
   * @param {Function} func The function to check.
   * @returns {boolean} Returns `true` if `func` is masked, else `false`.
   */
  function isMasked(func) {
    return !!maskSrcKey && (maskSrcKey in func);
  }

  /**
   * Checks if `value` is likely a prototype object.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
   */
  function isPrototype(value) {
    var Ctor = value && value.constructor,
        proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

    return value === proto;
  }

  /**
   * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` if suitable for strict
   *  equality comparisons, else `false`.
   */
  function isStrictComparable(value) {
    return value === value && !isObject(value);
  }

  /**
   * A specialized version of `matchesProperty` for source values suitable
   * for strict equality comparisons, i.e. `===`.
   *
   * @private
   * @param {string} key The key of the property to get.
   * @param {*} srcValue The value to match.
   * @returns {Function} Returns the new spec function.
   */
  function matchesStrictComparable(key, srcValue) {
    return function(object) {
      if (object == null) {
        return false;
      }
      return object[key] === srcValue &&
        (srcValue !== undefined || (key in Object(object)));
    };
  }

  /**
   * Converts `string` to a property path array.
   *
   * @private
   * @param {string} string The string to convert.
   * @returns {Array} Returns the property path array.
   */
  var stringToPath = memoize(function(string) {
    string = toString(string);

    var result = [];
    if (reLeadingDot.test(string)) {
      result.push('');
    }
    string.replace(rePropName, function(match, number, quote, string) {
      result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
    });
    return result;
  });

  /**
   * Converts `value` to a string key if it's not a string or symbol.
   *
   * @private
   * @param {*} value The value to inspect.
   * @returns {string|symbol} Returns the key.
   */
  function toKey(value) {
    if (typeof value == 'string' || isSymbol(value)) {
      return value;
    }
    var result = (value + '');
    return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
  }

  /**
   * Converts `func` to its source code.
   *
   * @private
   * @param {Function} func The function to process.
   * @returns {string} Returns the source code.
   */
  function toSource(func) {
    if (func != null) {
      try {
        return funcToString.call(func);
      } catch (e) {}
      try {
        return (func + '');
      } catch (e) {}
    }
    return '';
  }

  /**
   * This method is like `_.find` except that it returns the index of the first
   * element `predicate` returns truthy for instead of the element itself.
   *
   * @static
   * @memberOf _
   * @since 1.1.0
   * @category Array
   * @param {Array} array The array to inspect.
   * @param {Function} [predicate=_.identity]
   *  The function invoked per iteration.
   * @param {number} [fromIndex=0] The index to search from.
   * @returns {number} Returns the index of the found element, else `-1`.
   * @example
   *
   * var users = [
   *   { 'user': 'barney',  'active': false },
   *   { 'user': 'fred',    'active': false },
   *   { 'user': 'pebbles', 'active': true }
   * ];
   *
   * _.findIndex(users, function(o) { return o.user == 'barney'; });
   * // => 0
   *
   * // The `_.matches` iteratee shorthand.
   * _.findIndex(users, { 'user': 'fred', 'active': false });
   * // => 1
   *
   * // The `_.matchesProperty` iteratee shorthand.
   * _.findIndex(users, ['active', false]);
   * // => 0
   *
   * // The `_.property` iteratee shorthand.
   * _.findIndex(users, 'active');
   * // => 2
   */
  function findIndex(array, predicate, fromIndex) {
    var length = array ? array.length : 0;
    if (!length) {
      return -1;
    }
    var index = fromIndex == null ? 0 : toInteger(fromIndex);
    if (index < 0) {
      index = nativeMax(length + index, 0);
    }
    return baseFindIndex(array, baseIteratee(predicate), index);
  }

  /**
   * Iterates over elements of `collection`, returning the first element
   * `predicate` returns truthy for. The predicate is invoked with three
   * arguments: (value, index|key, collection).
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Collection
   * @param {Array|Object} collection The collection to inspect.
   * @param {Function} [predicate=_.identity]
   *  The function invoked per iteration.
   * @param {number} [fromIndex=0] The index to search from.
   * @returns {*} Returns the matched element, else `undefined`.
   * @example
   *
   * var users = [
   *   { 'user': 'barney',  'age': 36, 'active': true },
   *   { 'user': 'fred',    'age': 40, 'active': false },
   *   { 'user': 'pebbles', 'age': 1,  'active': true }
   * ];
   *
   * _.find(users, function(o) { return o.age < 40; });
   * // => object for 'barney'
   *
   * // The `_.matches` iteratee shorthand.
   * _.find(users, { 'age': 1, 'active': true });
   * // => object for 'pebbles'
   *
   * // The `_.matchesProperty` iteratee shorthand.
   * _.find(users, ['active', false]);
   * // => object for 'fred'
   *
   * // The `_.property` iteratee shorthand.
   * _.find(users, 'active');
   * // => object for 'barney'
   */
  var find = createFind(findIndex);

  /**
   * Creates a function that memoizes the result of `func`. If `resolver` is
   * provided, it determines the cache key for storing the result based on the
   * arguments provided to the memoized function. By default, the first argument
   * provided to the memoized function is used as the map cache key. The `func`
   * is invoked with the `this` binding of the memoized function.
   *
   * **Note:** The cache is exposed as the `cache` property on the memoized
   * function. Its creation may be customized by replacing the `_.memoize.Cache`
   * constructor with one whose instances implement the
   * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
   * method interface of `delete`, `get`, `has`, and `set`.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Function
   * @param {Function} func The function to have its output memoized.
   * @param {Function} [resolver] The function to resolve the cache key.
   * @returns {Function} Returns the new memoized function.
   * @example
   *
   * var object = { 'a': 1, 'b': 2 };
   * var other = { 'c': 3, 'd': 4 };
   *
   * var values = _.memoize(_.values);
   * values(object);
   * // => [1, 2]
   *
   * values(other);
   * // => [3, 4]
   *
   * object.a = 2;
   * values(object);
   * // => [1, 2]
   *
   * // Modify the result cache.
   * values.cache.set(object, ['a', 'b']);
   * values(object);
   * // => ['a', 'b']
   *
   * // Replace `_.memoize.Cache`.
   * _.memoize.Cache = WeakMap;
   */
  function memoize(func, resolver) {
    if (typeof func != 'function' || (resolver && typeof resolver != 'function')) {
      throw new TypeError(FUNC_ERROR_TEXT);
    }
    var memoized = function() {
      var args = arguments,
          key = resolver ? resolver.apply(this, args) : args[0],
          cache = memoized.cache;

      if (cache.has(key)) {
        return cache.get(key);
      }
      var result = func.apply(this, args);
      memoized.cache = cache.set(key, result);
      return result;
    };
    memoized.cache = new (memoize.Cache || MapCache);
    return memoized;
  }

  // Assign cache to `_.memoize`.
  memoize.Cache = MapCache;

  /**
   * Performs a
   * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
   * comparison between two values to determine if they are equivalent.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to compare.
   * @param {*} other The other value to compare.
   * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
   * @example
   *
   * var object = { 'a': 1 };
   * var other = { 'a': 1 };
   *
   * _.eq(object, object);
   * // => true
   *
   * _.eq(object, other);
   * // => false
   *
   * _.eq('a', 'a');
   * // => true
   *
   * _.eq('a', Object('a'));
   * // => false
   *
   * _.eq(NaN, NaN);
   * // => true
   */
  function eq(value, other) {
    return value === other || (value !== value && other !== other);
  }

  /**
   * Checks if `value` is likely an `arguments` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an `arguments` object,
   *  else `false`.
   * @example
   *
   * _.isArguments(function() { return arguments; }());
   * // => true
   *
   * _.isArguments([1, 2, 3]);
   * // => false
   */
  function isArguments(value) {
    // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
    return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
      (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
  }

  /**
   * Checks if `value` is classified as an `Array` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an array, else `false`.
   * @example
   *
   * _.isArray([1, 2, 3]);
   * // => true
   *
   * _.isArray(document.body.children);
   * // => false
   *
   * _.isArray('abc');
   * // => false
   *
   * _.isArray(_.noop);
   * // => false
   */
  var isArray = Array.isArray;

  /**
   * Checks if `value` is array-like. A value is considered array-like if it's
   * not a function and has a `value.length` that's an integer greater than or
   * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
   * @example
   *
   * _.isArrayLike([1, 2, 3]);
   * // => true
   *
   * _.isArrayLike(document.body.children);
   * // => true
   *
   * _.isArrayLike('abc');
   * // => true
   *
   * _.isArrayLike(_.noop);
   * // => false
   */
  function isArrayLike(value) {
    return value != null && isLength(value.length) && !isFunction(value);
  }

  /**
   * This method is like `_.isArrayLike` except that it also checks if `value`
   * is an object.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an array-like object,
   *  else `false`.
   * @example
   *
   * _.isArrayLikeObject([1, 2, 3]);
   * // => true
   *
   * _.isArrayLikeObject(document.body.children);
   * // => true
   *
   * _.isArrayLikeObject('abc');
   * // => false
   *
   * _.isArrayLikeObject(_.noop);
   * // => false
   */
  function isArrayLikeObject(value) {
    return isObjectLike(value) && isArrayLike(value);
  }

  /**
   * Checks if `value` is classified as a `Function` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a function, else `false`.
   * @example
   *
   * _.isFunction(_);
   * // => true
   *
   * _.isFunction(/abc/);
   * // => false
   */
  function isFunction(value) {
    // The use of `Object#toString` avoids issues with the `typeof` operator
    // in Safari 8-9 which returns 'object' for typed array and other constructors.
    var tag = isObject(value) ? objectToString.call(value) : '';
    return tag == funcTag || tag == genTag;
  }

  /**
   * Checks if `value` is a valid array-like length.
   *
   * **Note:** This method is loosely based on
   * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
   * @example
   *
   * _.isLength(3);
   * // => true
   *
   * _.isLength(Number.MIN_VALUE);
   * // => false
   *
   * _.isLength(Infinity);
   * // => false
   *
   * _.isLength('3');
   * // => false
   */
  function isLength(value) {
    return typeof value == 'number' &&
      value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
  }

  /**
   * Checks if `value` is the
   * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
   * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an object, else `false`.
   * @example
   *
   * _.isObject({});
   * // => true
   *
   * _.isObject([1, 2, 3]);
   * // => true
   *
   * _.isObject(_.noop);
   * // => true
   *
   * _.isObject(null);
   * // => false
   */
  function isObject(value) {
    var type = typeof value;
    return !!value && (type == 'object' || type == 'function');
  }

  /**
   * Checks if `value` is object-like. A value is object-like if it's not `null`
   * and has a `typeof` result of "object".
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
   * @example
   *
   * _.isObjectLike({});
   * // => true
   *
   * _.isObjectLike([1, 2, 3]);
   * // => true
   *
   * _.isObjectLike(_.noop);
   * // => false
   *
   * _.isObjectLike(null);
   * // => false
   */
  function isObjectLike(value) {
    return !!value && typeof value == 'object';
  }

  /**
   * Checks if `value` is classified as a `Symbol` primitive or object.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
   * @example
   *
   * _.isSymbol(Symbol.iterator);
   * // => true
   *
   * _.isSymbol('abc');
   * // => false
   */
  function isSymbol(value) {
    return typeof value == 'symbol' ||
      (isObjectLike(value) && objectToString.call(value) == symbolTag);
  }

  /**
   * Checks if `value` is classified as a typed array.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
   * @example
   *
   * _.isTypedArray(new Uint8Array);
   * // => true
   *
   * _.isTypedArray([]);
   * // => false
   */
  var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

  /**
   * Converts `value` to a finite number.
   *
   * @static
   * @memberOf _
   * @since 4.12.0
   * @category Lang
   * @param {*} value The value to convert.
   * @returns {number} Returns the converted number.
   * @example
   *
   * _.toFinite(3.2);
   * // => 3.2
   *
   * _.toFinite(Number.MIN_VALUE);
   * // => 5e-324
   *
   * _.toFinite(Infinity);
   * // => 1.7976931348623157e+308
   *
   * _.toFinite('3.2');
   * // => 3.2
   */
  function toFinite(value) {
    if (!value) {
      return value === 0 ? value : 0;
    }
    value = toNumber(value);
    if (value === INFINITY || value === -INFINITY) {
      var sign = (value < 0 ? -1 : 1);
      return sign * MAX_INTEGER;
    }
    return value === value ? value : 0;
  }

  /**
   * Converts `value` to an integer.
   *
   * **Note:** This method is loosely based on
   * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to convert.
   * @returns {number} Returns the converted integer.
   * @example
   *
   * _.toInteger(3.2);
   * // => 3
   *
   * _.toInteger(Number.MIN_VALUE);
   * // => 0
   *
   * _.toInteger(Infinity);
   * // => 1.7976931348623157e+308
   *
   * _.toInteger('3.2');
   * // => 3
   */
  function toInteger(value) {
    var result = toFinite(value),
        remainder = result % 1;

    return result === result ? (remainder ? result - remainder : result) : 0;
  }

  /**
   * Converts `value` to a number.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to process.
   * @returns {number} Returns the number.
   * @example
   *
   * _.toNumber(3.2);
   * // => 3.2
   *
   * _.toNumber(Number.MIN_VALUE);
   * // => 5e-324
   *
   * _.toNumber(Infinity);
   * // => Infinity
   *
   * _.toNumber('3.2');
   * // => 3.2
   */
  function toNumber(value) {
    if (typeof value == 'number') {
      return value;
    }
    if (isSymbol(value)) {
      return NAN;
    }
    if (isObject(value)) {
      var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
      value = isObject(other) ? (other + '') : other;
    }
    if (typeof value != 'string') {
      return value === 0 ? value : +value;
    }
    value = value.replace(reTrim, '');
    var isBinary = reIsBinary.test(value);
    return (isBinary || reIsOctal.test(value))
      ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
      : (reIsBadHex.test(value) ? NAN : +value);
  }

  /**
   * Converts `value` to a string. An empty string is returned for `null`
   * and `undefined` values. The sign of `-0` is preserved.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to process.
   * @returns {string} Returns the string.
   * @example
   *
   * _.toString(null);
   * // => ''
   *
   * _.toString(-0);
   * // => '-0'
   *
   * _.toString([1, 2, 3]);
   * // => '1,2,3'
   */
  function toString(value) {
    return value == null ? '' : baseToString(value);
  }

  /**
   * Gets the value at `path` of `object`. If the resolved value is
   * `undefined`, the `defaultValue` is returned in its place.
   *
   * @static
   * @memberOf _
   * @since 3.7.0
   * @category Object
   * @param {Object} object The object to query.
   * @param {Array|string} path The path of the property to get.
   * @param {*} [defaultValue] The value returned for `undefined` resolved values.
   * @returns {*} Returns the resolved value.
   * @example
   *
   * var object = { 'a': [{ 'b': { 'c': 3 } }] };
   *
   * _.get(object, 'a[0].b.c');
   * // => 3
   *
   * _.get(object, ['a', '0', 'b', 'c']);
   * // => 3
   *
   * _.get(object, 'a.b.c', 'default');
   * // => 'default'
   */
  function get(object, path, defaultValue) {
    var result = object == null ? undefined : baseGet(object, path);
    return result === undefined ? defaultValue : result;
  }

  /**
   * Checks if `path` is a direct or inherited property of `object`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Object
   * @param {Object} object The object to query.
   * @param {Array|string} path The path to check.
   * @returns {boolean} Returns `true` if `path` exists, else `false`.
   * @example
   *
   * var object = _.create({ 'a': _.create({ 'b': 2 }) });
   *
   * _.hasIn(object, 'a');
   * // => true
   *
   * _.hasIn(object, 'a.b');
   * // => true
   *
   * _.hasIn(object, ['a', 'b']);
   * // => true
   *
   * _.hasIn(object, 'b');
   * // => false
   */
  function hasIn(object, path) {
    return object != null && hasPath(object, path, baseHasIn);
  }

  /**
   * Creates an array of the own enumerable property names of `object`.
   *
   * **Note:** Non-object values are coerced to objects. See the
   * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
   * for more details.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Object
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   *   this.b = 2;
   * }
   *
   * Foo.prototype.c = 3;
   *
   * _.keys(new Foo);
   * // => ['a', 'b'] (iteration order is not guaranteed)
   *
   * _.keys('hi');
   * // => ['0', '1']
   */
  function keys(object) {
    return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
  }

  /**
   * This method returns the first argument it receives.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Util
   * @param {*} value Any value.
   * @returns {*} Returns `value`.
   * @example
   *
   * var object = { 'a': 1 };
   *
   * console.log(_.identity(object) === object);
   * // => true
   */
  function identity(value) {
    return value;
  }

  /**
   * Creates a function that returns the value at `path` of a given object.
   *
   * @static
   * @memberOf _
   * @since 2.4.0
   * @category Util
   * @param {Array|string} path The path of the property to get.
   * @returns {Function} Returns the new accessor function.
   * @example
   *
   * var objects = [
   *   { 'a': { 'b': 2 } },
   *   { 'a': { 'b': 1 } }
   * ];
   *
   * _.map(objects, _.property('a.b'));
   * // => [2, 1]
   *
   * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
   * // => [1, 2]
   */
  function property(path) {
    return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
  }

  module.exports = find;
  });

  var pca={"86":{"110000":"北京市","120000":"天津市","130000":"河北省","140000":"山西省","150000":"内蒙古自治区","210000":"辽宁省","220000":"吉林省","230000":"黑龙江省","310000":"上海市","320000":"江苏省","330000":"浙江省","340000":"安徽省","350000":"福建省","360000":"江西省","370000":"山东省","410000":"河南省","420000":"湖北省","430000":"湖南省","440000":"广东省","450000":"广西壮族自治区","460000":"海南省","500000":"重庆市","510000":"四川省","520000":"贵州省","530000":"云南省","540000":"西藏自治区","610000":"陕西省","620000":"甘肃省","630000":"青海省","640000":"宁夏回族自治区","650000":"新疆维吾尔自治区","710000":"台湾省","810000":"香港特别行政区","820000":"澳门特别行政区"},"110000":{"110101":"东城区","110102":"西城区","110105":"朝阳区","110106":"丰台区","110107":"石景山区","110108":"海淀区","110109":"门头沟区","110111":"房山区","110112":"通州区","110113":"顺义区","110114":"昌平区","110115":"大兴区","110116":"怀柔区","110117":"平谷区","110118":"密云区","110119":"延庆区"},"120000":{"120101":"和平区","120102":"河东区","120103":"河西区","120104":"南开区","120105":"河北区","120106":"红桥区","120110":"东丽区","120111":"西青区","120112":"津南区","120113":"北辰区","120114":"武清区","120115":"宝坻区","120116":"滨海新区","120117":"宁河区","120118":"静海区","120119":"蓟州区"},"130000":{"130100":"石家庄市","130200":"唐山市","130300":"秦皇岛市","130400":"邯郸市","130500":"邢台市","130600":"保定市","130700":"张家口市","130800":"承德市","130900":"沧州市","131000":"廊坊市","131100":"衡水市","139001":"定州市","139002":"辛集市"},"140000":{"140100":"太原市","140200":"大同市","140300":"阳泉市","140400":"长治市","140500":"晋城市","140600":"朔州市","140700":"晋中市","140800":"运城市","140900":"忻州市","141000":"临汾市","141100":"吕梁市"},"150000":{"150100":"呼和浩特市","150200":"包头市","150300":"乌海市","150400":"赤峰市","150500":"通辽市","150600":"鄂尔多斯市","150700":"呼伦贝尔市","150800":"巴彦淖尔市","150900":"乌兰察布市","152200":"兴安盟","152500":"锡林郭勒盟","152900":"阿拉善盟"},"210000":{"210100":"沈阳市","210200":"大连市","210300":"鞍山市","210400":"抚顺市","210500":"本溪市","210600":"丹东市","210700":"锦州市","210800":"营口市","210900":"阜新市","211000":"辽阳市","211100":"盘锦市","211200":"铁岭市","211300":"朝阳市","211400":"葫芦岛市"},"220000":{"220100":"长春市","220200":"吉林市","220300":"四平市","220400":"辽源市","220500":"通化市","220600":"白山市","220700":"松原市","220800":"白城市","222400":"延边朝鲜族自治州"},"230000":{"230100":"哈尔滨市","230200":"齐齐哈尔市","230300":"鸡西市","230400":"鹤岗市","230500":"双鸭山市","230600":"大庆市","230700":"伊春市","230800":"佳木斯市","230900":"七台河市","231000":"牡丹江市","231100":"黑河市","231200":"绥化市","232700":"大兴安岭地区"},"310000":{"310101":"黄浦区","310104":"徐汇区","310105":"长宁区","310106":"静安区","310107":"普陀区","310109":"虹口区","310110":"杨浦区","310112":"闵行区","310113":"宝山区","310114":"嘉定区","310115":"浦东新区","310116":"金山区","310117":"松江区","310118":"青浦区","310120":"奉贤区","310151":"崇明区"},"320000":{"320100":"南京市","320200":"无锡市","320300":"徐州市","320400":"常州市","320500":"苏州市","320600":"南通市","320700":"连云港市","320800":"淮安市","320900":"盐城市","321000":"扬州市","321100":"镇江市","321200":"泰州市","321300":"宿迁市"},"330000":{"330100":"杭州市","330200":"宁波市","330300":"温州市","330400":"嘉兴市","330500":"湖州市","330600":"绍兴市","330700":"金华市","330800":"衢州市","330900":"舟山市","331000":"台州市","331100":"丽水市"},"340000":{"340100":"合肥市","340200":"芜湖市","340300":"蚌埠市","340400":"淮南市","340500":"马鞍山市","340600":"淮北市","340700":"铜陵市","340800":"安庆市","341000":"黄山市","341100":"滁州市","341200":"阜阳市","341300":"宿州市","341500":"六安市","341600":"亳州市","341700":"池州市","341800":"宣城市"},"350000":{"350100":"福州市","350200":"厦门市","350300":"莆田市","350400":"三明市","350500":"泉州市","350600":"漳州市","350700":"南平市","350800":"龙岩市","350900":"宁德市"},"360000":{"360100":"南昌市","360200":"景德镇市","360300":"萍乡市","360400":"九江市","360500":"新余市","360600":"鹰潭市","360700":"赣州市","360800":"吉安市","360900":"宜春市","361000":"抚州市","361100":"上饶市"},"370000":{"370100":"济南市","370200":"青岛市","370300":"淄博市","370400":"枣庄市","370500":"东营市","370600":"烟台市","370700":"潍坊市","370800":"济宁市","370900":"泰安市","371000":"威海市","371100":"日照市","371200":"莱芜市","371300":"临沂市","371400":"德州市","371500":"聊城市","371600":"滨州市","371700":"菏泽市"},"410000":{"410100":"郑州市","410200":"开封市","410300":"洛阳市","410400":"平顶山市","410500":"安阳市","410600":"鹤壁市","410700":"新乡市","410800":"焦作市","410900":"濮阳市","411000":"许昌市","411100":"漯河市","411200":"三门峡市","411300":"南阳市","411400":"商丘市","411500":"信阳市","411600":"周口市","411700":"驻马店市","419001":"济源市"},"420000":{"420100":"武汉市","420200":"黄石市","420300":"十堰市","420500":"宜昌市","420600":"襄阳市","420700":"鄂州市","420800":"荆门市","420900":"孝感市","421000":"荆州市","421100":"黄冈市","421200":"咸宁市","421300":"随州市","422800":"恩施土家族苗族自治州","429004":"仙桃市","429005":"潜江市","429006":"天门市","429021":"神农架林区"},"430000":{"430100":"长沙市","430200":"株洲市","430300":"湘潭市","430400":"衡阳市","430500":"邵阳市","430600":"岳阳市","430700":"常德市","430800":"张家界市","430900":"益阳市","431000":"郴州市","431100":"永州市","431200":"怀化市","431300":"娄底市","433100":"湘西土家族苗族自治州"},"440000":{"440100":"广州市","440200":"韶关市","440300":"深圳市","440400":"珠海市","440500":"汕头市","440600":"佛山市","440700":"江门市","440800":"湛江市","440900":"茂名市","441200":"肇庆市","441300":"惠州市","441400":"梅州市","441500":"汕尾市","441600":"河源市","441700":"阳江市","441800":"清远市","441900":"东莞市","442000":"中山市","445100":"潮州市","445200":"揭阳市","445300":"云浮市"},"450000":{"450100":"南宁市","450200":"柳州市","450300":"桂林市","450400":"梧州市","450500":"北海市","450600":"防城港市","450700":"钦州市","450800":"贵港市","450900":"玉林市","451000":"百色市","451100":"贺州市","451200":"河池市","451300":"来宾市","451400":"崇左市"},"460000":{"460100":"海口市","460200":"三亚市","460300":"三沙市","460400":"儋州市","469001":"五指山市","469002":"琼海市","469005":"文昌市","469006":"万宁市","469007":"东方市","469021":"定安县","469022":"屯昌县","469023":"澄迈县","469024":"临高县","469025":"白沙黎族自治县","469026":"昌江黎族自治县","469027":"乐东黎族自治县","469028":"陵水黎族自治县","469029":"保亭黎族苗族自治县","469030":"琼中黎族苗族自治县"},"500000":{"500101":"万州区","500102":"涪陵区","500103":"渝中区","500104":"大渡口区","500105":"江北区","500106":"沙坪坝区","500107":"九龙坡区","500108":"南岸区","500109":"北碚区","500110":"綦江区","500111":"大足区","500112":"渝北区","500113":"巴南区","500114":"黔江区","500115":"长寿区","500116":"江津区","500117":"合川区","500118":"永川区","500119":"南川区","500120":"璧山区","500151":"铜梁区","500152":"潼南区","500153":"荣昌区","500154":"开州区","500228":"梁平县","500229":"城口县","500230":"丰都县","500231":"垫江县","500232":"武隆县","500233":"忠县","500235":"云阳县","500236":"奉节县","500237":"巫山县","500238":"巫溪县","500240":"石柱土家族自治县","500241":"秀山土家族苗族自治县","500242":"酉阳土家族苗族自治县","500243":"彭水苗族土家族自治县"},"510000":{"510100":"成都市","510300":"自贡市","510400":"攀枝花市","510500":"泸州市","510600":"德阳市","510700":"绵阳市","510800":"广元市","510900":"遂宁市","511000":"内江市","511100":"乐山市","511300":"南充市","511400":"眉山市","511500":"宜宾市","511600":"广安市","511700":"达州市","511800":"雅安市","511900":"巴中市","512000":"资阳市","513200":"阿坝藏族羌族自治州","513300":"甘孜藏族自治州","513400":"凉山彝族自治州"},"520000":{"520100":"贵阳市","520200":"六盘水市","520300":"遵义市","520400":"安顺市","520500":"毕节市","520600":"铜仁市","522300":"黔西南布依族苗族自治州","522600":"黔东南苗族侗族自治州","522700":"黔南布依族苗族自治州"},"530000":{"530100":"昆明市","530300":"曲靖市","530400":"玉溪市","530500":"保山市","530600":"昭通市","530700":"丽江市","530800":"普洱市","530900":"临沧市","532300":"楚雄彝族自治州","532500":"红河哈尼族彝族自治州","532600":"文山壮族苗族自治州","532800":"西双版纳傣族自治州","532900":"大理白族自治州","533100":"德宏傣族景颇族自治州","533300":"怒江傈僳族自治州","533400":"迪庆藏族自治州"},"540000":{"540100":"拉萨市","540200":"日喀则市","540300":"昌都市","540400":"林芝市","540500":"山南市","542400":"那曲地区","542500":"阿里地区"},"610000":{"610100":"西安市","610200":"铜川市","610300":"宝鸡市","610400":"咸阳市","610500":"渭南市","610600":"延安市","610700":"汉中市","610800":"榆林市","610900":"安康市","611000":"商洛市"},"620000":{"620100":"兰州市","620200":"嘉峪关市","620300":"金昌市","620400":"白银市","620500":"天水市","620600":"武威市","620700":"张掖市","620800":"平凉市","620900":"酒泉市","621000":"庆阳市","621100":"定西市","621200":"陇南市","622900":"临夏回族自治州","623000":"甘南藏族自治州"},"630000":{"630100":"西宁市","630200":"海东市","632200":"海北藏族自治州","632300":"黄南藏族自治州","632500":"海南藏族自治州","632600":"果洛藏族自治州","632700":"玉树藏族自治州","632800":"海西蒙古族藏族自治州"},"640000":{"640100":"银川市","640200":"石嘴山市","640300":"吴忠市","640400":"固原市","640500":"中卫市"},"650000":{"650100":"乌鲁木齐市","650200":"克拉玛依市","650400":"吐鲁番市","650500":"哈密市","652300":"昌吉回族自治州","652700":"博尔塔拉蒙古自治州","652800":"巴音郭楞蒙古自治州","652900":"阿克苏地区","653000":"克孜勒苏柯尔克孜自治州","653100":"喀什地区","653200":"和田地区","654000":"伊犁哈萨克自治州","654200":"塔城地区","654300":"阿勒泰地区","659001":"石河子市","659002":"阿拉尔市","659003":"图木舒克市","659004":"五家渠市","659006":"铁门关市"},"710000":{"710101":"金门","710102":"连江","710103":"苗栗","710104":"南投","710105":"澎湖","710106":"屏东","710107":"台东","710108":"台中","710109":"台南","710110":"台北","710111":"桃园","710112":"云林","710113":"新北","710114":"彰化","710115":"嘉义","710116":"新竹","710117":"花莲","710118":"宜兰","710119":"高雄","710120":"基隆"},"810000":{"810101":"中西区","810102":"东区","810103":"九龙城区","810104":"观塘区","810105":"深水埗区","810106":"湾仔区","810107":"黄大仙区","810108":"油尖旺区","810109":"离岛区","810110":"葵青区","810111":"北区","810112":"西贡区","810113":"沙田区","810114":"屯门区","810115":"大埔区","810116":"荃湾区","810117":"元朗区","810118":"香港","810119":"九龙","810120":"新界"},"820000":{"820101":"离岛","820102":"澳门半岛","820103":"凼仔","820104":"路凼城","820105":"路环"}};

  var pcaa={"86":{"110000":"北京市","120000":"天津市","130000":"河北省","140000":"山西省","150000":"内蒙古自治区","210000":"辽宁省","220000":"吉林省","230000":"黑龙江省","310000":"上海市","320000":"江苏省","330000":"浙江省","340000":"安徽省","350000":"福建省","360000":"江西省","370000":"山东省","410000":"河南省","420000":"湖北省","430000":"湖南省","440000":"广东省","450000":"广西壮族自治区","460000":"海南省","500000":"重庆市","510000":"四川省","520000":"贵州省","530000":"云南省","540000":"西藏自治区","610000":"陕西省","620000":"甘肃省","630000":"青海省","640000":"宁夏回族自治区","650000":"新疆维吾尔自治区","710000":"台湾省","910000":"港澳"},"110000":{"110100":"市辖区"},"110100":{"110101":"东城区","110102":"西城区","110105":"朝阳区","110106":"丰台区","110107":"石景山区","110108":"海淀区","110109":"门头沟区","110111":"房山区","110112":"通州区","110113":"顺义区","110114":"昌平区","110115":"大兴区","110116":"怀柔区","110117":"平谷区","110118":"密云区","110119":"延庆区"},"120000":{"120100":"市辖区"},"120100":{"120101":"和平区","120102":"河东区","120103":"河西区","120104":"南开区","120105":"河北区","120106":"红桥区","120110":"东丽区","120111":"西青区","120112":"津南区","120113":"北辰区","120114":"武清区","120115":"宝坻区","120116":"滨海新区","120117":"宁河区","120118":"静海区","120119":"蓟州区"},"130000":{"130100":"石家庄市","130200":"唐山市","130300":"秦皇岛市","130400":"邯郸市","130500":"邢台市","130600":"保定市","130700":"张家口市","130800":"承德市","130900":"沧州市","131000":"廊坊市","131100":"衡水市","139001":"定州市","139002":"辛集市"},"130100":{"130102":"长安区","130104":"桥西区","130105":"新华区","130107":"井陉矿区","130108":"裕华区","130109":"藁城区","130110":"鹿泉区","130111":"栾城区","130121":"井陉县","130123":"正定县","130125":"行唐县","130126":"灵寿县","130127":"高邑县","130128":"深泽县","130129":"赞皇县","130130":"无极县","130131":"平山县","130132":"元氏县","130133":"赵县","130183":"晋州市","130184":"新乐市"},"130200":{"130202":"路南区","130203":"路北区","130204":"古冶区","130205":"开平区","130207":"丰南区","130208":"丰润区","130209":"曹妃甸区","130223":"滦县","130224":"滦南县","130225":"乐亭县","130227":"迁西县","130229":"玉田县","130281":"遵化市","130283":"迁安市"},"130300":{"130302":"海港区","130303":"山海关区","130304":"北戴河区","130306":"抚宁区","130321":"青龙满族自治县","130322":"昌黎县","130324":"卢龙县"},"130400":{"130402":"邯山区","130403":"丛台区","130404":"复兴区","130406":"峰峰矿区","130421":"邯郸县","130423":"临漳县","130424":"成安县","130425":"大名县","130426":"涉县","130427":"磁县","130428":"肥乡县","130429":"永年县","130430":"邱县","130431":"鸡泽县","130432":"广平县","130433":"馆陶县","130434":"魏县","130435":"曲周县","130481":"武安市"},"130500":{"130502":"桥东区","130503":"桥西区","130521":"邢台县","130522":"临城县","130523":"内丘县","130524":"柏乡县","130525":"隆尧县","130526":"任县","130527":"南和县","130528":"宁晋县","130529":"巨鹿县","130530":"新河县","130531":"广宗县","130532":"平乡县","130533":"威县","130534":"清河县","130535":"临西县","130581":"南宫市","130582":"沙河市"},"130600":{"130602":"竞秀区","130606":"莲池区","130607":"满城区","130608":"清苑区","130609":"徐水区","130623":"涞水县","130624":"阜平县","130626":"定兴县","130627":"唐县","130628":"高阳县","130629":"容城县","130630":"涞源县","130631":"望都县","130632":"安新县","130633":"易县","130634":"曲阳县","130635":"蠡县","130636":"顺平县","130637":"博野县","130638":"雄县","130681":"涿州市","130683":"安国市","130684":"高碑店市"},"130700":{"130702":"桥东区","130703":"桥西区","130705":"宣化区","130706":"下花园区","130708":"万全区","130709":"崇礼区","130722":"张北县","130723":"康保县","130724":"沽源县","130725":"尚义县","130726":"蔚县","130727":"阳原县","130728":"怀安县","130730":"怀来县","130731":"涿鹿县","130732":"赤城县"},"130800":{"130802":"双桥区","130803":"双滦区","130804":"鹰手营子矿区","130821":"承德县","130822":"兴隆县","130823":"平泉县","130824":"滦平县","130825":"隆化县","130826":"丰宁满族自治县","130827":"宽城满族自治县","130828":"围场满族蒙古族自治县"},"130900":{"130902":"新华区","130903":"运河区","130921":"沧县","130922":"青县","130923":"东光县","130924":"海兴县","130925":"盐山县","130926":"肃宁县","130927":"南皮县","130928":"吴桥县","130929":"献县","130930":"孟村回族自治县","130981":"泊头市","130982":"任丘市","130983":"黄骅市","130984":"河间市"},"131000":{"131002":"安次区","131003":"广阳区","131022":"固安县","131023":"永清县","131024":"香河县","131025":"大城县","131026":"文安县","131028":"大厂回族自治县","131081":"霸州市","131082":"三河市"},"131100":{"131102":"桃城区","131103":"冀州区","131121":"枣强县","131122":"武邑县","131123":"武强县","131124":"饶阳县","131125":"安平县","131126":"故城县","131127":"景县","131128":"阜城县","131182":"深州市"},"139001":{"1390011":"留早镇","13900111":"邢邑镇","139001001":"南城区街道","139001002":"北城区街道","139001003":"西城区街道","139001004":"长安路街道","139001101":"清风店镇","139001102":"庞村镇","139001103":"砖路镇","139001104":"明月店镇","139001105":"叮咛店镇","139001106":"东亭镇","139001107":"大辛庄镇","139001108":"东旺镇","139001109":"高蓬镇","139001111":"李亲顾镇","139001112":"子位镇","139001113":"开元镇","139001115":"周村镇","139001116":"息冢镇","139001203":"东留春乡","139001204":"号头庄回族乡","139001205":"杨家庄乡","139001206":"大鹿庄乡","139001208":"西城乡"},"139002":{"1390021":"辛集镇","1390022":"天宫营乡","1390025":"辛集经济开发区","139002101":"旧城镇","139002102":"张古庄镇","139002103":"位伯镇","139002104":"新垒头镇","139002105":"新城镇","139002106":"南智邱镇","139002107":"王口镇","139002201":"前营乡","139002202":"马庄乡","139002203":"和睦井乡","139002204":"田家庄乡","139002205":"中里厢乡","139002206":"小辛庄乡"},"140000":{"140100":"太原市","140200":"大同市","140300":"阳泉市","140400":"长治市","140500":"晋城市","140600":"朔州市","140700":"晋中市","140800":"运城市","140900":"忻州市","141000":"临汾市","141100":"吕梁市"},"140100":{"140105":"小店区","140106":"迎泽区","140107":"杏花岭区","140108":"尖草坪区","140109":"万柏林区","140110":"晋源区","140121":"清徐县","140122":"阳曲县","140123":"娄烦县","140181":"古交市"},"140200":{"140202":"城区","140203":"矿区","140211":"南郊区","140212":"新荣区","140221":"阳高县","140222":"天镇县","140223":"广灵县","140224":"灵丘县","140225":"浑源县","140226":"左云县","140227":"大同县"},"140300":{"140302":"城区","140303":"矿区","140311":"郊区","140321":"平定县","140322":"盂县"},"140400":{"140402":"城区","140411":"郊区","140421":"长治县","140423":"襄垣县","140424":"屯留县","140425":"平顺县","140426":"黎城县","140427":"壶关县","140428":"长子县","140429":"武乡县","140430":"沁县","140431":"沁源县","140481":"潞城市"},"140500":{"140502":"城区","140521":"沁水县","140522":"阳城县","140524":"陵川县","140525":"泽州县","140581":"高平市"},"140600":{"140602":"朔城区","140603":"平鲁区","140621":"山阴县","140622":"应县","140623":"右玉县","140624":"怀仁县"},"140700":{"140702":"榆次区","140721":"榆社县","140722":"左权县","140723":"和顺县","140724":"昔阳县","140725":"寿阳县","140726":"太谷县","140727":"祁县","140728":"平遥县","140729":"灵石县","140781":"介休市"},"140800":{"140802":"盐湖区","140821":"临猗县","140822":"万荣县","140823":"闻喜县","140824":"稷山县","140825":"新绛县","140826":"绛县","140827":"垣曲县","140828":"夏县","140829":"平陆县","140830":"芮城县","140881":"永济市","140882":"河津市"},"140900":{"140902":"忻府区","140921":"定襄县","140922":"五台县","140923":"代县","140924":"繁峙县","140925":"宁武县","140926":"静乐县","140927":"神池县","140928":"五寨县","140929":"岢岚县","140930":"河曲县","140931":"保德县","140932":"偏关县","140981":"原平市"},"141000":{"141002":"尧都区","141021":"曲沃县","141022":"翼城县","141023":"襄汾县","141024":"洪洞县","141025":"古县","141026":"安泽县","141027":"浮山县","141028":"吉县","141029":"乡宁县","141030":"大宁县","141031":"隰县","141032":"永和县","141033":"蒲县","141034":"汾西县","141081":"侯马市","141082":"霍州市"},"141100":{"141102":"离石区","141121":"文水县","141122":"交城县","141123":"兴县","141124":"临县","141125":"柳林县","141126":"石楼县","141127":"岚县","141128":"方山县","141129":"中阳县","141130":"交口县","141181":"孝义市","141182":"汾阳市"},"150000":{"150100":"呼和浩特市","150200":"包头市","150300":"乌海市","150400":"赤峰市","150500":"通辽市","150600":"鄂尔多斯市","150700":"呼伦贝尔市","150800":"巴彦淖尔市","150900":"乌兰察布市","152200":"兴安盟","152500":"锡林郭勒盟","152900":"阿拉善盟"},"150100":{"150102":"新城区","150103":"回民区","150104":"玉泉区","150105":"赛罕区","150121":"土默特左旗","150122":"托克托县","150123":"和林格尔县","150124":"清水河县","150125":"武川县"},"150200":{"150202":"东河区","150203":"昆都仑区","150204":"青山区","150205":"石拐区","150206":"白云鄂博矿区","150207":"九原区","150221":"土默特右旗","150222":"固阳县","150223":"达尔罕茂明安联合旗"},"150300":{"150302":"海勃湾区","150303":"海南区","150304":"乌达区"},"150400":{"150402":"红山区","150403":"元宝山区","150404":"松山区","150421":"阿鲁科尔沁旗","150422":"巴林左旗","150423":"巴林右旗","150424":"林西县","150425":"克什克腾旗","150426":"翁牛特旗","150428":"喀喇沁旗","150429":"宁城县","150430":"敖汉旗"},"150500":{"150502":"科尔沁区","150521":"科尔沁左翼中旗","150522":"科尔沁左翼后旗","150523":"开鲁县","150524":"库伦旗","150525":"奈曼旗","150526":"扎鲁特旗","150581":"霍林郭勒市"},"150600":{"150602":"东胜区","150603":"康巴什区","150621":"达拉特旗","150622":"准格尔旗","150623":"鄂托克前旗","150624":"鄂托克旗","150625":"杭锦旗","150626":"乌审旗","150627":"伊金霍洛旗"},"150700":{"150702":"海拉尔区","150703":"扎赉诺尔区","150721":"阿荣旗","150722":"莫力达瓦达斡尔族自治旗","150723":"鄂伦春自治旗","150724":"鄂温克族自治旗","150725":"陈巴尔虎旗","150726":"新巴尔虎左旗","150727":"新巴尔虎右旗","150781":"满洲里市","150782":"牙克石市","150783":"扎兰屯市","150784":"额尔古纳市","150785":"根河市"},"150800":{"150802":"临河区","150821":"五原县","150822":"磴口县","150823":"乌拉特前旗","150824":"乌拉特中旗","150825":"乌拉特后旗","150826":"杭锦后旗"},"150900":{"150902":"集宁区","150921":"卓资县","150922":"化德县","150923":"商都县","150924":"兴和县","150925":"凉城县","150926":"察哈尔右翼前旗","150927":"察哈尔右翼中旗","150928":"察哈尔右翼后旗","150929":"四子王旗","150981":"丰镇市"},"152200":{"152201":"乌兰浩特市","152202":"阿尔山市","152221":"科尔沁右翼前旗","152222":"科尔沁右翼中旗","152223":"扎赉特旗","152224":"突泉县"},"152500":{"152501":"二连浩特市","152502":"锡林浩特市","152522":"阿巴嘎旗","152523":"苏尼特左旗","152524":"苏尼特右旗","152525":"东乌珠穆沁旗","152526":"西乌珠穆沁旗","152527":"太仆寺旗","152528":"镶黄旗","152529":"正镶白旗","152530":"正蓝旗","152531":"多伦县"},"152900":{"152921":"阿拉善左旗","152922":"阿拉善右旗","152923":"额济纳旗"},"210000":{"210100":"沈阳市","210200":"大连市","210300":"鞍山市","210400":"抚顺市","210500":"本溪市","210600":"丹东市","210700":"锦州市","210800":"营口市","210900":"阜新市","211000":"辽阳市","211100":"盘锦市","211200":"铁岭市","211300":"朝阳市","211400":"葫芦岛市"},"210100":{"210102":"和平区","210103":"沈河区","210104":"大东区","210105":"皇姑区","210106":"铁西区","210111":"苏家屯区","210112":"浑南区","210113":"沈北新区","210114":"于洪区","210115":"辽中区","210123":"康平县","210124":"法库县","210181":"新民市"},"210200":{"210202":"中山区","210203":"西岗区","210204":"沙河口区","210211":"甘井子区","210212":"旅顺口区","210213":"金州区","210214":"普兰店区","210224":"长海县","210281":"瓦房店市","210283":"庄河市"},"210300":{"210302":"铁东区","210303":"铁西区","210304":"立山区","210311":"千山区","210321":"台安县","210323":"岫岩满族自治县","210381":"海城市"},"210400":{"210402":"新抚区","210403":"东洲区","210404":"望花区","210411":"顺城区","210421":"抚顺县","210422":"新宾满族自治县","210423":"清原满族自治县"},"210500":{"210502":"平山区","210503":"溪湖区","210504":"明山区","210505":"南芬区","210521":"本溪满族自治县","210522":"桓仁满族自治县"},"210600":{"210602":"元宝区","210603":"振兴区","210604":"振安区","210624":"宽甸满族自治县","210681":"东港市","210682":"凤城市"},"210700":{"210702":"古塔区","210703":"凌河区","210711":"太和区","210726":"黑山县","210727":"义县","210781":"凌海市","210782":"北镇市"},"210800":{"210802":"站前区","210803":"西市区","210804":"鲅鱼圈区","210811":"老边区","210881":"盖州市","210882":"大石桥市"},"210900":{"210902":"海州区","210903":"新邱区","210904":"太平区","210905":"清河门区","210911":"细河区","210921":"阜新蒙古族自治县","210922":"彰武县"},"211000":{"211002":"白塔区","211003":"文圣区","211004":"宏伟区","211005":"弓长岭区","211011":"太子河区","211021":"辽阳县","211081":"灯塔市"},"211100":{"211102":"双台子区","211103":"兴隆台区","211104":"大洼区","211122":"盘山县"},"211200":{"211202":"银州区","211204":"清河区","211221":"铁岭县","211223":"西丰县","211224":"昌图县","211281":"调兵山市","211282":"开原市"},"211300":{"211302":"双塔区","211303":"龙城区","211321":"朝阳县","211322":"建平县","211324":"喀喇沁左翼蒙古族自治县","211381":"北票市","211382":"凌源市"},"211400":{"211402":"连山区","211403":"龙港区","211404":"南票区","211421":"绥中县","211422":"建昌县","211481":"兴城市"},"220000":{"220100":"长春市","220200":"吉林市","220300":"四平市","220400":"辽源市","220500":"通化市","220600":"白山市","220700":"松原市","220800":"白城市","222400":"延边朝鲜族自治州"},"220100":{"220102":"南关区","220103":"宽城区","220104":"朝阳区","220105":"二道区","220106":"绿园区","220112":"双阳区","220113":"九台区","220122":"农安县","220182":"榆树市","220183":"德惠市"},"220200":{"220202":"昌邑区","220203":"龙潭区","220204":"船营区","220211":"丰满区","220221":"永吉县","220281":"蛟河市","220282":"桦甸市","220283":"舒兰市","220284":"磐石市"},"220300":{"220302":"铁西区","220303":"铁东区","220322":"梨树县","220323":"伊通满族自治县","220381":"公主岭市","220382":"双辽市"},"220400":{"220402":"龙山区","220403":"西安区","220421":"东丰县","220422":"东辽县"},"220500":{"220502":"东昌区","220503":"二道江区","220521":"通化县","220523":"辉南县","220524":"柳河县","220581":"梅河口市","220582":"集安市"},"220600":{"220602":"浑江区","220605":"江源区","220621":"抚松县","220622":"靖宇县","220623":"长白朝鲜族自治县","220681":"临江市"},"220700":{"220702":"宁江区","220721":"前郭尔罗斯蒙古族自治县","220722":"长岭县","220723":"乾安县","220781":"扶余市"},"220800":{"220802":"洮北区","220821":"镇赉县","220822":"通榆县","220881":"洮南市","220882":"大安市"},"222400":{"222401":"延吉市","222402":"图们市","222403":"敦化市","222404":"珲春市","222405":"龙井市","222406":"和龙市","222424":"汪清县","222426":"安图县"},"230000":{"230100":"哈尔滨市","230200":"齐齐哈尔市","230300":"鸡西市","230400":"鹤岗市","230500":"双鸭山市","230600":"大庆市","230700":"伊春市","230800":"佳木斯市","230900":"七台河市","231000":"牡丹江市","231100":"黑河市","231200":"绥化市","232700":"大兴安岭地区"},"230100":{"230102":"道里区","230103":"南岗区","230104":"道外区","230108":"平房区","230109":"松北区","230110":"香坊区","230111":"呼兰区","230112":"阿城区","230113":"双城区","230123":"依兰县","230124":"方正县","230125":"宾县","230126":"巴彦县","230127":"木兰县","230128":"通河县","230129":"延寿县","230183":"尚志市","230184":"五常市"},"230200":{"230202":"龙沙区","230203":"建华区","230204":"铁锋区","230205":"昂昂溪区","230206":"富拉尔基区","230207":"碾子山区","230208":"梅里斯达斡尔族区","230221":"龙江县","230223":"依安县","230224":"泰来县","230225":"甘南县","230227":"富裕县","230229":"克山县","230230":"克东县","230231":"拜泉县","230281":"讷河市"},"230300":{"230302":"鸡冠区","230303":"恒山区","230304":"滴道区","230305":"梨树区","230306":"城子河区","230307":"麻山区","230321":"鸡东县","230381":"虎林市","230382":"密山市"},"230400":{"230402":"向阳区","230403":"工农区","230404":"南山区","230405":"兴安区","230406":"东山区","230407":"兴山区","230421":"萝北县","230422":"绥滨县"},"230500":{"230502":"尖山区","230503":"岭东区","230505":"四方台区","230506":"宝山区","230521":"集贤县","230522":"友谊县","230523":"宝清县","230524":"饶河县"},"230600":{"230602":"萨尔图区","230603":"龙凤区","230604":"让胡路区","230605":"红岗区","230606":"大同区","230621":"肇州县","230622":"肇源县","230623":"林甸县","230624":"杜尔伯特蒙古族自治县"},"230700":{"230702":"伊春区","230703":"南岔区","230704":"友好区","230705":"西林区","230706":"翠峦区","230707":"新青区","230708":"美溪区","230709":"金山屯区","230710":"五营区","230711":"乌马河区","230712":"汤旺河区","230713":"带岭区","230714":"乌伊岭区","230715":"红星区","230716":"上甘岭区","230722":"嘉荫县","230781":"铁力市"},"230800":{"230803":"向阳区","230804":"前进区","230805":"东风区","230811":"郊区","230822":"桦南县","230826":"桦川县","230828":"汤原县","230881":"同江市","230882":"富锦市","230883":"抚远市"},"230900":{"230902":"新兴区","230903":"桃山区","230904":"茄子河区","230921":"勃利县"},"231000":{"231002":"东安区","231003":"阳明区","231004":"爱民区","231005":"西安区","231025":"林口县","231081":"绥芬河市","231083":"海林市","231084":"宁安市","231085":"穆棱市","231086":"东宁市"},"231100":{"231102":"爱辉区","231121":"嫩江县","231123":"逊克县","231124":"孙吴县","231181":"北安市","231182":"五大连池市"},"231200":{"231202":"北林区","231221":"望奎县","231222":"兰西县","231223":"青冈县","231224":"庆安县","231225":"明水县","231226":"绥棱县","231281":"安达市","231282":"肇东市","231283":"海伦市"},"232700":{"232721":"呼玛县","232722":"塔河县","232723":"漠河县"},"310000":{"310100":"市辖区"},"310100":{"310101":"黄浦区","310104":"徐汇区","310105":"长宁区","310106":"静安区","310107":"普陀区","310109":"虹口区","310110":"杨浦区","310112":"闵行区","310113":"宝山区","310114":"嘉定区","310115":"浦东新区","310116":"金山区","310117":"松江区","310118":"青浦区","310120":"奉贤区","310151":"崇明区"},"320000":{"320100":"南京市","320200":"无锡市","320300":"徐州市","320400":"常州市","320500":"苏州市","320600":"南通市","320700":"连云港市","320800":"淮安市","320900":"盐城市","321000":"扬州市","321100":"镇江市","321200":"泰州市","321300":"宿迁市"},"320100":{"320102":"玄武区","320104":"秦淮区","320105":"建邺区","320106":"鼓楼区","320111":"浦口区","320113":"栖霞区","320114":"雨花台区","320115":"江宁区","320116":"六合区","320117":"溧水区","320118":"高淳区"},"320200":{"320205":"锡山区","320206":"惠山区","320211":"滨湖区","320213":"梁溪区","320214":"新吴区","320281":"江阴市","320282":"宜兴市"},"320300":{"320302":"鼓楼区","320303":"云龙区","320305":"贾汪区","320311":"泉山区","320312":"铜山区","320321":"丰县","320322":"沛县","320324":"睢宁县","320381":"新沂市","320382":"邳州市"},"320400":{"320402":"天宁区","320404":"钟楼区","320411":"新北区","320412":"武进区","320413":"金坛区","320481":"溧阳市"},"320500":{"320505":"虎丘区","320506":"吴中区","320507":"相城区","320508":"姑苏区","320509":"吴江区","320581":"常熟市","320582":"张家港市","320583":"昆山市","320585":"太仓市"},"320600":{"320602":"崇川区","320611":"港闸区","320612":"通州区","320621":"海安县","320623":"如东县","320681":"启东市","320682":"如皋市","320684":"海门市"},"320700":{"320703":"连云区","320706":"海州区","320707":"赣榆区","320722":"东海县","320723":"灌云县","320724":"灌南县"},"320800":{"320803":"淮安区","320804":"淮阴区","320812":"清江浦区","320813":"洪泽区","320826":"涟水县","320830":"盱眙县","320831":"金湖县"},"320900":{"320902":"亭湖区","320903":"盐都区","320904":"大丰区","320921":"响水县","320922":"滨海县","320923":"阜宁县","320924":"射阳县","320925":"建湖县","320981":"东台市"},"321000":{"321002":"广陵区","321003":"邗江区","321012":"江都区","321023":"宝应县","321081":"仪征市","321084":"高邮市"},"321100":{"321102":"京口区","321111":"润州区","321112":"丹徒区","321181":"丹阳市","321182":"扬中市","321183":"句容市"},"321200":{"321202":"海陵区","321203":"高港区","321204":"姜堰区","321281":"兴化市","321282":"靖江市","321283":"泰兴市"},"321300":{"321302":"宿城区","321311":"宿豫区","321322":"沭阳县","321323":"泗阳县","321324":"泗洪县"},"330000":{"330100":"杭州市","330200":"宁波市","330300":"温州市","330400":"嘉兴市","330500":"湖州市","330600":"绍兴市","330700":"金华市","330800":"衢州市","330900":"舟山市","331000":"台州市","331100":"丽水市"},"330100":{"330102":"上城区","330103":"下城区","330104":"江干区","330105":"拱墅区","330106":"西湖区","330108":"滨江区","330109":"萧山区","330110":"余杭区","330111":"富阳区","330122":"桐庐县","330127":"淳安县","330182":"建德市","330185":"临安市"},"330200":{"330203":"海曙区","330204":"江东区","330205":"江北区","330206":"北仑区","330211":"镇海区","330212":"鄞州区","330225":"象山县","330226":"宁海县","330281":"余姚市","330282":"慈溪市","330283":"奉化市"},"330300":{"330302":"鹿城区","330303":"龙湾区","330304":"瓯海区","330305":"洞头区","330324":"永嘉县","330326":"平阳县","330327":"苍南县","330328":"文成县","330329":"泰顺县","330381":"瑞安市","330382":"乐清市"},"330400":{"330402":"南湖区","330411":"秀洲区","330421":"嘉善县","330424":"海盐县","330481":"海宁市","330482":"平湖市","330483":"桐乡市"},"330500":{"330502":"吴兴区","330503":"南浔区","330521":"德清县","330522":"长兴县","330523":"安吉县"},"330600":{"330602":"越城区","330603":"柯桥区","330604":"上虞区","330624":"新昌县","330681":"诸暨市","330683":"嵊州市"},"330700":{"330702":"婺城区","330703":"金东区","330723":"武义县","330726":"浦江县","330727":"磐安县","330781":"兰溪市","330782":"义乌市","330783":"东阳市","330784":"永康市"},"330800":{"330802":"柯城区","330803":"衢江区","330822":"常山县","330824":"开化县","330825":"龙游县","330881":"江山市"},"330900":{"330902":"定海区","330903":"普陀区","330921":"岱山县","330922":"嵊泗县"},"331000":{"331002":"椒江区","331003":"黄岩区","331004":"路桥区","331021":"玉环县","331022":"三门县","331023":"天台县","331024":"仙居县","331081":"温岭市","331082":"临海市"},"331100":{"331102":"莲都区","331121":"青田县","331122":"缙云县","331123":"遂昌县","331124":"松阳县","331125":"云和县","331126":"庆元县","331127":"景宁畲族自治县","331181":"龙泉市"},"340000":{"340100":"合肥市","340200":"芜湖市","340300":"蚌埠市","340400":"淮南市","340500":"马鞍山市","340600":"淮北市","340700":"铜陵市","340800":"安庆市","341000":"黄山市","341100":"滁州市","341200":"阜阳市","341300":"宿州市","341500":"六安市","341600":"亳州市","341700":"池州市","341800":"宣城市"},"340100":{"340102":"瑶海区","340103":"庐阳区","340104":"蜀山区","340111":"包河区","340121":"长丰县","340122":"肥东县","340123":"肥西县","340124":"庐江县","340181":"巢湖市"},"340200":{"340202":"镜湖区","340203":"弋江区","340207":"鸠江区","340208":"三山区","340221":"芜湖县","340222":"繁昌县","340223":"南陵县","340225":"无为县"},"340300":{"340302":"龙子湖区","340303":"蚌山区","340304":"禹会区","340311":"淮上区","340321":"怀远县","340322":"五河县","340323":"固镇县"},"340400":{"340402":"大通区","340403":"田家庵区","340404":"谢家集区","340405":"八公山区","340406":"潘集区","340421":"凤台县","340422":"寿县"},"340500":{"340503":"花山区","340504":"雨山区","340506":"博望区","340521":"当涂县","340522":"含山县","340523":"和县"},"340600":{"340602":"杜集区","340603":"相山区","340604":"烈山区","340621":"濉溪县"},"340700":{"340705":"铜官区","340706":"义安区","340711":"郊区","340722":"枞阳县"},"340800":{"340802":"迎江区","340803":"大观区","340811":"宜秀区","340822":"怀宁县","340824":"潜山县","340825":"太湖县","340826":"宿松县","340827":"望江县","340828":"岳西县","340881":"桐城市"},"341000":{"341002":"屯溪区","341003":"黄山区","341004":"徽州区","341021":"歙县","341022":"休宁县","341023":"黟县","341024":"祁门县"},"341100":{"341102":"琅琊区","341103":"南谯区","341122":"来安县","341124":"全椒县","341125":"定远县","341126":"凤阳县","341181":"天长市","341182":"明光市"},"341200":{"341202":"颍州区","341203":"颍东区","341204":"颍泉区","341221":"临泉县","341222":"太和县","341225":"阜南县","341226":"颍上县","341282":"界首市"},"341300":{"341302":"埇桥区","341321":"砀山县","341322":"萧县","341323":"灵璧县","341324":"泗县"},"341500":{"341502":"金安区","341503":"裕安区","341504":"叶集区","341522":"霍邱县","341523":"舒城县","341524":"金寨县","341525":"霍山县"},"341600":{"341602":"谯城区","341621":"涡阳县","341622":"蒙城县","341623":"利辛县"},"341700":{"341702":"贵池区","341721":"东至县","341722":"石台县","341723":"青阳县"},"341800":{"341802":"宣州区","341821":"郎溪县","341822":"广德县","341823":"泾县","341824":"绩溪县","341825":"旌德县","341881":"宁国市"},"350000":{"350100":"福州市","350200":"厦门市","350300":"莆田市","350400":"三明市","350500":"泉州市","350600":"漳州市","350700":"南平市","350800":"龙岩市","350900":"宁德市"},"350100":{"350102":"鼓楼区","350103":"台江区","350104":"仓山区","350105":"马尾区","350111":"晋安区","350121":"闽侯县","350122":"连江县","350123":"罗源县","350124":"闽清县","350125":"永泰县","350128":"平潭县","350181":"福清市","350182":"长乐市"},"350200":{"350203":"思明区","350205":"海沧区","350206":"湖里区","350211":"集美区","350212":"同安区","350213":"翔安区"},"350300":{"350302":"城厢区","350303":"涵江区","350304":"荔城区","350305":"秀屿区","350322":"仙游县"},"350400":{"350402":"梅列区","350403":"三元区","350421":"明溪县","350423":"清流县","350424":"宁化县","350425":"大田县","350426":"尤溪县","350427":"沙县","350428":"将乐县","350429":"泰宁县","350430":"建宁县","350481":"永安市"},"350500":{"350502":"鲤城区","350503":"丰泽区","350504":"洛江区","350505":"泉港区","350521":"惠安县","350524":"安溪县","350525":"永春县","350526":"德化县","350527":"金门县","350581":"石狮市","350582":"晋江市","350583":"南安市"},"350600":{"350602":"芗城区","350603":"龙文区","350622":"云霄县","350623":"漳浦县","350624":"诏安县","350625":"长泰县","350626":"东山县","350627":"南靖县","350628":"平和县","350629":"华安县","350681":"龙海市"},"350700":{"350702":"延平区","350703":"建阳区","350721":"顺昌县","350722":"浦城县","350723":"光泽县","350724":"松溪县","350725":"政和县","350781":"邵武市","350782":"武夷山市","350783":"建瓯市"},"350800":{"350802":"新罗区","350803":"永定区","350821":"长汀县","350823":"上杭县","350824":"武平县","350825":"连城县","350881":"漳平市"},"350900":{"350902":"蕉城区","350921":"霞浦县","350922":"古田县","350923":"屏南县","350924":"寿宁县","350925":"周宁县","350926":"柘荣县","350981":"福安市","350982":"福鼎市"},"360000":{"360100":"南昌市","360200":"景德镇市","360300":"萍乡市","360400":"九江市","360500":"新余市","360600":"鹰潭市","360700":"赣州市","360800":"吉安市","360900":"宜春市","361000":"抚州市","361100":"上饶市"},"360100":{"360102":"东湖区","360103":"西湖区","360104":"青云谱区","360105":"湾里区","360111":"青山湖区","360112":"新建区","360121":"南昌县","360123":"安义县","360124":"进贤县"},"360200":{"360202":"昌江区","360203":"珠山区","360222":"浮梁县","360281":"乐平市"},"360300":{"360302":"安源区","360313":"湘东区","360321":"莲花县","360322":"上栗县","360323":"芦溪县"},"360400":{"360402":"濂溪区","360403":"浔阳区","360421":"九江县","360423":"武宁县","360424":"修水县","360425":"永修县","360426":"德安县","360428":"都昌县","360429":"湖口县","360430":"彭泽县","360481":"瑞昌市","360482":"共青城市","360483":"庐山市"},"360500":{"360502":"渝水区","360521":"分宜县"},"360600":{"360602":"月湖区","360622":"余江县","360681":"贵溪市"},"360700":{"360702":"章贡区","360703":"南康区","360721":"赣县","360722":"信丰县","360723":"大余县","360724":"上犹县","360725":"崇义县","360726":"安远县","360727":"龙南县","360728":"定南县","360729":"全南县","360730":"宁都县","360731":"于都县","360732":"兴国县","360733":"会昌县","360734":"寻乌县","360735":"石城县","360781":"瑞金市"},"360800":{"360802":"吉州区","360803":"青原区","360821":"吉安县","360822":"吉水县","360823":"峡江县","360824":"新干县","360825":"永丰县","360826":"泰和县","360827":"遂川县","360828":"万安县","360829":"安福县","360830":"永新县","360881":"井冈山市"},"360900":{"360902":"袁州区","360921":"奉新县","360922":"万载县","360923":"上高县","360924":"宜丰县","360925":"靖安县","360926":"铜鼓县","360981":"丰城市","360982":"樟树市","360983":"高安市"},"361000":{"361002":"临川区","361021":"南城县","361022":"黎川县","361023":"南丰县","361024":"崇仁县","361025":"乐安县","361026":"宜黄县","361027":"金溪县","361028":"资溪县","361029":"东乡县","361030":"广昌县"},"361100":{"361102":"信州区","361103":"广丰区","361121":"上饶县","361123":"玉山县","361124":"铅山县","361125":"横峰县","361126":"弋阳县","361127":"余干县","361128":"鄱阳县","361129":"万年县","361130":"婺源县","361181":"德兴市"},"370000":{"370100":"济南市","370200":"青岛市","370300":"淄博市","370400":"枣庄市","370500":"东营市","370600":"烟台市","370700":"潍坊市","370800":"济宁市","370900":"泰安市","371000":"威海市","371100":"日照市","371200":"莱芜市","371300":"临沂市","371400":"德州市","371500":"聊城市","371600":"滨州市","371700":"菏泽市"},"370100":{"370102":"历下区","370103":"市中区","370104":"槐荫区","370105":"天桥区","370112":"历城区","370113":"长清区","370124":"平阴县","370125":"济阳县","370126":"商河县","370181":"章丘市"},"370200":{"370202":"市南区","370203":"市北区","370211":"黄岛区","370212":"崂山区","370213":"李沧区","370214":"城阳区","370281":"胶州市","370282":"即墨市","370283":"平度市","370285":"莱西市"},"370300":{"370302":"淄川区","370303":"张店区","370304":"博山区","370305":"临淄区","370306":"周村区","370321":"桓台县","370322":"高青县","370323":"沂源县"},"370400":{"370402":"市中区","370403":"薛城区","370404":"峄城区","370405":"台儿庄区","370406":"山亭区","370481":"滕州市"},"370500":{"370502":"东营区","370503":"河口区","370505":"垦利区","370522":"利津县","370523":"广饶县"},"370600":{"370602":"芝罘区","370611":"福山区","370612":"牟平区","370613":"莱山区","370634":"长岛县","370681":"龙口市","370682":"莱阳市","370683":"莱州市","370684":"蓬莱市","370685":"招远市","370686":"栖霞市","370687":"海阳市"},"370700":{"370702":"潍城区","370703":"寒亭区","370704":"坊子区","370705":"奎文区","370724":"临朐县","370725":"昌乐县","370781":"青州市","370782":"诸城市","370783":"寿光市","370784":"安丘市","370785":"高密市","370786":"昌邑市"},"370800":{"370811":"任城区","370812":"兖州区","370826":"微山县","370827":"鱼台县","370828":"金乡县","370829":"嘉祥县","370830":"汶上县","370831":"泗水县","370832":"梁山县","370881":"曲阜市","370883":"邹城市"},"370900":{"370902":"泰山区","370911":"岱岳区","370921":"宁阳县","370923":"东平县","370982":"新泰市","370983":"肥城市"},"371000":{"371002":"环翠区","371003":"文登区","371082":"荣成市","371083":"乳山市"},"371100":{"371102":"东港区","371103":"岚山区","371121":"五莲县","371122":"莒县"},"371200":{"371202":"莱城区","371203":"钢城区"},"371300":{"371302":"兰山区","371311":"罗庄区","371312":"河东区","371321":"沂南县","371322":"郯城县","371323":"沂水县","371324":"兰陵县","371325":"费县","371326":"平邑县","371327":"莒南县","371328":"蒙阴县","371329":"临沭县"},"371400":{"371402":"德城区","371403":"陵城区","371422":"宁津县","371423":"庆云县","371424":"临邑县","371425":"齐河县","371426":"平原县","371427":"夏津县","371428":"武城县","371481":"乐陵市","371482":"禹城市"},"371500":{"371502":"东昌府区","371521":"阳谷县","371522":"莘县","371523":"茌平县","371524":"东阿县","371525":"冠县","371526":"高唐县","371581":"临清市"},"371600":{"371602":"滨城区","371603":"沾化区","371621":"惠民县","371622":"阳信县","371623":"无棣县","371625":"博兴县","371626":"邹平县"},"371700":{"371702":"牡丹区","371703":"定陶区","371721":"曹县","371722":"单县","371723":"成武县","371724":"巨野县","371725":"郓城县","371726":"鄄城县","371728":"东明县"},"410000":{"410100":"郑州市","410200":"开封市","410300":"洛阳市","410400":"平顶山市","410500":"安阳市","410600":"鹤壁市","410700":"新乡市","410800":"焦作市","410900":"濮阳市","411000":"许昌市","411100":"漯河市","411200":"三门峡市","411300":"南阳市","411400":"商丘市","411500":"信阳市","411600":"周口市","411700":"驻马店市","419001":"济源市"},"410100":{"410102":"中原区","410103":"二七区","410104":"管城回族区","410105":"金水区","410106":"上街区","410108":"惠济区","410122":"中牟县","410181":"巩义市","410182":"荥阳市","410183":"新密市","410184":"新郑市","410185":"登封市"},"410200":{"410202":"龙亭区","410203":"顺河回族区","410204":"鼓楼区","410205":"禹王台区","410211":"金明区","410212":"祥符区","410221":"杞县","410222":"通许县","410223":"尉氏县","410225":"兰考县"},"410300":{"410302":"老城区","410303":"西工区","410304":"瀍河回族区","410305":"涧西区","410306":"吉利区","410311":"洛龙区","410322":"孟津县","410323":"新安县","410324":"栾川县","410325":"嵩县","410326":"汝阳县","410327":"宜阳县","410328":"洛宁县","410329":"伊川县","410381":"偃师市"},"410400":{"410402":"新华区","410403":"卫东区","410404":"石龙区","410411":"湛河区","410421":"宝丰县","410422":"叶县","410423":"鲁山县","410425":"郏县","410481":"舞钢市","410482":"汝州市"},"410500":{"410502":"文峰区","410503":"北关区","410505":"殷都区","410506":"龙安区","410522":"安阳县","410523":"汤阴县","410526":"滑县","410527":"内黄县","410581":"林州市"},"410600":{"410602":"鹤山区","410603":"山城区","410611":"淇滨区","410621":"浚县","410622":"淇县"},"410700":{"410702":"红旗区","410703":"卫滨区","410704":"凤泉区","410711":"牧野区","410721":"新乡县","410724":"获嘉县","410725":"原阳县","410726":"延津县","410727":"封丘县","410728":"长垣县","410781":"卫辉市","410782":"辉县市"},"410800":{"410802":"解放区","410803":"中站区","410804":"马村区","410811":"山阳区","410821":"修武县","410822":"博爱县","410823":"武陟县","410825":"温县","410882":"沁阳市","410883":"孟州市"},"410900":{"410902":"华龙区","410922":"清丰县","410923":"南乐县","410926":"范县","410927":"台前县","410928":"濮阳县"},"411000":{"411002":"魏都区","411023":"许昌县","411024":"鄢陵县","411025":"襄城县","411081":"禹州市","411082":"长葛市"},"411100":{"411102":"源汇区","411103":"郾城区","411104":"召陵区","411121":"舞阳县","411122":"临颍县"},"411200":{"411202":"湖滨区","411203":"陕州区","411221":"渑池县","411224":"卢氏县","411281":"义马市","411282":"灵宝市"},"411300":{"411302":"宛城区","411303":"卧龙区","411321":"南召县","411322":"方城县","411323":"西峡县","411324":"镇平县","411325":"内乡县","411326":"淅川县","411327":"社旗县","411328":"唐河县","411329":"新野县","411330":"桐柏县","411381":"邓州市"},"411400":{"411402":"梁园区","411403":"睢阳区","411421":"民权县","411422":"睢县","411423":"宁陵县","411424":"柘城县","411425":"虞城县","411426":"夏邑县","411481":"永城市"},"411500":{"411502":"浉河区","411503":"平桥区","411521":"罗山县","411522":"光山县","411523":"新县","411524":"商城县","411525":"固始县","411526":"潢川县","411527":"淮滨县","411528":"息县"},"411600":{"411602":"川汇区","411621":"扶沟县","411622":"西华县","411623":"商水县","411624":"沈丘县","411625":"郸城县","411626":"淮阳县","411627":"太康县","411628":"鹿邑县","411681":"项城市"},"411700":{"411702":"驿城区","411721":"西平县","411722":"上蔡县","411723":"平舆县","411724":"正阳县","411725":"确山县","411726":"泌阳县","411727":"汝南县","411728":"遂平县","411729":"新蔡县"},"419001":{"4190011":"济源市克井镇","41900111":"济源市下冶镇","419001001":"济源市沁园街道","419001002":"济源市济水街道","419001003":"济源市北海街道","419001004":"济源市天坛街道","419001005":"济源市玉泉街道","419001101":"济源市五龙口镇","419001102":"济源市轵城镇","419001103":"济源市承留镇","419001104":"济源市邵原镇","419001105":"济源市坡头镇","419001106":"济源市梨林镇","419001107":"济源市大峪镇","419001108":"济源市思礼镇","419001109":"济源市王屋镇"},"420000":{"420100":"武汉市","420200":"黄石市","420300":"十堰市","420500":"宜昌市","420600":"襄阳市","420700":"鄂州市","420800":"荆门市","420900":"孝感市","421000":"荆州市","421100":"黄冈市","421200":"咸宁市","421300":"随州市","422800":"恩施土家族苗族自治州","429004":"仙桃市","429005":"潜江市","429006":"天门市","429021":"神农架林区"},"420100":{"420102":"江岸区","420103":"江汉区","420104":"硚口区","420105":"汉阳区","420106":"武昌区","420107":"青山区","420111":"洪山区","420112":"东西湖区","420113":"汉南区","420114":"蔡甸区","420115":"江夏区","420116":"黄陂区","420117":"新洲区"},"420200":{"420202":"黄石港区","420203":"西塞山区","420204":"下陆区","420205":"铁山区","420222":"阳新县","420281":"大冶市"},"420300":{"420302":"茅箭区","420303":"张湾区","420304":"郧阳区","420322":"郧西县","420323":"竹山县","420324":"竹溪县","420325":"房县","420381":"丹江口市"},"420500":{"420502":"西陵区","420503":"伍家岗区","420504":"点军区","420505":"猇亭区","420506":"夷陵区","420525":"远安县","420526":"兴山县","420527":"秭归县","420528":"长阳土家族自治县","420529":"五峰土家族自治县","420581":"宜都市","420582":"当阳市","420583":"枝江市"},"420600":{"420602":"襄城区","420606":"樊城区","420607":"襄州区","420624":"南漳县","420625":"谷城县","420626":"保康县","420682":"老河口市","420683":"枣阳市","420684":"宜城市"},"420700":{"420702":"梁子湖区","420703":"华容区","420704":"鄂城区"},"420800":{"420802":"东宝区","420804":"掇刀区","420821":"京山县","420822":"沙洋县","420881":"钟祥市"},"420900":{"420902":"孝南区","420921":"孝昌县","420922":"大悟县","420923":"云梦县","420981":"应城市","420982":"安陆市","420984":"汉川市"},"421000":{"421002":"沙市区","421003":"荆州区","421022":"公安县","421023":"监利县","421024":"江陵县","421081":"石首市","421083":"洪湖市","421087":"松滋市"},"421100":{"421102":"黄州区","421121":"团风县","421122":"红安县","421123":"罗田县","421124":"英山县","421125":"浠水县","421126":"蕲春县","421127":"黄梅县","421181":"麻城市","421182":"武穴市"},"421200":{"421202":"咸安区","421221":"嘉鱼县","421222":"通城县","421223":"崇阳县","421224":"通山县","421281":"赤壁市"},"421300":{"421303":"曾都区","421321":"随县","421381":"广水市"},"422800":{"422801":"恩施市","422802":"利川市","422822":"建始县","422823":"巴东县","422825":"宣恩县","422826":"咸丰县","422827":"来凤县","422828":"鹤峰县"},"429004":{"4290041":"郑场镇","4290044":"工业园区","42900411":"张沟镇","429004001":"沙嘴街道","429004002":"干河街道","429004003":"龙华山","429004101":"毛嘴镇","429004102":"豆河镇","429004103":"三伏潭镇","429004104":"胡场镇","429004105":"长倘口镇","429004106":"西流河镇","429004107":"沙湖镇","429004108":"杨林尾镇","429004109":"彭场镇","429004111":"郭河镇","429004112":"沔城回族镇","429004113":"通海口镇","429004114":"陈场镇","429004401":"九合垸原种场","429004402":"沙湖原种场","429004404":"五湖渔场","429004405":"赵西垸林场","429004407":"畜禽良种场","429004408":"排湖风景区"},"429005":{"4290051":"竹根滩镇","4290054":"江汉石油管理局","42900545":"周矶管理区","429005001":"园林","429005002":"杨市","429005003":"周矶","429005004":"广华","429005005":"泰丰","429005006":"高场","429005101":"渔洋镇","429005102":"王场镇","429005103":"高石碑镇","429005104":"熊口镇","429005105":"老新镇","429005106":"浩口镇","429005107":"积玉口镇","429005108":"张金镇","429005109":"龙湾镇","429005401":"潜江经济开发区","429005451":"后湖管理区","429005452":"熊口管理区","429005453":"总口管理区","429005454":"白鹭湖管理区","429005455":"运粮湖管理区","429005457":"浩口原种场"},"429006":{"4290061":"多宝镇","42900611":"麻洋镇","42900612":"石河镇","42900645":"蒋湖农场","429006001":"竟陵街道","429006002":"侨乡街道开发区","429006003":"杨林街道","429006101":"拖市镇","429006102":"张港镇","429006103":"蒋场镇","429006104":"汪场镇","429006105":"渔薪镇","429006106":"黄潭镇","429006107":"岳口镇","429006108":"横林镇","429006109":"彭市镇","429006111":"多祥镇","429006112":"干驿镇","429006113":"马湾镇","429006114":"卢市镇","429006115":"小板镇","429006116":"九真镇","429006118":"皂市镇","429006119":"胡市镇","429006121":"佛子山镇","429006201":"净潭乡","429006451":"白茅湖农场","429006452":"沉湖管委会"},"429021":{"4290211":"松柏镇","4290212":"宋洛乡","429021101":"阳日镇","429021102":"木鱼镇","429021103":"红坪镇","429021104":"新华镇","429021105":"九湖镇","429021202":"下谷坪土家族乡"},"430000":{"430100":"长沙市","430200":"株洲市","430300":"湘潭市","430400":"衡阳市","430500":"邵阳市","430600":"岳阳市","430700":"常德市","430800":"张家界市","430900":"益阳市","431000":"郴州市","431100":"永州市","431200":"怀化市","431300":"娄底市","433100":"湘西土家族苗族自治州"},"430100":{"430102":"芙蓉区","430103":"天心区","430104":"岳麓区","430105":"开福区","430111":"雨花区","430112":"望城区","430121":"长沙县","430124":"宁乡县","430181":"浏阳市"},"430200":{"430202":"荷塘区","430203":"芦淞区","430204":"石峰区","430211":"天元区","430221":"株洲县","430223":"攸县","430224":"茶陵县","430225":"炎陵县","430281":"醴陵市"},"430300":{"430302":"雨湖区","430304":"岳塘区","430321":"湘潭县","430381":"湘乡市","430382":"韶山市"},"430400":{"430405":"珠晖区","430406":"雁峰区","430407":"石鼓区","430408":"蒸湘区","430412":"南岳区","430421":"衡阳县","430422":"衡南县","430423":"衡山县","430424":"衡东县","430426":"祁东县","430481":"耒阳市","430482":"常宁市"},"430500":{"430502":"双清区","430503":"大祥区","430511":"北塔区","430521":"邵东县","430522":"新邵县","430523":"邵阳县","430524":"隆回县","430525":"洞口县","430527":"绥宁县","430528":"新宁县","430529":"城步苗族自治县","430581":"武冈市"},"430600":{"430602":"岳阳楼区","430603":"云溪区","430611":"君山区","430621":"岳阳县","430623":"华容县","430624":"湘阴县","430626":"平江县","430681":"汨罗市","430682":"临湘市"},"430700":{"430702":"武陵区","430703":"鼎城区","430721":"安乡县","430722":"汉寿县","430723":"澧县","430724":"临澧县","430725":"桃源县","430726":"石门县","430781":"津市市"},"430800":{"430802":"永定区","430811":"武陵源区","430821":"慈利县","430822":"桑植县"},"430900":{"430902":"资阳区","430903":"赫山区","430921":"南县","430922":"桃江县","430923":"安化县","430981":"沅江市"},"431000":{"431002":"北湖区","431003":"苏仙区","431021":"桂阳县","431022":"宜章县","431023":"永兴县","431024":"嘉禾县","431025":"临武县","431026":"汝城县","431027":"桂东县","431028":"安仁县","431081":"资兴市"},"431100":{"431102":"零陵区","431103":"冷水滩区","431121":"祁阳县","431122":"东安县","431123":"双牌县","431124":"道县","431125":"江永县","431126":"宁远县","431127":"蓝山县","431128":"新田县","431129":"江华瑶族自治县"},"431200":{"431202":"鹤城区","431221":"中方县","431222":"沅陵县","431223":"辰溪县","431224":"溆浦县","431225":"会同县","431226":"麻阳苗族自治县","431227":"新晃侗族自治县","431228":"芷江侗族自治县","431229":"靖州苗族侗族自治县","431230":"通道侗族自治县","431281":"洪江市"},"431300":{"431302":"娄星区","431321":"双峰县","431322":"新化县","431381":"冷水江市","431382":"涟源市"},"433100":{"433101":"吉首市","433122":"泸溪县","433123":"凤凰县","433124":"花垣县","433125":"保靖县","433126":"古丈县","433127":"永顺县","433130":"龙山县"},"440000":{"440100":"广州市","440200":"韶关市","440300":"深圳市","440400":"珠海市","440500":"汕头市","440600":"佛山市","440700":"江门市","440800":"湛江市","440900":"茂名市","441200":"肇庆市","441300":"惠州市","441400":"梅州市","441500":"汕尾市","441600":"河源市","441700":"阳江市","441800":"清远市","441900":"东莞市","442000":"中山市","445100":"潮州市","445200":"揭阳市","445300":"云浮市"},"440100":{"440103":"荔湾区","440104":"越秀区","440105":"海珠区","440106":"天河区","440111":"白云区","440112":"黄埔区","440113":"番禺区","440114":"花都区","440115":"南沙区","440117":"从化区","440118":"增城区"},"440200":{"440203":"武江区","440204":"浈江区","440205":"曲江区","440222":"始兴县","440224":"仁化县","440229":"翁源县","440232":"乳源瑶族自治县","440233":"新丰县","440281":"乐昌市","440282":"南雄市"},"440300":{"440303":"罗湖区","440304":"福田区","440305":"南山区","440306":"宝安区","440307":"龙岗区","440308":"盐田区"},"440400":{"440402":"香洲区","440403":"斗门区","440404":"金湾区"},"440500":{"440507":"龙湖区","440511":"金平区","440512":"濠江区","440513":"潮阳区","440514":"潮南区","440515":"澄海区","440523":"南澳县"},"440600":{"440604":"禅城区","440605":"南海区","440606":"顺德区","440607":"三水区","440608":"高明区"},"440700":{"440703":"蓬江区","440704":"江海区","440705":"新会区","440781":"台山市","440783":"开平市","440784":"鹤山市","440785":"恩平市"},"440800":{"440802":"赤坎区","440803":"霞山区","440804":"坡头区","440811":"麻章区","440823":"遂溪县","440825":"徐闻县","440881":"廉江市","440882":"雷州市","440883":"吴川市"},"440900":{"440902":"茂南区","440904":"电白区","440981":"高州市","440982":"化州市","440983":"信宜市"},"441200":{"441202":"端州区","441203":"鼎湖区","441204":"高要区","441223":"广宁县","441224":"怀集县","441225":"封开县","441226":"德庆县","441284":"四会市"},"441300":{"441302":"惠城区","441303":"惠阳区","441322":"博罗县","441323":"惠东县","441324":"龙门县"},"441400":{"441402":"梅江区","441403":"梅县区","441422":"大埔县","441423":"丰顺县","441424":"五华县","441426":"平远县","441427":"蕉岭县","441481":"兴宁市"},"441500":{"441502":"城区","441521":"海丰县","441523":"陆河县","441581":"陆丰市"},"441600":{"441602":"源城区","441621":"紫金县","441622":"龙川县","441623":"连平县","441624":"和平县","441625":"东源县"},"441700":{"441702":"江城区","441704":"阳东区","441721":"阳西县","441781":"阳春市"},"441800":{"441802":"清城区","441803":"清新区","441821":"佛冈县","441823":"阳山县","441825":"连山壮族瑶族自治县","441826":"连南瑶族自治县","441881":"英德市","441882":"连州市"},"441900":{"441900003":"东城街道","441900004":"南城街道","441900005":"万江街道","441900006":"莞城街道","441900101":"石碣镇","441900102":"石龙镇","441900103":"茶山镇","441900104":"石排镇","441900105":"企石镇","441900106":"横沥镇","441900107":"桥头镇","441900108":"谢岗镇","441900109":"东坑镇","441900110":"常平镇","441900111":"寮步镇","441900112":"樟木头镇","441900113":"大朗镇","441900114":"黄江镇","441900115":"清溪镇","441900116":"塘厦镇","441900117":"凤岗镇","441900118":"大岭山镇","441900119":"长安镇","441900121":"虎门镇","441900122":"厚街镇","441900123":"沙田镇","441900124":"道滘镇","441900125":"洪梅镇","441900126":"麻涌镇","441900127":"望牛墩镇","441900128":"中堂镇","441900129":"高埗镇","441900401":"松山湖管委会","441900402":"虎门港管委会","441900403":"东莞生态园"},"442000":{"442000001":"石岐区街道","442000002":"东区街道","442000003":"火炬开发区街道","442000004":"西区街道","442000005":"南区街道","442000006":"五桂山街道","442000100":"小榄镇","442000101":"黄圃镇","442000102":"民众镇","442000103":"东凤镇","442000104":"东升镇","442000105":"古镇镇","442000106":"沙溪镇","442000107":"坦洲镇","442000108":"港口镇","442000109":"三角镇","442000110":"横栏镇","442000111":"南头镇","442000112":"阜沙镇","442000113":"南朗镇","442000114":"三乡镇","442000115":"板芙镇","442000116":"大涌镇","442000117":"神湾镇"},"445100":{"445102":"湘桥区","445103":"潮安区","445122":"饶平县"},"445200":{"445202":"榕城区","445203":"揭东区","445222":"揭西县","445224":"惠来县","445281":"普宁市"},"445300":{"445302":"云城区","445303":"云安区","445321":"新兴县","445322":"郁南县","445381":"罗定市"},"450000":{"450100":"南宁市","450200":"柳州市","450300":"桂林市","450400":"梧州市","450500":"北海市","450600":"防城港市","450700":"钦州市","450800":"贵港市","450900":"玉林市","451000":"百色市","451100":"贺州市","451200":"河池市","451300":"来宾市","451400":"崇左市"},"450100":{"450102":"兴宁区","450103":"青秀区","450105":"江南区","450107":"西乡塘区","450108":"良庆区","450109":"邕宁区","450110":"武鸣区","450123":"隆安县","450124":"马山县","450125":"上林县","450126":"宾阳县","450127":"横县"},"450200":{"450202":"城中区","450203":"鱼峰区","450204":"柳南区","450205":"柳北区","450206":"柳江区","450222":"柳城县","450223":"鹿寨县","450224":"融安县","450225":"融水苗族自治县","450226":"三江侗族自治县"},"450300":{"450302":"秀峰区","450303":"叠彩区","450304":"象山区","450305":"七星区","450311":"雁山区","450312":"临桂区","450321":"阳朔县","450323":"灵川县","450324":"全州县","450325":"兴安县","450326":"永福县","450327":"灌阳县","450328":"龙胜各族自治县","450329":"资源县","450330":"平乐县","450331":"荔浦县","450332":"恭城瑶族自治县"},"450400":{"450403":"万秀区","450405":"长洲区","450406":"龙圩区","450421":"苍梧县","450422":"藤县","450423":"蒙山县","450481":"岑溪市"},"450500":{"450502":"海城区","450503":"银海区","450512":"铁山港区","450521":"合浦县"},"450600":{"450602":"港口区","450603":"防城区","450621":"上思县","450681":"东兴市"},"450700":{"450702":"钦南区","450703":"钦北区","450721":"灵山县","450722":"浦北县"},"450800":{"450802":"港北区","450803":"港南区","450804":"覃塘区","450821":"平南县","450881":"桂平市"},"450900":{"450902":"玉州区","450903":"福绵区","450921":"容县","450922":"陆川县","450923":"博白县","450924":"兴业县","450981":"北流市"},"451000":{"451002":"右江区","451021":"田阳县","451022":"田东县","451023":"平果县","451024":"德保县","451026":"那坡县","451027":"凌云县","451028":"乐业县","451029":"田林县","451030":"西林县","451031":"隆林各族自治县","451081":"靖西市"},"451100":{"451102":"八步区","451103":"平桂区","451121":"昭平县","451122":"钟山县","451123":"富川瑶族自治县"},"451200":{"451202":"金城江区","451221":"南丹县","451222":"天峨县","451223":"凤山县","451224":"东兰县","451225":"罗城仫佬族自治县","451226":"环江毛南族自治县","451227":"巴马瑶族自治县","451228":"都安瑶族自治县","451229":"大化瑶族自治县","451281":"宜州市"},"451300":{"451302":"兴宾区","451321":"忻城县","451322":"象州县","451323":"武宣县","451324":"金秀瑶族自治县","451381":"合山市"},"451400":{"451402":"江州区","451421":"扶绥县","451422":"宁明县","451423":"龙州县","451424":"大新县","451425":"天等县","451481":"凭祥市"},"460000":{"460100":"海口市","460200":"三亚市","460300":"三沙市","460400":"儋州市","469001":"五指山市","469002":"琼海市","469005":"文昌市","469006":"万宁市","469007":"东方市","469021":"定安县","469022":"屯昌县","469023":"澄迈县","469024":"临高县","469025":"白沙黎族自治县","469026":"昌江黎族自治县","469027":"乐东黎族自治县","469028":"陵水黎族自治县","469029":"保亭黎族苗族自治县","469030":"琼中黎族苗族自治县"},"460100":{"460105":"秀英区","460106":"龙华区","460107":"琼山区","460108":"美兰区"},"460200":{"460202":"海棠区","460203":"吉阳区","460204":"天涯区","460205":"崖州区"},"460300":{"460321":"西沙群岛","460322":"南沙群岛","460323":"中沙群岛的岛礁及其海域"},"460400":{"4604001":"那大镇","4604004":"国营西培农场","4604005":"华南热作学院","46040011":"三都镇","460400101":"和庆镇","460400102":"南丰镇","460400103":"大成镇","460400104":"雅星镇","460400105":"兰洋镇","460400106":"光村镇","460400107":"木棠镇","460400108":"海头镇","460400109":"峨蔓镇","460400111":"王五镇","460400112":"白马井镇","460400113":"中和镇","460400114":"排浦镇","460400115":"东成镇","460400116":"新州镇","460400404":"国营西联农场","460400405":"国营蓝洋农场","460400407":"国营八一农场","460400499":"洋浦经济开发区"},"469001":{"4690011":"通什镇","4690012":"畅好乡","4690014":"畅好农场","469001101":"南圣镇","469001102":"毛阳镇","469001103":"番阳镇","469001201":"毛道乡","469001202":"水满乡"},"469002":{"4690021":"嘉积镇","4690024":"国营东太农场","4690025":"彬村山华侨农场","46900211":"大路镇","469002101":"万泉镇","469002102":"石壁镇","469002103":"中原镇","469002104":"博鳌镇","469002105":"阳江镇","469002106":"龙江镇","469002107":"潭门镇","469002108":"塔洋镇","469002109":"长坡镇","469002111":"会山镇","469002402":"国营东红农场","469002403":"国营东升农场"},"469005":{"4690051":"文城镇","4690054":"国营东路农场","46900511":"昌洒镇","469005101":"重兴镇","469005102":"蓬莱镇","469005103":"会文镇","469005104":"东路镇","469005105":"潭牛镇","469005106":"东阁镇","469005107":"文教镇","469005108":"东郊镇","469005109":"龙楼镇","469005111":"翁田镇","469005112":"抱罗镇","469005113":"冯坡镇","469005114":"锦山镇","469005115":"铺前镇","469005116":"公坡镇","469005401":"国营南阳农场","469005402":"国营罗豆农场"},"469006":{"4690061":"万城镇","4690064":"国营东兴农场","4690065":"兴隆华侨农场","46900611":"南桥镇","469006101":"龙滚镇","469006102":"和乐镇","469006103":"后安镇","469006104":"大茂镇","469006105":"东澳镇","469006106":"礼纪镇","469006107":"长丰镇","469006108":"山根镇","469006109":"北大镇","469006111":"三更罗镇","469006401":"国营东和农场","469006404":"国营新中农场","469006501":"地方国营六连林场"},"469007":{"4690071":"八所镇","4690072":"天安乡","4690074":"国营广坝农场","4690075":"东方华侨农场","469007101":"东河镇","469007102":"大田镇","469007103":"感城镇","469007104":"板桥镇","469007105":"三家镇","469007106":"四更镇","469007107":"新龙镇","469007201":"江边乡"},"469021":{"4690211":"定城镇","4690214":"国营中瑞农场","469021101":"新竹镇","469021102":"龙湖镇","469021103":"黄竹镇","469021104":"雷鸣镇","469021105":"龙门镇","469021106":"龙河镇","469021107":"岭口镇","469021108":"翰林镇","469021109":"富文镇","469021401":"国营南海农场","469021402":"国营金鸡岭农场"},"469022":{"4690221":"屯城镇","4690224":"国营中建农场","469022101":"新兴镇","469022102":"枫木镇","469022103":"乌坡镇","469022104":"南吕镇","469022105":"南坤镇","469022106":"坡心镇","469022107":"西昌镇","469022401":"国营中坤农场"},"469023":{"4690231":"金江镇","4690234":"国营红光农场","46902311":"大丰镇","469023101":"老城镇","469023102":"瑞溪镇","469023103":"永发镇","469023104":"加乐镇","469023105":"文儒镇","469023106":"中兴镇","469023107":"仁兴镇","469023108":"福山镇","469023109":"桥头镇","469023402":"国营西达农场","469023405":"国营金安农场"},"469024":{"4690241":"临城镇","4690244":"国营红华农场","469024101":"波莲镇","469024102":"东英镇","469024103":"博厚镇","469024104":"皇桐镇","469024105":"多文镇","469024106":"和舍镇","469024107":"南宝镇","469024108":"新盈镇","469024109":"调楼镇","469024401":"国营加来农场"},"469025":{"4690251":"牙叉镇","4690252":"细水乡","469025101":"七坊镇","469025102":"邦溪镇","469025103":"打安镇","469025201":"元门乡","469025202":"南开乡","469025203":"阜龙乡","469025204":"青松乡","469025205":"金波乡","469025206":"荣邦乡","469025401":"国营白沙农场","469025404":"国营龙江农场","469025408":"国营邦溪农场"},"469026":{"4690261":"石碌镇","4690262":"王下乡","4690265":"国营霸王岭林场","469026101":"叉河镇","469026102":"十月田镇","469026103":"乌烈镇","469026104":"昌化镇","469026105":"海尾镇","469026106":"七叉镇","469026401":"国营红林农场","469026501":"海南矿业联合有限公司"},"469027":{"4690271":"抱由镇","4690275":"国营尖峰岭林业公司","46902711":"莺歌海镇","469027101":"万冲镇","469027102":"大安镇","469027103":"志仲镇","469027104":"千家镇","469027105":"九所镇","469027106":"利国镇","469027107":"黄流镇","469027108":"佛罗镇","469027109":"尖峰镇","469027401":"国营山荣农场","469027402":"国营乐光农场","469027405":"国营保国农场","469027501":"国营莺歌海盐场"},"469028":{"4690281":"椰林镇","4690282":"提蒙乡","4690284":"国营岭门农场","4690285":"国营吊罗山林业公司","469028101":"光坡镇","469028102":"三才镇","469028103":"英州镇","469028104":"隆广镇","469028105":"文罗镇","469028106":"本号镇","469028107":"新村镇","469028108":"黎安镇","469028201":"群英乡","469028401":"国营南平农场"},"469029":{"4690291":"保城镇","4690292":"六弓乡","469029101":"什玲镇","469029102":"加茂镇","469029103":"响水镇","469029104":"新政镇","469029105":"三道镇","469029201":"南林乡","469029202":"毛感乡","469029401":"国营新星农场","469029402":"海南保亭热带作物研究所","469029403":"国营金江农场","469029405":"国营三道农场"},"469030":{"4690301":"营根镇","4690302":"吊罗山乡","4690305":"海南黎母山省级自然保护区管理站","469030101":"湾岭镇","469030102":"黎母山镇","469030103":"和平镇","469030104":"长征镇","469030105":"红毛镇","469030106":"中平镇","469030201":"上安乡","469030202":"什运乡","469030402":"国营阳江农场","469030403":"国营乌石农场","469030406":"国营加钗农场","469030407":"国营长征农场"},"500000":{"500100":"市辖区","500228":"梁平县","500229":"城口县","500230":"丰都县","500231":"垫江县","500232":"武隆县","500233":"忠县","500235":"云阳县","500236":"奉节县","500237":"巫山县","500238":"巫溪县","500240":"石柱土家族自治县","500241":"秀山土家族苗族自治县","500242":"酉阳土家族苗族自治县","500243":"彭水苗族土家族自治县"},"500100":{"500101":"万州区","500102":"涪陵区","500103":"渝中区","500104":"大渡口区","500105":"江北区","500106":"沙坪坝区","500107":"九龙坡区","500108":"南岸区","500109":"北碚区","500110":"綦江区","500111":"大足区","500112":"渝北区","500113":"巴南区","500114":"黔江区","500115":"长寿区","500116":"江津区","500117":"合川区","500118":"永川区","500119":"南川区","500120":"璧山区","500151":"铜梁区","500152":"潼南区","500153":"荣昌区","500154":"开州区"},"500228":{"5002282":"安胜乡","5002284":"梁平县农场","50022811":"聚奎镇","50022812":"合兴镇","500228001":"梁平县梁山街道","500228002":"梁平县双桂街道","500228101":"仁贤镇","500228102":"礼让镇","500228103":"云龙镇","500228104":"屏锦镇","500228106":"袁驿镇","500228107":"新盛镇","500228108":"福禄镇","500228109":"金带镇","500228111":"明达镇","500228112":"荫平镇","500228113":"和林镇","500228114":"回龙镇","500228115":"碧山镇","500228116":"虎城镇","500228117":"七星镇","500228118":"龙门镇","500228119":"文化镇","500228121":"石安镇","500228122":"柏家镇","500228123":"大观镇","500228124":"竹山镇","500228125":"蟠龙镇","500228126":"星桥镇","500228127":"曲水镇","500228201":"铁门乡","500228202":"龙胜乡","500228203":"复平乡","500228205":"紫照乡","500228401":"梁平县双桂工业园区"},"500229":{"50022911":"咸宜镇","50022921":"双河乡","50022922":"厚坪乡","500229001":"葛城街道","500229002":"复兴街道","500229102":"巴山镇","500229103":"坪坝镇","500229104":"庙坝镇","500229105":"明通镇","500229106":"修齐镇","500229107":"高观镇","500229108":"高燕镇","500229109":"东安镇","500229111":"高楠镇","500229201":"龙田乡","500229202":"北屏乡","500229205":"左岚乡","500229208":"沿河乡","500229211":"蓼子乡","500229212":"鸡鸣乡","500229214":"周溪乡","500229216":"明中乡","500229217":"治平乡","500229219":"岚天乡","500229221":"河鱼乡"},"500230":{"500230":"名山街道","50023011":"兴义镇","50023012":"兴龙镇","50023021":"三建乡","500230101":"虎威镇","500230102":"社坛镇","500230103":"三元镇","500230104":"许明寺镇","500230105":"董家镇","500230106":"树人镇","500230107":"十直镇","500230109":"高家镇","500230111":"双路镇","500230112":"江池镇","500230113":"龙河镇","500230114":"武平镇","500230115":"包鸾镇","500230116":"湛普镇","500230118":"南天湖镇","500230119":"保合镇","500230121":"仁沙镇","500230122":"龙孔镇","500230123":"暨龙镇","500230124":"双龙镇","500230125":"仙女湖镇","500230202":"青龙乡","500230206":"太平坝乡","500230207":"都督乡","500230209":"栗子乡"},"500231":{"50023111":"太平镇","50023112":"裴兴镇","500231001":"桂溪街道","500231002":"桂阳街道","500231101":"新民镇","500231102":"沙坪镇","500231103":"周嘉镇","500231104":"普顺镇","500231105":"永安镇","500231106":"高安镇","500231107":"高峰镇","500231108":"五洞镇","500231109":"澄溪镇","500231111":"鹤游镇","500231112":"坪山镇","500231113":"砚台镇","500231114":"曹回镇","500231115":"杠家镇","500231116":"包家镇","500231117":"白家镇","500231118":"永平镇","500231119":"三溪镇","500231121":"黄沙镇","500231122":"长龙镇","500231202":"沙河乡","500231204":"大石乡"},"500232":{"5002321":"巷口镇","5002322":"凤来乡","50023211":"土坎镇","50023221":"后坪苗族土家族乡","500232101":"火炉镇","500232102":"白马镇","500232103":"鸭江镇","500232104":"长坝镇","500232105":"江口镇","500232106":"平桥镇","500232107":"羊角镇","500232108":"仙女山镇","500232109":"桐梓镇","500232111":"和顺镇","500232112":"双河镇","500232202":"庙垭乡","500232203":"石桥苗族土家族乡","500232205":"黄莺乡","500232206":"沧沟乡","500232207":"文复苗族土家族乡","500232208":"土地乡","500232209":"白云乡","500232211":"浩口苗族仡佬族乡","500232212":"接龙乡","500232213":"赵家乡","500232214":"大洞河乡"},"500233":{"50023311":"官坝镇","50023312":"白石镇","50023321":"兴峰乡","500233001":"忠州街道","500233002":"白公街道","500233101":"新生镇","500233102":"任家镇","500233103":"乌杨镇","500233104":"洋渡镇","500233105":"东溪镇","500233106":"复兴镇","500233107":"石宝镇","500233108":"汝溪镇","500233109":"野鹤镇","500233111":"石黄镇","500233112":"马灌镇","500233113":"金鸡镇","500233114":"新立镇","500233115":"双桂镇","500233116":"拔山镇","500233117":"花桥镇","500233118":"永丰镇","500233119":"三汇镇","500233122":"黄金镇","500233201":"善广乡","500233203":"石子乡","500233204":"磨子土家族乡","500233206":"涂井乡","500233208":"金声乡"},"500235":{"50023513":"桑坪镇","50023514":"蔈草镇","500235001":"双江街道","500235002":"青龙街道","500235003":"人和街道","500235004":"盘龙街道","500235105":"龙角镇","500235107":"故陵镇","500235108":"红狮镇","500235115":"路阳镇","500235116":"农坝镇","500235118":"渠马镇","500235121":"黄石镇","500235122":"巴阳镇","500235123":"沙市镇","500235124":"鱼泉镇","500235125":"凤鸣镇","500235127":"宝坪镇","500235128":"南溪镇","500235129":"双土镇","500235131":"江口镇","500235132":"高阳镇","500235133":"平安镇","500235135":"云阳镇","500235136":"云安镇","500235137":"栖霞镇","500235138":"双龙镇","500235139":"泥溪镇","500235141":"养鹿镇","500235142":"水口镇","500235143":"堰坪镇","500235144":"龙洞镇","500235145":"后叶镇","500235146":"耀灵镇","500235147":"大阳镇","500235208":"外郎乡","500235215":"新津乡","500235216":"普安乡","500235218":"洞鹿乡","500235219":"石门乡","500235239":"上坝乡","500235242":"清水土家族自治乡"},"500236":{"50023612":"康乐镇","50023613":"新民镇","50023627":"康坪乡","500236001":"永安街道","500236002":"鱼复街道","500236003":"夔门街道","500236117":"白帝镇","500236118":"草堂镇","500236119":"汾河镇","500236121":"大树镇","500236122":"竹园镇","500236123":"公平镇","500236124":"朱衣镇","500236125":"甲高镇","500236126":"羊市镇","500236127":"吐祥镇","500236128":"兴隆镇","500236129":"青龙镇","500236131":"永乐镇","500236132":"安坪镇","500236133":"五马镇","500236134":"青莲镇","500236265":"岩湾乡","500236266":"平安乡","500236267":"红土乡","500236269":"石岗乡","500236272":"太和土家族乡","500236274":"鹤峰乡","500236275":"冯坪乡","500236276":"长安土家族乡","500236277":"龙桥土家族乡","500236278":"云雾土家族乡"},"500237":{"5002372":"红椿乡","50023711":"铜鼓镇","50023721":"建坪乡","500237001":"高唐街道","500237002":"龙门街道","500237101":"庙宇镇","500237102":"大昌镇","500237103":"福田镇","500237104":"龙溪镇","500237105":"双龙镇","500237106":"官阳镇","500237107":"骡坪镇","500237108":"抱龙镇","500237109":"官渡镇","500237111":"巫峡镇","500237207":"两坪乡","500237208":"曲尺乡","500237211":"大溪乡","500237214":"金坪乡","500237216":"平河乡","500237219":"当阳乡","500237222":"竹贤乡","500237225":"三溪乡","500237227":"培石乡","500237229":"笃坪乡","500237231":"邓家乡"},"500238":{"5002381":"城厢镇","5002384":"红池坝经济开发区","50023811":"峰灵镇","50023821":"长桂乡","50023824":"双阳乡","500238001":"宁河街道","500238002":"柏杨街道","500238101":"凤凰镇","500238102":"宁厂镇","500238103":"上磺镇","500238104":"古路镇","500238105":"文峰镇","500238106":"徐家镇","500238107":"白鹿镇","500238108":"尖山镇","500238109":"下堡镇","500238111":"塘坊镇","500238112":"朝阳镇","500238113":"田坝镇","500238114":"通城镇","500238115":"菱角镇","500238116":"蒲莲镇","500238117":"土城镇","500238204":"胜利乡","500238207":"大河乡","500238208":"天星乡","500238226":"鱼鳞乡","500238227":"乌龙乡","500238234":"中岗乡","500238237":"花台乡","500238239":"兰英乡","500238242":"中梁乡","500238243":"天元乡"},"500240":{"500240":"下路街道","50024011":"龙沙镇","50024021":"石家乡","500240101":"西沱镇","500240103":"悦崃镇","500240104":"临溪镇","500240105":"黄水镇","500240106":"马武镇","500240107":"沙子镇","500240108":"王场镇","500240109":"沿溪镇","500240111":"鱼池镇","500240112":"三河镇","500240113":"大歇镇","500240114":"桥头镇","500240115":"万朝镇","500240116":"冷水镇","500240117":"黄鹤镇","500240203":"黎场乡","500240204":"三星乡","500240205":"六塘乡","500240207":"三益乡","500240208":"王家乡","500240209":"河嘴乡","500240212":"枫木乡","500240213":"中益乡","500240214":"洗新乡","500240216":"龙潭乡","500240217":"新乐乡","500240218":"金铃乡","500240219":"金竹乡"},"500241":{"50024111":"雅江镇","500241001":"中和街道","500241002":"乌杨街道","500241003":"平凯街道","500241102":"清溪场镇","500241103":"隘口镇","500241104":"溶溪镇","500241105":"官庄镇","500241106":"龙池镇","500241107":"石堤镇","500241108":"峨溶镇","500241109":"洪安镇","500241111":"石耶镇","500241112":"梅江镇","500241113":"兰桥镇","500241114":"膏田镇","500241115":"溪口镇","500241116":"妙泉镇","500241117":"宋农镇","500241118":"里仁镇","500241119":"钟灵镇","500241201":"孝溪乡","500241207":"海洋乡","500241208":"大溪乡","500241211":"涌洞乡","500241214":"中平乡","500241215":"岑溪乡"},"500242":{"5002422":"涂市乡","50024211":"泔溪镇","50024221":"后坪乡","50024222":"清泉乡","500242001":"桃花源街道","500242002":"钟多街道","500242101":"龙潭镇","500242102":"麻旺镇","500242103":"酉酬镇","500242104":"大溪镇","500242105":"兴隆镇","500242106":"黑水镇","500242107":"丁市镇","500242108":"龚滩镇","500242109":"李溪镇","500242111":"酉水河镇","500242112":"苍岭镇","500242113":"小河镇","500242114":"板溪镇","500242202":"铜鼓乡","500242204":"可大乡","500242205":"偏柏乡","500242206":"五福乡","500242207":"木叶乡","500242208":"毛坝乡","500242209":"花田乡","500242211":"天馆乡","500242212":"宜居乡","500242213":"万木乡","500242214":"两罾乡","500242215":"板桥乡","500242216":"官清乡","500242217":"南腰界乡","500242218":"车田乡","500242219":"腴地乡","500242221":"庙溪乡","500242222":"浪坪乡","500242223":"双泉乡","500242224":"楠木乡"},"500243":{"50024311":"万足镇","50024321":"走马乡","500243001":"汉葭街道","500243002":"绍庆街道","500243003":"靛水街道","500243101":"保家镇","500243102":"郁山镇","500243103":"高谷镇","500243104":"桑柘镇","500243105":"鹿角镇","500243106":"黄家镇","500243107":"普子镇","500243108":"龙射镇","500243109":"连湖镇","500243111":"平安镇","500243112":"长生镇","500243113":"新田镇","500243114":"鞍子镇","500243115":"太原镇","500243116":"龙溪镇","500243117":"梅子垭镇","500243118":"大同镇","500243201":"岩东乡","500243202":"鹿鸣乡","500243204":"棣棠乡","500243206":"三义乡","500243207":"联合乡","500243208":"石柳乡","500243211":"芦塘乡","500243213":"乔梓乡","500243217":"诸佛乡","500243219":"桐楼乡","500243222":"善感乡","500243223":"双龙乡","500243224":"石盘乡","500243225":"大垭乡","500243226":"润溪乡","500243227":"朗溪乡","500243228":"龙塘乡"},"510000":{"510100":"成都市","510300":"自贡市","510400":"攀枝花市","510500":"泸州市","510600":"德阳市","510700":"绵阳市","510800":"广元市","510900":"遂宁市","511000":"内江市","511100":"乐山市","511300":"南充市","511400":"眉山市","511500":"宜宾市","511600":"广安市","511700":"达州市","511800":"雅安市","511900":"巴中市","512000":"资阳市","513200":"阿坝藏族羌族自治州","513300":"甘孜藏族自治州","513400":"凉山彝族自治州"},"510100":{"510104":"锦江区","510105":"青羊区","510106":"金牛区","510107":"武侯区","510108":"成华区","510112":"龙泉驿区","510113":"青白江区","510114":"新都区","510115":"温江区","510116":"双流区","510121":"金堂县","510124":"郫县","510129":"大邑县","510131":"蒲江县","510132":"新津县","510181":"都江堰市","510182":"彭州市","510183":"邛崃市","510184":"崇州市","510185":"简阳市"},"510300":{"510302":"自流井区","510303":"贡井区","510304":"大安区","510311":"沿滩区","510321":"荣县","510322":"富顺县"},"510400":{"510402":"东区","510403":"西区","510411":"仁和区","510421":"米易县","510422":"盐边县"},"510500":{"510502":"江阳区","510503":"纳溪区","510504":"龙马潭区","510521":"泸县","510522":"合江县","510524":"叙永县","510525":"古蔺县"},"510600":{"510603":"旌阳区","510623":"中江县","510626":"罗江县","510681":"广汉市","510682":"什邡市","510683":"绵竹市"},"510700":{"510703":"涪城区","510704":"游仙区","510705":"安州区","510722":"三台县","510723":"盐亭县","510725":"梓潼县","510726":"北川羌族自治县","510727":"平武县","510781":"江油市"},"510800":{"510802":"利州区","510811":"昭化区","510812":"朝天区","510821":"旺苍县","510822":"青川县","510823":"剑阁县","510824":"苍溪县"},"510900":{"510903":"船山区","510904":"安居区","510921":"蓬溪县","510922":"射洪县","510923":"大英县"},"511000":{"511002":"市中区","511011":"东兴区","511024":"威远县","511025":"资中县","511028":"隆昌县"},"511100":{"511102":"市中区","511111":"沙湾区","511112":"五通桥区","511113":"金口河区","511123":"犍为县","511124":"井研县","511126":"夹江县","511129":"沐川县","511132":"峨边彝族自治县","511133":"马边彝族自治县","511181":"峨眉山市"},"511300":{"511302":"顺庆区","511303":"高坪区","511304":"嘉陵区","511321":"南部县","511322":"营山县","511323":"蓬安县","511324":"仪陇县","511325":"西充县","511381":"阆中市"},"511400":{"511402":"东坡区","511403":"彭山区","511421":"仁寿县","511423":"洪雅县","511424":"丹棱县","511425":"青神县"},"511500":{"511502":"翠屏区","511503":"南溪区","511521":"宜宾县","511523":"江安县","511524":"长宁县","511525":"高县","511526":"珙县","511527":"筠连县","511528":"兴文县","511529":"屏山县"},"511600":{"511602":"广安区","511603":"前锋区","511621":"岳池县","511622":"武胜县","511623":"邻水县","511681":"华蓥市"},"511700":{"511702":"通川区","511703":"达川区","511722":"宣汉县","511723":"开江县","511724":"大竹县","511725":"渠县","511781":"万源市"},"511800":{"511802":"雨城区","511803":"名山区","511822":"荥经县","511823":"汉源县","511824":"石棉县","511825":"天全县","511826":"芦山县","511827":"宝兴县"},"511900":{"511902":"巴州区","511903":"恩阳区","511921":"通江县","511922":"南江县","511923":"平昌县"},"512000":{"512002":"雁江区","512021":"安岳县","512022":"乐至县"},"513200":{"513201":"马尔康市","513221":"汶川县","513222":"理县","513223":"茂县","513224":"松潘县","513225":"九寨沟县","513226":"金川县","513227":"小金县","513228":"黑水县","513230":"壤塘县","513231":"阿坝县","513232":"若尔盖县","513233":"红原县"},"513300":{"513301":"康定市","513322":"泸定县","513323":"丹巴县","513324":"九龙县","513325":"雅江县","513326":"道孚县","513327":"炉霍县","513328":"甘孜县","513329":"新龙县","513330":"德格县","513331":"白玉县","513332":"石渠县","513333":"色达县","513334":"理塘县","513335":"巴塘县","513336":"乡城县","513337":"稻城县","513338":"得荣县"},"513400":{"513401":"西昌市","513422":"木里藏族自治县","513423":"盐源县","513424":"德昌县","513425":"会理县","513426":"会东县","513427":"宁南县","513428":"普格县","513429":"布拖县","513430":"金阳县","513431":"昭觉县","513432":"喜德县","513433":"冕宁县","513434":"越西县","513435":"甘洛县","513436":"美姑县","513437":"雷波县"},"520000":{"520100":"贵阳市","520200":"六盘水市","520300":"遵义市","520400":"安顺市","520500":"毕节市","520600":"铜仁市","522300":"黔西南布依族苗族自治州","522600":"黔东南苗族侗族自治州","522700":"黔南布依族苗族自治州"},"520100":{"520102":"南明区","520103":"云岩区","520111":"花溪区","520112":"乌当区","520113":"白云区","520115":"观山湖区","520121":"开阳县","520122":"息烽县","520123":"修文县","520181":"清镇市"},"520200":{"520201":"钟山区","520203":"六枝特区","520221":"水城县","520222":"盘县"},"520300":{"520302":"红花岗区","520303":"汇川区","520304":"播州区","520322":"桐梓县","520323":"绥阳县","520324":"正安县","520325":"道真仡佬族苗族自治县","520326":"务川仡佬族苗族自治县","520327":"凤冈县","520328":"湄潭县","520329":"余庆县","520330":"习水县","520381":"赤水市","520382":"仁怀市"},"520400":{"520402":"西秀区","520403":"平坝区","520422":"普定县","520423":"镇宁布依族苗族自治县","520424":"关岭布依族苗族自治县","520425":"紫云苗族布依族自治县"},"520500":{"520502":"七星关区","520521":"大方县","520522":"黔西县","520523":"金沙县","520524":"织金县","520525":"纳雍县","520526":"威宁彝族回族苗族自治县","520527":"赫章县"},"520600":{"520602":"碧江区","520603":"万山区","520621":"江口县","520622":"玉屏侗族自治县","520623":"石阡县","520624":"思南县","520625":"印江土家族苗族自治县","520626":"德江县","520627":"沿河土家族自治县","520628":"松桃苗族自治县"},"522300":{"522301":"兴义市","522322":"兴仁县","522323":"普安县","522324":"晴隆县","522325":"贞丰县","522326":"望谟县","522327":"册亨县","522328":"安龙县"},"522600":{"522601":"凯里市","522622":"黄平县","522623":"施秉县","522624":"三穗县","522625":"镇远县","522626":"岑巩县","522627":"天柱县","522628":"锦屏县","522629":"剑河县","522630":"台江县","522631":"黎平县","522632":"榕江县","522633":"从江县","522634":"雷山县","522635":"麻江县","522636":"丹寨县"},"522700":{"522701":"都匀市","522702":"福泉市","522722":"荔波县","522723":"贵定县","522725":"瓮安县","522726":"独山县","522727":"平塘县","522728":"罗甸县","522729":"长顺县","522730":"龙里县","522731":"惠水县","522732":"三都水族自治县"},"530000":{"530100":"昆明市","530300":"曲靖市","530400":"玉溪市","530500":"保山市","530600":"昭通市","530700":"丽江市","530800":"普洱市","530900":"临沧市","532300":"楚雄彝族自治州","532500":"红河哈尼族彝族自治州","532600":"文山壮族苗族自治州","532800":"西双版纳傣族自治州","532900":"大理白族自治州","533100":"德宏傣族景颇族自治州","533300":"怒江傈僳族自治州","533400":"迪庆藏族自治州"},"530100":{"530102":"五华区","530103":"盘龙区","530111":"官渡区","530112":"西山区","530113":"东川区","530114":"呈贡区","530122":"晋宁县","530124":"富民县","530125":"宜良县","530126":"石林彝族自治县","530127":"嵩明县","530128":"禄劝彝族苗族自治县","530129":"寻甸回族彝族自治县","530181":"安宁市"},"530300":{"530302":"麒麟区","530303":"沾益区","530321":"马龙县","530322":"陆良县","530323":"师宗县","530324":"罗平县","530325":"富源县","530326":"会泽县","530381":"宣威市"},"530400":{"530402":"红塔区","530403":"江川区","530422":"澄江县","530423":"通海县","530424":"华宁县","530425":"易门县","530426":"峨山彝族自治县","530427":"新平彝族傣族自治县","530428":"元江哈尼族彝族傣族自治县"},"530500":{"530502":"隆阳区","530521":"施甸县","530523":"龙陵县","530524":"昌宁县","530581":"腾冲市"},"530600":{"530602":"昭阳区","530621":"鲁甸县","530622":"巧家县","530623":"盐津县","530624":"大关县","530625":"永善县","530626":"绥江县","530627":"镇雄县","530628":"彝良县","530629":"威信县","530630":"水富县"},"530700":{"530702":"古城区","530721":"玉龙纳西族自治县","530722":"永胜县","530723":"华坪县","530724":"宁蒗彝族自治县"},"530800":{"530802":"思茅区","530821":"宁洱哈尼族彝族自治县","530822":"墨江哈尼族自治县","530823":"景东彝族自治县","530824":"景谷傣族彝族自治县","530825":"镇沅彝族哈尼族拉祜族自治县","530826":"江城哈尼族彝族自治县","530827":"孟连傣族拉祜族佤族自治县","530828":"澜沧拉祜族自治县","530829":"西盟佤族自治县"},"530900":{"530902":"临翔区","530921":"凤庆县","530922":"云县","530923":"永德县","530924":"镇康县","530925":"双江拉祜族佤族布朗族傣族自治县","530926":"耿马傣族佤族自治县","530927":"沧源佤族自治县"},"532300":{"532301":"楚雄市","532322":"双柏县","532323":"牟定县","532324":"南华县","532325":"姚安县","532326":"大姚县","532327":"永仁县","532328":"元谋县","532329":"武定县","532331":"禄丰县"},"532500":{"532501":"个旧市","532502":"开远市","532503":"蒙自市","532504":"弥勒市","532523":"屏边苗族自治县","532524":"建水县","532525":"石屏县","532527":"泸西县","532528":"元阳县","532529":"红河县","532530":"金平苗族瑶族傣族自治县","532531":"绿春县","532532":"河口瑶族自治县"},"532600":{"532601":"文山市","532622":"砚山县","532623":"西畴县","532624":"麻栗坡县","532625":"马关县","532626":"丘北县","532627":"广南县","532628":"富宁县"},"532800":{"532801":"景洪市","532822":"勐海县","532823":"勐腊县"},"532900":{"532901":"大理市","532922":"漾濞彝族自治县","532923":"祥云县","532924":"宾川县","532925":"弥渡县","532926":"南涧彝族自治县","532927":"巍山彝族回族自治县","532928":"永平县","532929":"云龙县","532930":"洱源县","532931":"剑川县","532932":"鹤庆县"},"533100":{"533102":"瑞丽市","533103":"芒市","533122":"梁河县","533123":"盈江县","533124":"陇川县"},"533300":{"533301":"泸水市","533323":"福贡县","533324":"贡山独龙族怒族自治县","533325":"兰坪白族普米族自治县"},"533400":{"533401":"香格里拉市","533422":"德钦县","533423":"维西傈僳族自治县"},"540000":{"540100":"拉萨市","540200":"日喀则市","540300":"昌都市","540400":"林芝市","540500":"山南市","542400":"那曲地区","542500":"阿里地区"},"540100":{"540102":"城关区","540103":"堆龙德庆区","540121":"林周县","540122":"当雄县","540123":"尼木县","540124":"曲水县","540126":"达孜县","540127":"墨竹工卡县"},"540200":{"540202":"桑珠孜区","540221":"南木林县","540222":"江孜县","540223":"定日县","540224":"萨迦县","540225":"拉孜县","540226":"昂仁县","540227":"谢通门县","540228":"白朗县","540229":"仁布县","540230":"康马县","540231":"定结县","540232":"仲巴县","540233":"亚东县","540234":"吉隆县","540235":"聂拉木县","540236":"萨嘎县","540237":"岗巴县"},"540300":{"540302":"卡若区","540321":"江达县","540322":"贡觉县","540323":"类乌齐县","540324":"丁青县","540325":"察雅县","540326":"八宿县","540327":"左贡县","540328":"芒康县","540329":"洛隆县","540330":"边坝县"},"540400":{"540402":"巴宜区","540421":"工布江达县","540422":"米林县","540423":"墨脱县","540424":"波密县","540425":"察隅县","540426":"朗县"},"540500":{"540502":"乃东区","540521":"扎囊县","540522":"贡嘎县","540523":"桑日县","540524":"琼结县","540525":"曲松县","540526":"措美县","540527":"洛扎县","540528":"加查县","540529":"隆子县","540530":"错那县","540531":"浪卡子县"},"542400":{"542421":"那曲县","542422":"嘉黎县","542423":"比如县","542424":"聂荣县","542425":"安多县","542426":"申扎县","542427":"索县","542428":"班戈县","542429":"巴青县","542430":"尼玛县","542431":"双湖县"},"542500":{"542521":"普兰县","542522":"札达县","542523":"噶尔县","542524":"日土县","542525":"革吉县","542526":"改则县","542527":"措勤县"},"610000":{"610100":"西安市","610200":"铜川市","610300":"宝鸡市","610400":"咸阳市","610500":"渭南市","610600":"延安市","610700":"汉中市","610800":"榆林市","610900":"安康市","611000":"商洛市"},"610100":{"610102":"新城区","610103":"碑林区","610104":"莲湖区","610111":"灞桥区","610112":"未央区","610113":"雁塔区","610114":"阎良区","610115":"临潼区","610116":"长安区","610117":"高陵区","610122":"蓝田县","610124":"周至县","610125":"户县"},"610200":{"610202":"王益区","610203":"印台区","610204":"耀州区","610222":"宜君县"},"610300":{"610302":"渭滨区","610303":"金台区","610304":"陈仓区","610322":"凤翔县","610323":"岐山县","610324":"扶风县","610326":"眉县","610327":"陇县","610328":"千阳县","610329":"麟游县","610330":"凤县","610331":"太白县"},"610400":{"610402":"秦都区","610403":"杨陵区","610404":"渭城区","610422":"三原县","610423":"泾阳县","610424":"乾县","610425":"礼泉县","610426":"永寿县","610427":"彬县","610428":"长武县","610429":"旬邑县","610430":"淳化县","610431":"武功县","610481":"兴平市"},"610500":{"610502":"临渭区","610503":"华州区","610522":"潼关县","610523":"大荔县","610524":"合阳县","610525":"澄城县","610526":"蒲城县","610527":"白水县","610528":"富平县","610581":"韩城市","610582":"华阴市"},"610600":{"610602":"宝塔区","610603":"安塞区","610621":"延长县","610622":"延川县","610623":"子长县","610625":"志丹县","610626":"吴起县","610627":"甘泉县","610628":"富县","610629":"洛川县","610630":"宜川县","610631":"黄龙县","610632":"黄陵县"},"610700":{"610702":"汉台区","610721":"南郑县","610722":"城固县","610723":"洋县","610724":"西乡县","610725":"勉县","610726":"宁强县","610727":"略阳县","610728":"镇巴县","610729":"留坝县","610730":"佛坪县"},"610800":{"610802":"榆阳区","610803":"横山区","610821":"神木县","610822":"府谷县","610824":"靖边县","610825":"定边县","610826":"绥德县","610827":"米脂县","610828":"佳县","610829":"吴堡县","610830":"清涧县","610831":"子洲县"},"610900":{"610902":"汉滨区","610921":"汉阴县","610922":"石泉县","610923":"宁陕县","610924":"紫阳县","610925":"岚皋县","610926":"平利县","610927":"镇坪县","610928":"旬阳县","610929":"白河县"},"611000":{"611002":"商州区","611021":"洛南县","611022":"丹凤县","611023":"商南县","611024":"山阳县","611025":"镇安县","611026":"柞水县"},"620000":{"620100":"兰州市","620200":"嘉峪关市","620300":"金昌市","620400":"白银市","620500":"天水市","620600":"武威市","620700":"张掖市","620800":"平凉市","620900":"酒泉市","621000":"庆阳市","621100":"定西市","621200":"陇南市","622900":"临夏回族自治州","623000":"甘南藏族自治州"},"620100":{"620102":"城关区","620103":"七里河区","620104":"西固区","620105":"安宁区","620111":"红古区","620121":"永登县","620122":"皋兰县","620123":"榆中县"},"620200":{},"620300":{"620302":"金川区","620321":"永昌县"},"620400":{"620402":"白银区","620403":"平川区","620421":"靖远县","620422":"会宁县","620423":"景泰县"},"620500":{"620502":"秦州区","620503":"麦积区","620521":"清水县","620522":"秦安县","620523":"甘谷县","620524":"武山县","620525":"张家川回族自治县"},"620600":{"620602":"凉州区","620621":"民勤县","620622":"古浪县","620623":"天祝藏族自治县"},"620700":{"620702":"甘州区","620721":"肃南裕固族自治县","620722":"民乐县","620723":"临泽县","620724":"高台县","620725":"山丹县"},"620800":{"620802":"崆峒区","620821":"泾川县","620822":"灵台县","620823":"崇信县","620824":"华亭县","620825":"庄浪县","620826":"静宁县"},"620900":{"620902":"肃州区","620921":"金塔县","620922":"瓜州县","620923":"肃北蒙古族自治县","620924":"阿克塞哈萨克族自治县","620981":"玉门市","620982":"敦煌市"},"621000":{"621002":"西峰区","621021":"庆城县","621022":"环县","621023":"华池县","621024":"合水县","621025":"正宁县","621026":"宁县","621027":"镇原县"},"621100":{"621102":"安定区","621121":"通渭县","621122":"陇西县","621123":"渭源县","621124":"临洮县","621125":"漳县","621126":"岷县"},"621200":{"621202":"武都区","621221":"成县","621222":"文县","621223":"宕昌县","621224":"康县","621225":"西和县","621226":"礼县","621227":"徽县","621228":"两当县"},"622900":{"622901":"临夏市","622921":"临夏县","622922":"康乐县","622923":"永靖县","622924":"广河县","622925":"和政县","622926":"东乡族自治县","622927":"积石山保安族东乡族撒拉族自治县"},"623000":{"623001":"合作市","623021":"临潭县","623022":"卓尼县","623023":"舟曲县","623024":"迭部县","623025":"玛曲县","623026":"碌曲县","623027":"夏河县"},"630000":{"630100":"西宁市","630200":"海东市","632200":"海北藏族自治州","632300":"黄南藏族自治州","632500":"海南藏族自治州","632600":"果洛藏族自治州","632700":"玉树藏族自治州","632800":"海西蒙古族藏族自治州"},"630100":{"630102":"城东区","630103":"城中区","630104":"城西区","630105":"城北区","630121":"大通回族土族自治县","630122":"湟中县","630123":"湟源县"},"630200":{"630202":"乐都区","630203":"平安区","630222":"民和回族土族自治县","630223":"互助土族自治县","630224":"化隆回族自治县","630225":"循化撒拉族自治县"},"632200":{"632221":"门源回族自治县","632222":"祁连县","632223":"海晏县","632224":"刚察县"},"632300":{"632321":"同仁县","632322":"尖扎县","632323":"泽库县","632324":"河南蒙古族自治县"},"632500":{"632521":"共和县","632522":"同德县","632523":"贵德县","632524":"兴海县","632525":"贵南县"},"632600":{"632621":"玛沁县","632622":"班玛县","632623":"甘德县","632624":"达日县","632625":"久治县","632626":"玛多县"},"632700":{"632701":"玉树市","632722":"杂多县","632723":"称多县","632724":"治多县","632725":"囊谦县","632726":"曲麻莱县"},"632800":{"632801":"格尔木市","632802":"德令哈市","632821":"乌兰县","632822":"都兰县","632823":"天峻县"},"640000":{"640100":"银川市","640200":"石嘴山市","640300":"吴忠市","640400":"固原市","640500":"中卫市"},"640100":{"640104":"兴庆区","640105":"西夏区","640106":"金凤区","640121":"永宁县","640122":"贺兰县","640181":"灵武市"},"640200":{"640202":"大武口区","640205":"惠农区","640221":"平罗县"},"640300":{"640302":"利通区","640303":"红寺堡区","640323":"盐池县","640324":"同心县","640381":"青铜峡市"},"640400":{"640402":"原州区","640422":"西吉县","640423":"隆德县","640424":"泾源县","640425":"彭阳县"},"640500":{"640502":"沙坡头区","640521":"中宁县","640522":"海原县"},"650000":{"650100":"乌鲁木齐市","650200":"克拉玛依市","650400":"吐鲁番市","650500":"哈密市","652300":"昌吉回族自治州","652700":"博尔塔拉蒙古自治州","652800":"巴音郭楞蒙古自治州","652900":"阿克苏地区","653000":"克孜勒苏柯尔克孜自治州","653100":"喀什地区","653200":"和田地区","654000":"伊犁哈萨克自治州","654200":"塔城地区","654300":"阿勒泰地区","659001":"石河子市","659002":"阿拉尔市","659003":"图木舒克市","659004":"五家渠市","659006":"铁门关市"},"650100":{"650102":"天山区","650103":"沙依巴克区","650104":"新市区","650105":"水磨沟区","650106":"头屯河区","650107":"达坂城区","650109":"米东区","650121":"乌鲁木齐县"},"650200":{"650202":"独山子区","650203":"克拉玛依区","650204":"白碱滩区","650205":"乌尔禾区"},"650400":{"650402":"高昌区","650421":"鄯善县","650422":"托克逊县"},"650500":{"650502":"伊州区","650521":"巴里坤哈萨克自治县","650522":"伊吾县"},"652300":{"652301":"昌吉市","652302":"阜康市","652323":"呼图壁县","652324":"玛纳斯县","652325":"奇台县","652327":"吉木萨尔县","652328":"木垒哈萨克自治县"},"652700":{"652701":"博乐市","652702":"阿拉山口市","652722":"精河县","652723":"温泉县"},"652800":{"652801":"库尔勒市","652822":"轮台县","652823":"尉犁县","652824":"若羌县","652825":"且末县","652826":"焉耆回族自治县","652827":"和静县","652828":"和硕县","652829":"博湖县"},"652900":{"652901":"阿克苏市","652922":"温宿县","652923":"库车县","652924":"沙雅县","652925":"新和县","652926":"拜城县","652927":"乌什县","652928":"阿瓦提县","652929":"柯坪县"},"653000":{"653001":"阿图什市","653022":"阿克陶县","653023":"阿合奇县","653024":"乌恰县"},"653100":{"653101":"喀什市","653121":"疏附县","653122":"疏勒县","653123":"英吉沙县","653124":"泽普县","653125":"莎车县","653126":"叶城县","653127":"麦盖提县","653128":"岳普湖县","653129":"伽师县","653130":"巴楚县","653131":"塔什库尔干塔吉克自治县"},"653200":{"653201":"和田市","653221":"和田县","653222":"墨玉县","653223":"皮山县","653224":"洛浦县","653225":"策勒县","653226":"于田县","653227":"民丰县"},"654000":{"654002":"伊宁市","654003":"奎屯市","654004":"霍尔果斯市","654021":"伊宁县","654022":"察布查尔锡伯自治县","654023":"霍城县","654024":"巩留县","654025":"新源县","654026":"昭苏县","654027":"特克斯县","654028":"尼勒克县"},"654200":{"654201":"塔城市","654202":"乌苏市","654221":"额敏县","654223":"沙湾县","654224":"托里县","654225":"裕民县","654226":"和布克赛尔蒙古自治县"},"654300":{"654301":"阿勒泰市","654321":"布尔津县","654322":"富蕴县","654323":"福海县","654324":"哈巴河县","654325":"青河县","654326":"吉木乃县"},"659001":{"6590011":"北泉镇","6590015":"兵团一五二团","659001001":"新城街道","659001002":"向阳街道","659001003":"红山街道","659001004":"老街街道","659001005":"东城街道","659001101":"石河子镇"},"659002":{"6590022":"托喀依乡","6590025":"兵团七团","65900252":"兵团三团","659002001":"金银川路街道","659002002":"幸福路街道","659002003":"青松路街道","659002004":"南口街道","659002402":"工业园区","659002501":"兵团八团","659002503":"兵团十团","659002504":"兵团十一团","659002505":"兵团十二团","659002506":"兵团十三团","659002507":"兵团十四团","659002509":"兵团十六团","659002511":"兵团第一师水利水电工程处","659002512":"兵团第一师塔里木灌区水利管理处","659002513":"阿拉尔农场","659002514":"兵团第一师幸福农场","659002515":"中心监狱","659002516":"兵团一团","659002517":"兵团农一师沙井子水利管理处","659002518":"西工业园区管理委员会","659002519":"兵团二团"},"659003":{"65900351":"兵团五十团","659003001":"齐干却勒街道","659003002":"前海街道","659003003":"永安坝街道","659003504":"兵团四十四团","659003509":"兵团四十九团","659003511":"兵团五十一团","659003513":"兵团五十三团","659003514":"兵团图木舒克市喀拉拜勒镇"},"659004":{"6590045":"兵团一零一团","659004001":"军垦路街道","659004002":"青湖路街道","659004003":"人民路街道","659004501":"兵团一零二团","659004502":"兵团一零三团"},"659006":{"6590061":"博古其镇","659006101":"双丰镇"},"710000":{"710100":"台湾省"},"710100":{"710101":"金门","710102":"连江","710103":"苗栗","710104":"南投","710105":"澎湖","710106":"屏东","710107":"台东","710108":"台中","710109":"台南","710110":"台北","710111":"桃园","710112":"云林","710113":"新北","710114":"彰化","710115":"嘉义","710116":"新竹","710117":"花莲","710118":"宜兰","710119":"高雄","710120":"基隆"},"810000":{"810101":"中西区","810102":"东区","810103":"九龙城区","810104":"观塘区","810105":"深水埗区","810106":"湾仔区","810107":"黄大仙区","810108":"油尖旺区","810109":"离岛区","810110":"葵青区","810111":"北区","810112":"西贡区","810113":"沙田区","810114":"屯门区","810115":"大埔区","810116":"荃湾区","810117":"元朗区","810118":"香港","810119":"九龙","810120":"新界"},"820000":{"820101":"离岛","820102":"澳门半岛","820103":"凼仔","820104":"路凼城","820105":"路环"},"910000":{"810000":"香港特别行政区","820000":"澳门特别行政区"}};

  var data = {
      pca: pca,
      pcaa: pcaa
  };
  var data_2 = data.pcaa;

  var script = {
    name: 'AreaSelect',
    props: {
      gutter: {
        type: [Number],
        default: 10
      },
      styles: {
        type: Object,
        default: function _default() {
          return {
            width: '200px'
          };
        }
      },
      value: {
        type: Array,
        required: true
      },
      type: {
        type: String,
        default: 'code',
        //  code-返回行政区域代码 text-返回文本 all-返回 code 和 text
        validator: function validator(val) {
          return ['all', 'code', 'text'].indexOf(val) > -1;
        }
      },
      placeholders: {
        type: Array,
        default: function _default() {
          return [];
        }
      },
      // 显示
      level: {
        type: Number,
        default: 2,
        // 0-->一联 1->二联 2->三联
        validator: function validator(val) {
          return [0, 1, 2].indexOf(val) > -1;
        }
      },
      size: {
        type: String,
        default: 'medium',
        validator: function validator(val) {
          return ['small', 'medium', 'large'].indexOf(val) > -1;
        }
      },
      // 是否禁用
      disabled: {
        type: Boolean,
        default: false
      },
      // 数据  pca只有两级,pcaa 有3级
      loadData: {
        type: Object,
        default: function _default() {},
        required: false
      },
      // 禁用联系
      disableLink: {
        type: Boolean,
        default: false
      },
      // 是否可以搜索
      search: {
        type: Boolean,
        default: false
      }
    },
    data: function data() {
      if (this.loadData) {
        this.data = this.loadData;
      } else {
        this.data = data_2;
      }

      if (!this.data || !this.data['86']) {
        throw new Error('需要提供地区数据，格式参考见：https://github.com/dwqs/area-data');
      }

      return {
        // 区域数据
        provinces: this.data['86'],
        citys: {},
        areas: {},
        curProvince: '',
        // text
        curProvinceCode: undefined,
        // code
        curCity: '',
        curCityCode: undefined,
        curArea: '',
        curAreaCode: undefined,
        // 设置默认值的判断
        defaults: [],
        isCode: false,
        isSetDefault: false
      };
    },
    watch: {
      curProvinceCode: function curProvinceCode(val, oldVal) {
        this.curProvince = this.provinces[val];
        this.provinceChange(val, oldVal === val);
      },
      curCityCode: function curCityCode(val, oldVal) {
        this.curCity = this.citys[val];
        this.cityChange(val, oldVal === val);
      },
      curAreaCode: function curAreaCode(val, oldVal) {
        this.curArea = this.areas[val];
        this.areaChange(val, oldVal === val);
      },
      value: function value(val) {
        if (!this.isSetDefault && Array.isArray(val) && val.length === this.level + 1) {
          this.beforeSetDefault();
          this.setDefaultValue();
        }

        if (!this.isSetDefault && Array.isArray(val) && val.length && val.length !== this.level + 1) ;
      }
    },
    created: function created() {
      if (Array.isArray(this.value) && this.value.length === this.level + 1) {
        this.beforeSetDefault();
        this.setDefaultValue();
      }
    },
    methods: {
      filterOption: function filterOption(input, option) {
        return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0;
      },
      provinceChange: function provinceChange(val, isEqual) {
        var _this = this;

        if (this.level === 0) {
          this.selectChange();
        } else if (this.level >= 1) {
          this.citys = this.data[val];

          if (!this.citys) {
            this.citys = _defineProperty({}, this.curProvinceCode, this.curProvince);

            if (!this.disableLink) {
              this.curCity = this.curProvince;
              this.curCityCode = this.curCityCode;
            }

            return;
          }

          var curCity = Object.values(this.citys)[0];
          var curCityCode = Object.keys(this.citys)[0];

          if (this.defaults[1]) {
            if (this.isCode) {
              curCityCode = lodash_find(Object.keys(this.citys), function (item) {
                return item === _this.defaults[1];
              });
              curCity = this.citys[curCityCode];
            } else {
              curCity = lodash_find(this.citys, function (item) {
                return item === _this.defaults[1];
              });
              curCityCode = lodash_find(Object.keys(this.citys), function (item) {
                return _this.citys[item] === _this.defaults[1];
              });
            }
          }

          if (!this.disableLink) {
            this.curCity = curCity;
            this.curCityCode = curCityCode;
          } else if (!isEqual) {
            this.curCity = '';
            this.curCityCode = '';
            this.curArea = '';
            this.curAreaCode = '';
            this.selectChange();
          }
        }
      },
      cityChange: function cityChange(val, isEqual) {
        var _this2 = this;

        if (this.level === 1) {
          this.selectChange();
        } else if (this.level === 2) {
          this.areas = this.data[val];

          if (!this.areas) {
            // fix 市级下不存在城区(#7)
            this.areas = _defineProperty({}, this.curCityCode, this.curCity);

            if (!this.disableLink) {
              this.curArea = this.curCity;
              this.curAreaCode = this.curCityCode;
            }

            return;
          }

          var curArea = Object.values(this.areas)[0];
          var curAreaCode = Object.keys(this.areas)[0];

          if (this.defaults[2]) {
            if (this.isCode) {
              curAreaCode = lodash_find(Object.keys(this.areas), function (item) {
                return item === _this2.defaults[2];
              });
              curArea = this.areas[curAreaCode];
            } else {
              curArea = lodash_find(this.areas, function (item) {
                return item === _this2.defaults[2];
              });
              curAreaCode = lodash_find(Object.keys(this.areas), function (item) {
                return _this2.areas[item] === _this2.defaults[2];
              });
            }
          }

          if (!this.disableLink) {
            this.curArea = curArea;
            this.curAreaCode = curAreaCode;
          } else if (!isEqual) {
            this.curArea = '';
            this.curAreaCode = '';
            this.selectChange();
          }
        }
      },
      areaChange: function areaChange(val) {
        this.curAreaCode = val;
        this.selectChange();
      },
      getAreaCode: function getAreaCode() {
        var codes = [];

        switch (this.level) {
          case 0:
            codes = [this.curProvinceCode];
            break;

          case 1:
            codes = [this.curProvinceCode, this.curCityCode];
            break;

          case 2:
            // fix #32 710000是台湾省
            codes = [this.curProvinceCode, this.curProvinceCode === '710000' ? this.curProvinceCode : this.curCityCode, this.curAreaCode];
            break;
        }

        return codes;
      },
      getAreaText: function getAreaText() {
        var texts = [];

        switch (this.level) {
          case 0:
            texts = [this.curProvince];
            break;

          case 1:
            // fix #32 710000是台湾省
            texts = [this.curProvince, this.curProvinceCode === '710000' ? this.curProvince : this.curCity];
            break;

          case 2:
            texts = [this.curProvince, this.curProvinceCode === '710000' ? this.curProvince : this.curCity, this.curArea];
            break;
        }

        return texts;
      },
      getAreaCodeAndText: function getAreaCodeAndText(selected) {
        var textCodes = [];

        switch (this.level) {
          case 0:
            textCodes = [_defineProperty({}, this.curProvinceCode, this.curProvince)];
            break;

          case 1:
            textCodes = [_defineProperty({}, this.curProvinceCode, this.curProvince), _defineProperty({}, this.curCityCode, this.curCity)];
            break;

          case 2:
            var cityCode = this.curProvinceCode === '710000' ? this.curProvinceCode : this.curCityCode;
            var cityText = this.curProvinceCode === '710000' ? this.curProvince : this.curCity;
            textCodes = [_defineProperty({}, this.curProvinceCode, this.curProvince), _defineProperty({}, cityCode, cityText), _defineProperty({}, this.curAreaCode, this.curArea)];
            break;
        }

        return textCodes;
      },
      beforeSetDefault: function beforeSetDefault() {
        var chinese = /^[\u4E00-\u9FA5\uF900-\uFA2D]{2,}$/;
        var num = /^\d{6,}$/;
        var isCode = num.test(this.value[0]);
        var isValid;

        if (!isCode) {
          isValid = this.value.every(function (item) {
            return chinese.test(item);
          });
        } else {
          isValid = this.value.every(function (item) {
            return num.test(item);
          });
        } // 映射默认值，避免直接更改props


        this.defaults = [].concat(this.value);
        this.isCode = isCode;
        this.isSetDefault = true;
      },
      setDefaultValue: function setDefaultValue() {
        var _this3 = this;

        var provinceCode = '';

        if (this.isCode) {
          provinceCode = this.defaults[0];
        } else {
          var province = lodash_find(this.provinces, function (item) {
            return item === _this3.defaults[0];
          });
          provinceCode = lodash_find(Object.keys(this.provinces), function (item) {
            return _this3.provinces[item] === _this3.defaults[0];
          });
        }

        this.curProvinceCode = provinceCode; // 还原默认值，避免用户选择出错

        this.$nextTick(function () {
          _this3.defaults = []; // this.isCode = false;

          _this3.isSetDefault = false;
        });
      },
      selectChange: function selectChange() {
        this.isSetDefault = true;
        var res = [];

        if (this.type === 'code') {
          res = this.getAreaCode();
        } else if (this.type === 'text') {
          res = this.getAreaText();
        } else if (this.type === 'all') {
          res = this.getAreaCodeAndText();
        }

        this.$emit('input', res);
        this.$emit('change', res);
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
      "a-row",
      { attrs: { gutter: _vm.gutter } },
      [
        _c(
          "a-col",
          { attrs: { span: "8" } },
          [
            _c(
              "a-select",
              {
                style: _vm.styles,
                attrs: {
                  getPopupContaine: function(trigger) {
                    return trigger.parentNode
                  },
                  disabled: _vm.disabled,
                  showSearch: _vm.search,
                  filterOption: _vm.filterOption,
                  placeholder: _vm.placeholders[0]
                    ? _vm.placeholders[0]
                    : "请选择省份"
                },
                model: {
                  value: _vm.curProvinceCode,
                  callback: function($$v) {
                    _vm.curProvinceCode = $$v;
                  },
                  expression: "curProvinceCode"
                }
              },
              _vm._l(_vm.provinces, function(val, key) {
                return _c(
                  "a-select-option",
                  { key: key, attrs: { value: key } },
                  [_vm._v("\n        " + _vm._s(val) + "\n      ")]
                )
              }),
              1
            )
          ],
          1
        ),
        _vm._v(" "),
        _c(
          "a-col",
          { attrs: { span: "8" } },
          [
            _vm.level >= 1
              ? _c(
                  "a-select",
                  {
                    style: _vm.styles,
                    attrs: {
                      getPopupContaine: function(trigger) {
                        return trigger.parentNode
                      },
                      showSearch: _vm.search,
                      filterOption: _vm.filterOption,
                      placeholder: _vm.placeholders[1]
                        ? _vm.placeholders[1]
                        : "请选择城市",
                      disabled: _vm.disabled
                    },
                    model: {
                      value: _vm.curCityCode,
                      callback: function($$v) {
                        _vm.curCityCode = $$v;
                      },
                      expression: "curCityCode"
                    }
                  },
                  _vm._l(_vm.citys, function(val, key) {
                    return _c(
                      "a-select-option",
                      { key: key, attrs: { value: key } },
                      [_vm._v("\n        " + _vm._s(val) + "\n      ")]
                    )
                  }),
                  1
                )
              : _vm._e()
          ],
          1
        ),
        _vm._v(" "),
        _c(
          "a-col",
          { attrs: { span: "8" } },
          [
            _vm.level >= 2
              ? _c(
                  "a-select",
                  {
                    style: _vm.styles,
                    attrs: {
                      getPopupContaine: function(trigger) {
                        return trigger.parentNode
                      },
                      showSearch: _vm.search,
                      filterOption: _vm.filterOption,
                      placeholder: _vm.placeholders[2]
                        ? _vm.placeholders[2]
                        : "请选择区县",
                      disabled: _vm.disabled
                    },
                    model: {
                      value: _vm.curAreaCode,
                      callback: function($$v) {
                        _vm.curAreaCode = $$v;
                      },
                      expression: "curAreaCode"
                    }
                  },
                  _vm._l(_vm.areas, function(val, key) {
                    return _c(
                      "a-select-option",
                      { key: key, attrs: { value: key } },
                      [_vm._v("\n        " + _vm._s(val) + "\n      ")]
                    )
                  }),
                  1
                )
              : _vm._e()
          ],
          1
        )
      ],
      1
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
    

    
    var AreaSelect = normalizeComponent_1(
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

  AreaSelect.install = function (Vue) {
    Vue.component(AreaSelect.name, AreaSelect);
  }; // 默认导出组件

  return AreaSelect;

}));
