
/**
 * es-fullscreen v0.4.0-beta.2
 * (c) 2017-2018 toxic-johann
 * Released under MIT
 * Built ad Wed Oct 17 2018 22:58:24 GMT+0800 (China Standard Time)
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.esFullscreen = factory());
}(this, (function () { 'use strict';

	var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var _typeof_1 = createCommonjsModule(function (module) {
	function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

	function _typeof(obj) {
	  if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
	    module.exports = _typeof = function _typeof(obj) {
	      return _typeof2(obj);
	    };
	  } else {
	    module.exports = _typeof = function _typeof(obj) {
	      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
	    };
	  }

	  return _typeof(obj);
	}

	module.exports = _typeof;
	});

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	var classCallCheck = _classCallCheck;

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

	var createClass = _createClass;

	/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

	var _freeGlobal = freeGlobal;

	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

	/** Used as a reference to the global object. */
	var root = _freeGlobal || freeSelf || Function('return this')();

	var _root = root;

	/** Built-in value references. */
	var Symbol$1 = _root.Symbol;

	var _Symbol = Symbol$1;

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;

	/** Built-in value references. */
	var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

	/**
	 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the raw `toStringTag`.
	 */
	function getRawTag(value) {
	  var isOwn = hasOwnProperty.call(value, symToStringTag),
	      tag = value[symToStringTag];

	  try {
	    value[symToStringTag] = undefined;
	  } catch (e) {}

	  var result = nativeObjectToString.call(value);
	  {
	    if (isOwn) {
	      value[symToStringTag] = tag;
	    } else {
	      delete value[symToStringTag];
	    }
	  }
	  return result;
	}

	var _getRawTag = getRawTag;

	/** Used for built-in method references. */
	var objectProto$1 = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString$1 = objectProto$1.toString;

	/**
	 * Converts `value` to a string using `Object.prototype.toString`.
	 *
	 * @private
	 * @param {*} value The value to convert.
	 * @returns {string} Returns the converted string.
	 */
	function objectToString(value) {
	  return nativeObjectToString$1.call(value);
	}

	var _objectToString = objectToString;

	/** `Object#toString` result references. */
	var nullTag = '[object Null]',
	    undefinedTag = '[object Undefined]';

	/** Built-in value references. */
	var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : undefined;

	/**
	 * The base implementation of `getTag` without fallbacks for buggy environments.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	function baseGetTag(value) {
	  if (value == null) {
	    return value === undefined ? undefinedTag : nullTag;
	  }
	  return (symToStringTag$1 && symToStringTag$1 in Object(value))
	    ? _getRawTag(value)
	    : _objectToString(value);
	}

	var _baseGetTag = baseGetTag;

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
	  return value != null && typeof value == 'object';
	}

	var isObjectLike_1 = isObjectLike;

	/**
	 * The base implementation of `_.unary` without support for storing metadata.
	 *
	 * @private
	 * @param {Function} func The function to cap arguments for.
	 * @returns {Function} Returns the new capped function.
	 */

	var _nodeUtil = createCommonjsModule(function (module, exports) {
	/** Detect free variable `exports`. */
	var freeExports = exports && !exports.nodeType && exports;

	/** Detect free variable `module`. */
	var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;

	/** Detect free variable `process` from Node.js. */
	var freeProcess = moduleExports && _freeGlobal.process;

	/** Used to access faster Node.js helpers. */
	var nodeUtil = (function() {
	  try {
	    // Use `util.types` for Node.js 10+.
	    var types = freeModule && freeModule.require && freeModule.require('util').types;

	    if (types) {
	      return types;
	    }

	    // Legacy `process.binding('util')` for Node.js < 10.
	    return freeProcess && freeProcess.binding && freeProcess.binding('util');
	  } catch (e) {}
	}());

	module.exports = nodeUtil;
	});

	/* Node.js helper references. */
	var nodeIsRegExp = _nodeUtil && _nodeUtil.isRegExp;

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

	var _overArg = overArg;

	/** Built-in value references. */
	var getPrototype = _overArg(Object.getPrototypeOf, Object);

	var _getPrototype = getPrototype;

	/** `Object#toString` result references. */
	var objectTag = '[object Object]';

	/** Used for built-in method references. */
	var funcProto = Function.prototype,
	    objectProto$2 = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty$1 = objectProto$2.hasOwnProperty;

	/** Used to infer the `Object` constructor. */
	var objectCtorString = funcToString.call(Object);

	/**
	 * Checks if `value` is a plain object, that is, an object created by the
	 * `Object` constructor or one with a `[[Prototype]]` of `null`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.8.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 * }
	 *
	 * _.isPlainObject(new Foo);
	 * // => false
	 *
	 * _.isPlainObject([1, 2, 3]);
	 * // => false
	 *
	 * _.isPlainObject({ 'x': 0, 'y': 0 });
	 * // => true
	 *
	 * _.isPlainObject(Object.create(null));
	 * // => true
	 */
	function isPlainObject(value) {
	  if (!isObjectLike_1(value) || _baseGetTag(value) != objectTag) {
	    return false;
	  }
	  var proto = _getPrototype(value);
	  if (proto === null) {
	    return true;
	  }
	  var Ctor = hasOwnProperty$1.call(proto, 'constructor') && proto.constructor;
	  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
	    funcToString.call(Ctor) == objectCtorString;
	}

	var isPlainObject_1 = isPlainObject;

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
	  return value != null && (type == 'object' || type == 'function');
	}

	var isObject_1 = isObject;

	/** `Object#toString` result references. */
	var asyncTag = '[object AsyncFunction]',
	    funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    proxyTag = '[object Proxy]';

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
	  if (!isObject_1(value)) {
	    return false;
	  }
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 9 which returns 'object' for typed arrays and other constructors.
	  var tag = _baseGetTag(value);
	  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
	}

	var isFunction_1 = isFunction;

	/* Node.js helper references. */
	var nodeIsDate = _nodeUtil && _nodeUtil.isDate;

	/**
	 * Checks if `value` is `undefined`.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
	 * @example
	 *
	 * _.isUndefined(void 0);
	 * // => true
	 *
	 * _.isUndefined(null);
	 * // => false
	 */
	function isUndefined(value) {
	  return value === undefined;
	}

	var isUndefined_1 = isUndefined;

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

	var isArray_1 = isArray;

	/** `Object#toString` result references. */
	var stringTag = '[object String]';

	/**
	 * Checks if `value` is classified as a `String` primitive or object.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a string, else `false`.
	 * @example
	 *
	 * _.isString('abc');
	 * // => true
	 *
	 * _.isString(1);
	 * // => false
	 */
	function isString(value) {
	  return typeof value == 'string' ||
	    (!isArray_1(value) && isObjectLike_1(value) && _baseGetTag(value) == stringTag);
	}

	var isString_1 = isString;

	/**
	 * Checks if `value` is `null` or `undefined`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is nullish, else `false`.
	 * @example
	 *
	 * _.isNil(null);
	 * // => true
	 *
	 * _.isNil(void 0);
	 * // => true
	 *
	 * _.isNil(NaN);
	 * // => false
	 */

	function defined(obj) {
	  return !isUndefined_1(obj);
	}
	function isEvent(obj) {
	  return obj instanceof Event || (obj && obj.originalEvent) instanceof Event;
	}
	function isElement(obj) {
	  return !!((typeof HTMLElement === "undefined" ? "undefined" : _typeof_1(HTMLElement)) === "object" ? obj instanceof HTMLElement : obj && _typeof_1(obj) === "object" && obj !== null && obj.nodeType === 1 && typeof obj.nodeName === "string");
	}

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
	  if (isString_1(key)) {
	    el.style[key] = val;
	  } else {
	    for (var k in key) {
	      setStyle(el, k, key[k]);
	    }
	  }
	}
	function native(target, name) {
	  var option = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	  if (name && !isString_1(name)) {
	    option = name;
	  }

	  if (isString_1(target)) {
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

	  if (!isString_1(name)) {
	    throw new Error("You must pass in a string as name, but not ".concat(_typeof_1(name), "."));
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

	  if (isFunction_1(Event)) {
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

	  if (!isPlainObject_1(event) && !isEvent(event)) {
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

	var ESFullScreen =
	/*#__PURE__*/
	function () {
	  function ESFullScreen() {
	    classCallCheck(this, ESFullScreen);

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

	  createClass(ESFullScreen, [{
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
	          if (isFunction_1(element[this._openKey])) {
	            element[this._openKey]();
	          }

	          return true;
	        }

	        if (element instanceof HTMLVideoElement && element.webkitSupportsFullscreen && isFunction_1(element.webkitEnterFullscreen)) {
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

	  return ESFullScreen;
	}();

	var index = new ESFullScreen();

	return index;

})));
