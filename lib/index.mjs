
/**
 * es-fullscreen v0.4.0-beta.9
 * (c) 2017-2019 toxic-johann
 * Released under MIT
 * Built ad Mon Jun 03 2019 23:44:31 GMT+0800 (China Standard Time)
 */

import _typeof from '@babel/runtime/helpers/typeof';
import _classCallCheck from '@babel/runtime/helpers/classCallCheck';
import _createClass from '@babel/runtime/helpers/createClass';
import { isString, isFunction, isPlainObject } from 'lodash-es';
import { isElement, isEvent, isPosterityNode, defined } from 'toxic-predicate-functions';

var VENDOR_PREFIXES = ['', 'o', 'ms', 'moz', 'webkit', 'webkitCurrent'];
var SYNONYMS = [['', ''], ['exit', 'cancel'], ['screen', 'Screen']];
var DESKTOP_FULLSCREEN_STYLE = {
  bottom: 0,
  height: '100%',
  left: 0,
  overflow: 'hidden',
  position: 'fixed',
  right: 0,
  top: 0,
  width: '100%',
  zIndex: '2147483647'
};
var FULLSCREEN_CHANGE = ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange'];
var FULLSCREEN_ERROR = ['fullscreenerror', 'webkitfullscreenerror', 'mozfullscreenerror', 'MSFullscreenError'];

var supportDocument = typeof document !== 'undefined';
function setStyle(el, key, val) {
  if (isString(key)) {
    el.style[key] = val;
  } else {
    for (var k in key) {
      setStyle(el, k, key[k]);
    }
  }
}
function native(target, name) {
  var option = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  if (name && !isString(name)) {
    option = name;
  }

  if (isString(target)) {
    name = target;
  }

  var _option = option,
      _option$keyOnly = _option.keyOnly,
      keyOnly = _option$keyOnly === void 0 ? false : _option$keyOnly;

  if (!supportDocument) {
    return keyOnly ? '' : undefined;
  }

  if (!isElement(target)) {
    target = document;
  }

  if (!isString(name)) {
    throw new Error("You must pass in a string as name, but not ".concat(_typeof(name), "."));
  }

  for (var i = 0; i < SYNONYMS.length; i++) {
    name = name.replace(SYNONYMS[i][0], SYNONYMS[i][1]);

    for (var j = 0; j < VENDOR_PREFIXES.length; j++) {
      var prefixed = j === 0 ? name : VENDOR_PREFIXES[j] + name.charAt(0).toUpperCase() + name.substr(1);

      if (target[prefixed] !== undefined) {
        return keyOnly ? prefixed : target[prefixed];
      }
    }
  }

  return keyOnly ? '' : undefined;
}
function dispatchEvent(element, name) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref$bubbles = _ref.bubbles,
      bubbles = _ref$bubbles === void 0 ? true : _ref$bubbles,
      _ref$cancelable = _ref.cancelable,
      cancelable = _ref$cancelable === void 0 ? true : _ref$cancelable;

  var event;

  if (isFunction(Event)) {
    event = new Event(name, {
      bubbles: bubbles,
      cancelable: cancelable
    });
  } else if (supportDocument && document.createEvent) {
    event = document.createEvent('HTMLEvents');
    event.initEvent(name, true, true);
  } else if (supportDocument && document.createEventObject) {
    event = document.createEventObject();
    event.eventType = name;
    event.eventName = name;
  }

  if (!isPlainObject(event) && !isEvent(event)) {
    throw new Error('We can\'t create an object on this browser, please report to author');
  }

  if (element.dispatchEvent) {
    element.dispatchEvent(event);
  } else if (element.fireEvent) {
    element.fireEvent('on' + event.eventType, event);
  } else if (element[name]) {
    element[name]();
  } else if (element['on' + name]) {
    element['on' + name]();
  }
}

var fullscreenEnabled = native('fullscreenEnabled');
var useStyleFirst = false;

var ESFullscreen =
/*#__PURE__*/
function () {
  function ESFullscreen() {
    _classCallCheck(this, ESFullscreen);

    this._fullscreenElement = null;
    this.isNativelySupport = defined(native('fullscreenElement')) && (!defined(fullscreenEnabled) || fullscreenEnabled === true);
    this._openKey = supportDocument ? native(document.body || document.documentElement, 'requestFullscreen', {
      keyOnly: true
    }) : '';
    this._exitKey = native('exitFullscreen', {
      keyOnly: true
    });
    this._useStyleFirst = false;
    this.hasUsedStyle = false;
  }

  _createClass(ESFullscreen, [{
    key: "requestFullscreen",
    value: function requestFullscreen(element) {
      var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        force: false
      };
      return this.open(element, option);
    }
  }, {
    key: "open",
    value: function open(element) {
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref$force = _ref.force,
          force = _ref$force === void 0 ? false : _ref$force;

      if (process.env.NODE_ENV !== 'production') {
        if (!isElement(element)) {
          throw new Error("You should passed in a legal element to requestFullScreen, but not ".concat(_typeof(element), "."));
        }

        if (!isPosterityNode(document, element)) {
          throw new Error('You must pass in a HTML element in document.');
        }
      }

      var originElement = this.fullscreenElement;

      if (originElement && originElement !== element) {
        if (!force) {
          dispatchEvent(document, 'fullscreenerror');
          return false;
        }

        this.exit();
      }

      if (!this.useStyleFirst) {
        if (this.isNativelySupport) {
          if (isFunction(element[this._openKey])) {
            element[this._openKey]();
          }

          return true;
        }

        if (element instanceof HTMLVideoElement && element.webkitSupportsFullscreen && isFunction(element.webkitEnterFullscreen)) {
          element.webkitEnterFullscreen();
          this._fullscreenElement = element;
          return true;
        }
      }

      this._savedStyles = Object.keys(DESKTOP_FULLSCREEN_STYLE).reduce(function (styles, key) {
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
      this.hasUsedStyle = true;
      dispatchEvent(element, 'fullscreenchange');
      return true;
    }
  }, {
    key: "exitFullscreen",
    value: function exitFullscreen() {
      return this.exit();
    }
  }, {
    key: "exit",
    value: function exit() {
      if (!this.isFullscreen) {
        return false;
      }

      if (this.isNativelySupport && !this.useStyleFirst && !this.hasUsedStyle) {
        document[this._exitKey]();

        return true;
      }

      var element = this._fullscreenElement;
      setStyle(element, this._savedStyles);

      if (document.body) {
        document.body.style.overflow = this._bodyOverflow;
      }

      if (document.documentElement) {
        document.documentElement.style.overflow = this._htmlOverflow;
      }

      this._fullscreenElement = null;
      this._savedStyles = {};
      dispatchEvent(element, 'fullscreenchange');
      return true;
    }
  }, {
    key: "addEventListener",
    value: function addEventListener(name, fn) {
      var element = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : document;
      return this.on(name, fn, element);
    }
  }, {
    key: "on",
    value: function on(name, fn) {
      var element = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : document;

      this._handleEvent(element, 'addEventListener', name, fn);
    }
  }, {
    key: "removeEventListene",
    value: function removeEventListene(name, fn) {
      var element = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : document;
      return this.off(name, fn, element);
    }
  }, {
    key: "off",
    value: function off(name, fn) {
      var element = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : document;

      this._handleEvent(element, 'removeEventListener', name, fn);
    }
  }, {
    key: "_handleEvent",
    value: function _handleEvent(element, behavior, name, fn) {
      if (process.env.NODE_ENV !== 'production') {
        if (name !== 'fullscreenchange' && name !== 'fullscreenerror' && name !== 'esfullscreenmethodchange') {
          throw new Error("".concat(this.constructor.name, " only handle \"fullscreenchange\", \"fullscreenerror\" and \"esfullscreenmethodchange\" event, but not ").concat(name, ". Pleas pass in an right event name."));
        }

        if (!isFunction(fn)) {
          throw new Error("You must pass in an legal function, but not ".concat(_typeof(fn), "."));
        }

        if (!isElement(element) && element !== document) {
          throw new Error("You should passed in a legal element, but not ".concat(_typeof(element), "."));
        }
      }

      var names = name === 'fullscreenchange' ? FULLSCREEN_CHANGE : name === 'fullscreenerror' ? FULLSCREEN_ERROR : [name];
      names.forEach(function (name) {
        element[behavior](name, fn);
      });
    }
  }, {
    key: "useStyleFirst",
    get: function get() {
      return useStyleFirst;
    },
    set: function set(value) {
      value = !!value;

      if (value === useStyleFirst) {
        return;
      }

      useStyleFirst = value;
      dispatchEvent(document, 'esfullscreenmethodchange');
    }
  }, {
    key: "fullscreenElement",
    get: function get() {
      var element = ['fullscreenElement', 'webkitFullscreenElement', 'mozFullScreenElement', 'msFullscreenElement'].reduce(function (element, key) {
        return element || document[key];
      }, null);
      return element || this._fullscreenElement;
    }
  }, {
    key: "isFullscreen",
    get: function get() {
      return isElement(this.fullscreenElement);
    }
  }]);

  return ESFullscreen;
}();

var esFullscreen = new ESFullscreen();

export default esFullscreen;
export { esFullscreen };
