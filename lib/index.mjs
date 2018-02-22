
/**
 * es-fullscreen v0.3.0
 * (c) 2017-2018 toxic-johann
 * Released under MIT
 */

import _typeof from 'babel-runtime/helpers/typeof';
import { isObject, isElement, isString, isFunction, isEvent, defined, isPosterityNode } from 'toxic-predicate-functions';
import _Object$getOwnPropertyDescriptor from 'babel-runtime/core-js/object/get-own-property-descriptor';
import _Object$keys from 'babel-runtime/core-js/object/keys';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import { autobindClass, alias } from 'toxic-decorators';

var VENDOR_PREFIXES = ['', 'o', 'ms', 'moz', 'webkit', 'webkitCurrent'];

var SYNONYMS = [['', ''], // empty
['exit', 'cancel'], // firefox & old webkits expect cancelFullScreen instead of exitFullscreen
['screen', 'Screen']];

var DESKTOP_FULLSCREEN_STYLE = {
  position: 'fixed',
  zIndex: '2147483647',
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
  overflow: 'hidden',
  width: '100%',
  height: '100%'
};

var FULLSCREEN_CHANGE = ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange'];

var FULLSCREEN_ERROR = ['fullscreenerror', 'webkitfullscreenerror', 'mozfullscreenerror', 'MSFullscreenError'];

var supportDocument = typeof document !== 'undefined';

function setStyle(el, key, val) {
  if (isObject(key)) {
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

  if (isObject(name)) {
    option = name;
  }
  if (isString(target)) {
    name = target;
  }
  var _option = option,
      _option$keyOnly = _option.keyOnly,
      keyOnly = _option$keyOnly === undefined ? false : _option$keyOnly;
  /* istanbul ignore if */

  if (!supportDocument) {
    return keyOnly ? '' : undefined;
  }
  if (!isElement(target)) {
    target = document;
  }
  if (!isString(name)) throw new Error('You must pass in a string as name, but not ' + (typeof name === 'undefined' ? 'undefined' : _typeof(name)) + '.');
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

function dispatchEvent(element, name) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref$bubbles = _ref.bubbles,
      bubbles = _ref$bubbles === undefined ? true : _ref$bubbles,
      _ref$cancelable = _ref.cancelable,
      cancelable = _ref$cancelable === undefined ? true : _ref$cancelable;

  var event = void 0;
  /* istanbul ignore else  */
  if (isFunction(Event)) {
    event = new Event(name, {
      bubbles: bubbles,
      cancelable: cancelable
    });
  } else if (supportDocument && document.createEvent) {
    event = document.createEvent('HTMLEvents');
    event.initEvent(name, true, true);
  } else if (supportDocument && document.createEventObject) {
    // $FlowFixMe: IE < 9
    event = document.createEventObject();
    event.eventType = name;
    event.eventName = name;
  }
  /* istanbul ignore next  */
  if (!isObject(event) && !isEvent(event)) throw new Error("We can't create an object on this browser, please report to author");
  /* istanbul ignore else  */
  if (element.dispatchEvent) {
    element.dispatchEvent(event);
    // $FlowFixMe: IE < 9
  } else if (element.fireEvent) {
    // $FlowFixMe: IE < 9
    element.fireEvent('on' + event.eventType, event); // can trigger only real event (e.g. 'click')
    // $FlowFixMe: support computed key
  } else if (element[name]) {
    // $FlowFixMe: support computed key
    element[name]();
    // $FlowFixMe: support computed key
  } else if (element['on' + name]) {
    // $FlowFixMe: support computed key
    element['on' + name]();
  }
}

var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2;

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}
var fullscreenEnabled = native('fullscreenEnabled');
var useStyleFirst = false;

var ESFullScreen = (_dec = autobindClass(), _dec2 = alias('requestFullscreen'), _dec3 = alias('exitFullscreen'), _dec4 = alias('addEventListener'), _dec5 = alias('removeEventListener'), _dec(_class = (_class2 = function () {
  function ESFullScreen() {
    _classCallCheck(this, ESFullScreen);

    this._fullscreenElement = null;
    this.isNativelySupport = defined(native('fullscreenElement')) && (!defined(fullscreenEnabled) || fullscreenEnabled === true);
    this._openKey = supportDocument ? native(document.body || document.documentElement, 'requestFullscreen', { keyOnly: true }) : '';
    this._exitKey = native('exitFullscreen', { keyOnly: true });
    this._useStyleFirst = false;
    this.hasUsedStyle = false;
  }

  _createClass(ESFullScreen, [{
    key: 'open',
    value: function open(element) {
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref$force = _ref.force,
          force = _ref$force === undefined ? false : _ref$force;

      /* istanbul ignore else  */
      if (process.env.NODE_ENV !== 'production') {
        if (!isElement(element)) throw new Error('You should passed in a legal element to requestFullScreen, but not ' + (typeof element === 'undefined' ? 'undefined' : _typeof(element)) + '.');
        if (!isPosterityNode(document, element)) throw new Error('You must pass in a HTML element in document.');
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
          // $FlowFixMe: support computed key on HTMLElment here
          isFunction(element[this._openKey]) && element[this._openKey]();
          return true;
        }

        // add wekitEnterFullscreen support as required in https://github.com/toxic-johann/es-fullscreen/issues/4
        /* istanbul ignore if  */
        if (element instanceof HTMLVideoElement && element.webkitSupportsFullscreen &&
        // $FlowFixMe: support webkitEnterFullscreen on some werid safari
        isFunction(element.webkitEnterFullscreen)) {
          element.webkitEnterFullscreen();
          this._fullscreenElement = element;
          return true;
        }
      }

      this._savedStyles = _Object$keys(DESKTOP_FULLSCREEN_STYLE).reduce(function (styles, key) {
        // $FlowFixMe: support string here
        styles[key] = element.style[key];
        return styles;
      }, {});
      setStyle(element, DESKTOP_FULLSCREEN_STYLE);

      /* istanbul ignore else  */
      if (document.body) {
        this._bodyOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
      }
      /* istanbul ignore else  */
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
    key: 'exit',
    value: function exit() {
      if (!this.isFullscreen) return false;
      if (this.isNativelySupport && !this.useStyleFirst && !this.hasUsedStyle) {
        // $FlowFixMe: support document computed key here
        document[this._exitKey]();
        return true;
      }
      // $FlowFixMe: element is an Elment here
      var element = this._fullscreenElement;
      setStyle(element, this._savedStyles);
      /* istanbul ignore else  */
      if (document.body) document.body.style.overflow = this._bodyOverflow;
      /* istanbul ignore else  */
      if (document.documentElement) document.documentElement.style.overflow = this._htmlOverflow;

      this._fullscreenElement = null;
      this._savedStyles = {};
      dispatchEvent(element, 'fullscreenchange');
      return true;
    }
  }, {
    key: 'on',
    value: function on(name, fn) {
      var element = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : document;

      this._handleEvent(element, 'addEventListener', name, fn);
    }
  }, {
    key: 'off',
    value: function off(name, fn) {
      var element = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : document;

      this._handleEvent(element, 'removeEventListener', name, fn);
    }
  }, {
    key: '_handleEvent',
    value: function _handleEvent(element, behavior, name, fn) {
      /* istanbul ignore else  */
      if (process.env.NODE_ENV !== 'production') {
        if (name !== 'fullscreenchange' && name !== 'fullscreenerror' && name !== 'esfullscreenmethodchange') throw new Error(this.constructor.name + ' only handle "fullscreenchange", "fullscreenerror" and "esfullscreenmethodchange" event, but not ' + name + '. Pleas pass in an right event name.');
        if (!isFunction(fn)) throw new Error('You must pass in an legal function, but not ' + (typeof fn === 'undefined' ? 'undefined' : _typeof(fn)) + '.');
        if (!isElement(element) && element !== document) throw new Error('You should passed in a legal element, but not ' + (typeof element === 'undefined' ? 'undefined' : _typeof(element)) + '.');
      }
      var names = name === 'fullscreenchange' ? FULLSCREEN_CHANGE : name === 'fullscreenerror' ? FULLSCREEN_ERROR : [name];
      names.forEach(function (name) {
        // $FlowFixMe: support computed attribute here
        element[behavior](name, fn);
      });
    }
  }, {
    key: 'useStyleFirst',
    get: function get() {
      return useStyleFirst;
    },
    set: function set(value) {
      value = !!value;
      if (value === useStyleFirst) return value;
      useStyleFirst = value;
      dispatchEvent(document, 'esfullscreenmethodchange');
      return value;
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
    key: 'isFullscreen',
    get: function get() {
      return isElement(this.fullscreenElement);
    }
  }]);

  return ESFullScreen;
}(), _applyDecoratedDescriptor(_class2.prototype, 'open', [_dec2], _Object$getOwnPropertyDescriptor(_class2.prototype, 'open'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'exit', [_dec3], _Object$getOwnPropertyDescriptor(_class2.prototype, 'exit'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'on', [_dec4], _Object$getOwnPropertyDescriptor(_class2.prototype, 'on'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'off', [_dec5], _Object$getOwnPropertyDescriptor(_class2.prototype, 'off'), _class2.prototype), _class2)) || _class);

var index = new ESFullScreen();

export default index;
