
/**
 * es-fullscreen v0.1.2
 * (c) 2017 toxic-johann
 * Released under MIT
 */

'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _Object$keys = _interopDefault(require('babel-runtime/core-js/object/keys'));
var _classCallCheck = _interopDefault(require('babel-runtime/helpers/classCallCheck'));
var _createClass = _interopDefault(require('babel-runtime/helpers/createClass'));
var _typeof = _interopDefault(require('babel-runtime/helpers/typeof'));
var toxicPredicateFunctions = require('toxic-predicate-functions');

var VENDOR_PREFIXES = ['', 'o', 'ms', 'moz', 'webkit', 'webkitCurrent'];
var SYNONYMS = [['', ''], // empty
['exit', 'cancel'], // firefox & old webkits expect cancelFullScreen instead of exitFullscreen
['screen', 'Screen'] // firefox expects FullScreen instead of Fullscreen
];
var DESKTOP_FULLSCREEN_STYLE = {
  position: 'fixed',
  zIndex: '2147483647',
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
  overflow: 'hidden'
};
function setStyle(el, key, val) {
  if (toxicPredicateFunctions.isObject(key)) {
    for (var k in key) {
      setStyle(el, k, key[k]);
    }
  } else {
    // $FlowFixMe: we found it
    el.style[key] = val;
  }
}

function native(target, name) {
  var option = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  if (toxicPredicateFunctions.isObject(name)) {
    option = name;
  }
  if (toxicPredicateFunctions.isString(target)) {
    name = target;
  }
  if (!toxicPredicateFunctions.isElement(target)) {
    target = document;
  }
  if (!toxicPredicateFunctions.isString(name)) throw new Error('You must pass in a string as name, but not ' + (typeof name === 'undefined' ? 'undefined' : _typeof(name)));

  var _ref = option || {},
      _ref$keyOnly = _ref.keyOnly,
      keyOnly = _ref$keyOnly === undefined ? false : _ref$keyOnly;

  for (var i = 0; i < SYNONYMS.length; i++) {
    name = name.replace(SYNONYMS[i][0], SYNONYMS[i][1]);
    for (var j = 0; j < VENDOR_PREFIXES.length; j++) {
      var prefixed = j === 0 ? name : VENDOR_PREFIXES[j] + name.charAt(0).toUpperCase() + name.substr(1);
      // $FlowFixMe: we support document computed property here
      if (target[prefixed] !== undefined) return keyOnly ? prefixed : target[prefixed];
    }
  }
  return keyOnly ? '' : undefined;
}
var fullscreenEnabled = native('fullscreenEnabled');

var FullScreen = function () {
  function FullScreen() {
    _classCallCheck(this, FullScreen);

    this._fullscreenElement = null;
    this.isNativelySupport = toxicPredicateFunctions.defined(native('fullscreenElement')) && (!toxicPredicateFunctions.defined(fullscreenEnabled) || fullscreenEnabled === true);
    this._openKey = native(document.body, 'requestFullscreen', { keyOnly: true });
    this._exitKey = native('exitFullscreen', { keyOnly: true });
  }

  _createClass(FullScreen, [{
    key: 'open',
    value: function open(element) {
      var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref2$force = _ref2.force,
          force = _ref2$force === undefined ? false : _ref2$force;

      if (!toxicPredicateFunctions.isElement(element)) throw new Error('You should passed in a legal element to requestFullScreen, but not ' + (typeof element === 'undefined' ? 'undefined' : _typeof(element)) + '.');
      if (!toxicPredicateFunctions.isPosterityNode(document, element)) throw new Error('You must pass in a HTML element in document.');

      var originElement = this.fullscreenElement;
      if (originElement && originElement !== element) {
        if (!force) return false;
        this.exit();
      }
      if (this.isNativelySupport) {
        // $FlowFixMe: support computed key on HTMLElment here
        element[this._openKey]();
        return true;
      }
      this._savedStyles = _Object$keys(DESKTOP_FULLSCREEN_STYLE).reduce(function (styles, key) {
        // $FlowFixMe: support string here
        styles[key] = element.style[key];
        return styles;
      }, {});
      setStyle(element, DESKTOP_FULLSCREEN_STYLE);
      if (document.body) {
        this._bodyOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
      }
      if (document.documentElement) {
        this._htmlOverflow = document.documentElement.style.overflow;
        document.documentElement.style.overflow = 'hidden';
      }
      this._fullscreenElement = element;
      this._dispatchEvent(element);
      return true;
    }
  }, {
    key: 'exit',
    value: function exit() {
      if (!this.isFullScreen) return false;
      if (this.isNativelySupport) {
        // $FlowFixMe: support document computed key here
        document[this._exitKey]();
        return true;
      }
      var element = this._fullscreenElement;
      if (!toxicPredicateFunctions.isElement(element)) return false;
      setStyle(element, this._savedStyles);
      if (document.body) document.body.style.overflow = this._bodyOverflow;
      if (document.documentElement) document.documentElement.style.overflow = this._htmlOverflow;
      this._fullscreenElement = null;
      this._savedStyles = {};
      this._dispatchEvent(element);
      return true;
    }
  }, {
    key: '_dispatchEvent',
    value: function _dispatchEvent(element) {
      var event = void 0;
      var eventName = 'fullscreenchange';
      if (toxicPredicateFunctions.isFunction(Event)) {
        event = new Event('fullscreenchange', {
          bubbles: true,
          cancelable: true
        });
      } else if (document.createEvent) {
        event = document.createEvent('HTMLEvents');
        event.initEvent(eventName, true, true);
      } else if (document.createEventObject) {
        // $FlowFixMe: IE < 9
        event = document.createEventObject();
        event.eventType = eventName;
        event.eventName = eventName;
      }
      if (!toxicPredicateFunctions.isObject(event)) throw new Error("We can't create an object on this browser, please report to author");
      if (element.dispatchEvent) {
        element.dispatchEvent(event);
        // $FlowFixMe: IE < 9
      } else if (element.fireEvent) {
        // $FlowFixMe: IE < 9
        element.fireEvent('on' + event.eventType, event); // can trigger only real event (e.g. 'click')
        // $FlowFixMe: support computed key
      } else if (element[eventName]) {
        // $FlowFixMe: support computed key
        element[eventName]();
        // $FlowFixMe: support computed key
      } else if (element['on' + eventName]) {
        // $FlowFixMe: support computed key
        element['on' + eventName]();
      }
    }
  }, {
    key: 'fullscreenElement',
    get: function get() {
      var element = ['fullscreenElement', 'webkitFullscreenElement', 'mozFullScreenElement', 'msFullscreenElement'].reduce(function (element, key) {
        // $FlowFixMe: support computed element on document
        return element || document[key];
      }, null);
      return element || this._fullscreenElement;
    }
  }, {
    key: 'isFullScreen',
    get: function get() {
      return toxicPredicateFunctions.isElement(this.fullscreenElement);
    }
  }]);

  return FullScreen;
}();

var index = new FullScreen();

module.exports = index;
