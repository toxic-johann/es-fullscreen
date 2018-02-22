// @flow
import { defined, isElement, isPosterityNode, isFunction } from 'toxic-predicate-functions';
import { DESKTOP_FULLSCREEN_STYLE, FULLSCREEN_CHANGE, FULLSCREEN_ERROR } from './const';
import { setStyle, native, dispatchEvent, supportDocument } from './utils';
import { autobindClass, alias } from 'toxic-decorators';
const fullscreenEnabled = native('fullscreenEnabled');
let useStyleFirst = false;

@autobindClass()
class ESFullScreen {
  _fullscreenElement: HTMLElement | null;
  _openKey: string;
  _exitKey: string;
  _savedStyles: Object;
  _bodyOverflow: string;
  _htmlOverflow: string;
  isFullscreen: boolean;
  isNativelySupport: boolean;
  useStyleFirst: boolean;
  hasUsedStyle: boolean;

  _fullscreenElement = null;
  isNativelySupport = (defined(native('fullscreenElement')) &&
    (!defined(fullscreenEnabled) || fullscreenEnabled === true));
  _openKey = supportDocument ? native(document.body || document.documentElement, 'requestFullscreen', { keyOnly: true }) : '';
  _exitKey = native('exitFullscreen', { keyOnly: true });
  _useStyleFirst = false;
  hasUsedStyle = false;

  get useStyleFirst(): boolean {
    return useStyleFirst;
  }

  set useStyleFirst(value: boolean): boolean {
    value = !!value;
    if (value === useStyleFirst) return value;
    useStyleFirst = value;
    dispatchEvent(document, 'esfullscreenmethodchange');
    return value;
  }

  get fullscreenElement(): Element | null {
    const element = [
      'fullscreenElement',
      'webkitFullscreenElement',
      'mozFullScreenElement',
      'msFullscreenElement',
    ].reduce((element, key) => {
      // $FlowFixMe: support computed element on document
      return element || document[key];
    }, null);
    return element || this._fullscreenElement;
  }

  get isFullscreen(): boolean {
    return isElement(this.fullscreenElement);
  }

  @alias('requestFullscreen')
  open(element: Element, { force = false }: {force: boolean} = {}): boolean {
    /* istanbul ignore else  */
    if (process.env.NODE_ENV !== 'production') {
      if (!isElement(element)) throw new Error(`You should passed in a legal element to requestFullScreen, but not ${typeof element}.`);
      if (!isPosterityNode(document, element)) throw new Error('You must pass in a HTML element in document.');
    }
    const originElement = this.fullscreenElement;
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
      if (element instanceof HTMLVideoElement &&
        element.webkitSupportsFullscreen &&
        // $FlowFixMe: support webkitEnterFullscreen on some werid safari
        isFunction(element.webkitEnterFullscreen)) {
        element.webkitEnterFullscreen();
        this._fullscreenElement = element;
        return true;
      }
    }

    this._savedStyles = Object.keys(DESKTOP_FULLSCREEN_STYLE)
      .reduce((styles, key) => {
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

  @alias('exitFullscreen')
  exit() {
    if (!this.isFullscreen) return false;
    if (this.isNativelySupport &&
      !this.useStyleFirst &&
      !this.hasUsedStyle) {
      // $FlowFixMe: support document computed key here
      document[this._exitKey]();
      return true;
    }
    // $FlowFixMe: element is an Elment here
    const element: Element = this._fullscreenElement;
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

  @alias('addEventListener')
  on(name: string, fn: Function, element?: Element | Document = document) {
    this._handleEvent(element, 'addEventListener', name, fn);
  }

  @alias('removeEventListener')
  off(name: string, fn: Function, element?: Element | Document = document) {
    this._handleEvent(element, 'removeEventListener', name, fn);
  }

  _handleEvent(element: Element | Document, behavior: string, name: string, fn: Function) {
    /* istanbul ignore else  */
    if (process.env.NODE_ENV !== 'production') {
      if (name !== 'fullscreenchange' &&
        name !== 'fullscreenerror' &&
        name !== 'esfullscreenmethodchange'
      ) throw new Error(`${this.constructor.name} only handle "fullscreenchange", "fullscreenerror" and "esfullscreenmethodchange" event, but not ${name}. Pleas pass in an right event name.`);
      if (!isFunction(fn)) throw new Error(`You must pass in an legal function, but not ${typeof fn}.`);
      if (!isElement(element) && element !== document) throw new Error(`You should passed in a legal element, but not ${typeof element}.`);
    }
    const names = name === 'fullscreenchange'
      ? FULLSCREEN_CHANGE
      : name === 'fullscreenerror'
        ? FULLSCREEN_ERROR
        : [ name ];
    names.forEach(name => {
      // $FlowFixMe: support computed attribute here
      element[behavior](name, fn);
    });
  }
}
export default new ESFullScreen();
