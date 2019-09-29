/* * Copyright © 2019-2019 chenwenbin * Released under the MIT License. */
'use strict';

/**
 * @description:
 * @Date: 2019-05-22 13:37:02
 */
function getContainer() {
  var $copy = document.getElementById('$copy');

  if (!$copy) {
    $copy = document.createElement('input');
    $copy.id = '$copy';
    $copy.style['width'] = '48px';
    $copy.style['height'] = '12px';
    $copy.style['position'] = 'fixed';
    $copy.style['z-index'] = '0';
    $copy.style['left'] = '-500px';
    $copy.style['top'] = '-500px';
    document.body.appendChild($copy);
  }

  return $copy;
}

function XEClipboard(content) {
  var $copy = getContainer();
  var value = content === null || content === undefined ? '' : '' + content;

  try {
    $copy.value = value;
    $copy.focus();
    $copy.setSelectionRange(0, value.length);
    var copySty = document.execCommand('copy', true);
    document.body.removeChild($copy);
    return copySty;
  } catch (e) {}

  return false;
}

var index = {
  copy: XEClipboard
};

module.exports = index;
