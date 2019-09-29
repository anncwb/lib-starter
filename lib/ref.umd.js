/* * Copyright © 2019-2019 chenwenbin * Released under the MIT License. */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.ref = factory());
}(this, function () { 'use strict';

  var index = {
    install: function install(Vue) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var directiveName = options.name || 'ref';
      Vue.directive(directiveName, {
        bind: function bind(el, binding, vnode) {
          binding.value(vnode.componentInstance || el, vnode.key);
        },
        update: function update(el, binding, vnode, oldVnode) {
          if (oldVnode.data && oldVnode.data.directives) {
            var oldBinding = oldVnode.data.directives.find(function (directive) {
              var name = directive.name;
              return name === directiveName;
            });

            if (oldBinding && oldBinding.value !== binding.value) {
              oldBinding && oldBinding.value(null, oldVnode.key);
              binding.value(vnode.componentInstance || el, vnode.key);
              return;
            }
          } // Should not have this situation


          if (vnode.componentInstance !== oldVnode.componentInstance || vnode.elm !== oldVnode.elm) {
            binding.value(vnode.componentInstance || el, vnode.key);
          }
        },
        unbind: function unbind(el, binding, vnode) {
          binding.value(null, vnode.key);
        }
      });
    }
  };

  return index;

}));
