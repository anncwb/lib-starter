/* * Copyright © 2019-2019 chenwenbin * Released under the MIT License. */
'use strict';

var routerThen = {
  $router: null,
  resolve: null,
  // 跳到指定页面，并返回promise
  request: function request() {
    var _this = this;

    var requestType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'push';
    var location = arguments.length > 1 ? arguments[1] : undefined;
    var onComplete = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var onAbort = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

    if (!location || location === '') {
      throw new Error('location is missing');
    }

    return new Promise(function (resolve, reject) {
      if (_this.$router) {
        _this.resolve = resolve;

        switch (requestType) {
          case 'push':
            _this.$router.push(location, onComplete, onAbort);

            break;

          case 'replace':
            _this.$router.replace(location, onComplete, onAbort);

            break;

          case 'go':
            _this.$router.go(location);

            break;

          default:
            reject(new Error('requestType error:' + requestType));
            break;
        }
      } else {
        reject(new Error('$router missing'));
      }
    }).catch(function (error) {
      _this.resolve = null;
      throw new Error(error);
    });
  },
  // 前往指定页面
  push: function push(location) {
    var onComplete = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var onAbort = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    return this.request('push', location, onComplete, onAbort);
  },
  // 替换当前页
  replace: function replace(location) {
    var onComplete = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var onAbort = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    return this.request('replace', location, onComplete, onAbort);
  },
  // 历史记录跳转
  go: function go() {
    var step = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    return this.request('go', step);
  }
};
var index = {
  install: function install(Vue, _ref) {
    var router = _ref.router;
    routerThen.$router = router;
    Object.defineProperty(Vue.prototype, '$routerThen', {
      value: routerThen
    });
    Vue.mixin({
      // 在路由跳转到下一个页面之前，为下一个页面注册回调事件。
      beforeRouteEnter: function beforeRouteEnter(to, from, next) {
        if (routerThen.resolve) {
          next(function (vm) {
            try {
              routerThen.resolve(vm);
              routerThen.resolve = null;
            } catch (error) {}
          });
        } else {
          next();
        }
      },
      beforeRouteUpdate: function beforeRouteUpdate(to, from, next) {
        if (routerThen.resolve) {
          try {
            routerThen.resolve(this);
            routerThen.resolve = null;
          } catch (error) {}
        }

        next();
      }
    });
  }
};

module.exports = index;
